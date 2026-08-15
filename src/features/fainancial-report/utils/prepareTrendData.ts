export const prepareTrendData = (filteredData:any) => {
  // ۱. گروه‌بندی بر اساس تاریخ
  const totalsByDate = filteredData.reduce((acc:any, item:any) => {
    const date = item.date; // فرض می‌کنیم فرمت تاریخ در دیتای تو "۰۱/۰۶" یا مشابه است
    const incomeValue = parseInt(item.income.replace(/,/g, "").replace(/[۰-۹]/g, (d:any) => "0123456789"["\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9".indexOf(d)])) || 0;
    
    acc[date] = (acc[date] || 0) + incomeValue;
    return acc;
  }, {});

  // ۲. تبدیل به آرایه و مرتب‌سازی بر اساس تاریخ (بسیار مهم برای نمودار خطی)
  return Object.keys(totalsByDate)
    .sort((a, b) => a.localeCompare(b)) // مرتب‌سازی تاریخ‌ها برای اینکه خط نمودار درست رسم شود
    .map(date => ({
      date: date,
      value: totalsByDate[date]
    }));
};