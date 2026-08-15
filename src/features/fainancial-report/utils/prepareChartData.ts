const ALL_LOCATIONS = ["پاساژ کوروش", "ایران مال", "مجتمع تیراژه", "پالادیوم"];


export const prepareChartData = (filteredData: any) => {
    // ۱. ابتدا مجموع درآمدها را برای مکان‌های موجود در دیتای فیلتر شده حساب می‌کنیم
    const totals = filteredData.reduce((acc: any, item: any) => {
      const location = item.location;
      // تبدیل مبلغ از رشته (با کاما و اعداد فارسی/انگلیسی) به عدد
      const incomeValue =
        parseInt(
          item.income
            .replace(/,/g, "")
            .replace(
              /[۰-۹]/g,
              (d: any) =>
                "0123456789"[
                  "\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9".indexOf(
                    d,
                  )
                ],
            ),
        ) || 0;

      acc[location] = (acc[location] || 0) + incomeValue;
      return acc;
    }, {});

    // ۲. حالا بر اساس لیست ثابت ALL_LOCATIONS، دیتا را می‌سازیم
    return ALL_LOCATIONS.map((loc) => ({
      name: loc,
      value: totals[loc] || 0, // اگر در دیتای فیلتر شده نبود، مقدار ۰ بگیرد
    }));
  };