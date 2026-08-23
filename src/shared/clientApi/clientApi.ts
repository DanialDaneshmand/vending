import axios from 'axios';

// ایجاد نمونه axios
const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// متغیرهای کمکی برای مدیریت رفرش توکن
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ۱. اینترسپتور درخواست (Request Interceptor)
// برای اینکه توکن را از LocalStorage بگیرد و به هر درخواست اضافه کند
clientApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // فرض بر این است که نام کلید accessToken است
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ۲. اینترسپتور پاسخ (Response Interceptor)
clientApi.interceptors.response.use(
  (response) => response, // اگر پاسخ موفق بود، مستقیماً برگردان
  async (error) => {
    const originalRequest = error.config;

    // اگر خطای 401 بود و قبلاً برای این درخواست تلاش مجدد نشده بود
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // اگر در حال حاضر یک درخواست رفرش در جریان است، این درخواست را در صف قرار بده
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return clientApi(originalRequest);
        })
        .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // خواندن رفرش توکن از لوکال استوریج
        const refreshToken = localStorage.getItem('refreshToken');

        // درخواست رفرش توکن (آدرس اندپوینت را مطابق بک‌اندمت تغییر بده)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { access_token: newAccessToken } = response.data;

        // ذخیره توکن جدید در لوکال استوریج
        localStorage.setItem('accessToken', newAccessToken);

        // پردازش صف درخواست‌های منتظر
        processQueue(null, newAccessToken);

        // اجرای مجدد درخواست اصلی با توکن جدید
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return clientApi(originalRequest);

      } catch (refreshError) {
        // اگر رفرش توکن هم منقضی شده باشد یا خطا دهد
        processQueue(refreshError, null);

        // پاک کردن توکن‌ها و هدایت کاربر به صفحه لاگین
        localStorage.clear(); 
        window.location.href = '/login'; 

        return Promise.reject(refreshError);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default clientApi;