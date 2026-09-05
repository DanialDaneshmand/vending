
import { useMemo } from "react";
import moment from "moment-jalaali";

export const useFilteredData = (data: any[], filters: any) => {
  return useMemo(() => {
    if (!data) return [];

    // تابع کمکی برای تبدیل اعداد فارسی به انگلیسی در رشته‌ها
    const farsiToEnglish = (str: string) => {
      return str.replace(/[۰-۹]/g, (w) => "۰۱۲۳۴۵۶۷۸۹".indexOf(w).toString());
    };

    return data.filter((item) => {
      // ۱. فیلتر جستجو (Search Query)
      if (filters.searchQuery && filters.searchQuery.trim() !== "") {
        const query = filters.searchQuery.toLowerCase().trim();
        const matches = 
          item.device_name?.toLowerCase().includes(query) ||
          item.device_code?.toLowerCase().includes(query) ||
          item.id?.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // ۲. فیلتر مجموعه (مقایسه ID به ID)
      const isAllPlaces = !filters.places || filters.places === "all" || filters.places === "";
      if (!isAllPlaces && item.location_id !== filters.places) {
        return false;
      }

      // ۳. فیلتر بخش (مقایسه ID به ID)
      const isAllSections = !filters.sections || filters.sections === "all" || filters.sections === "";
      if (!isAllSections && item.section_id !== filters.sections) {
        return false;
      }

      // ۴. فیلتر تاریخ (تبدیل اعداد فارسی -> شمسی -> میلادی)
      if (item.occurred_at) {
        const itemMoment = moment(item.occurred_at);

        if (filters.fromDate && filters.fromDate !== "") {
          const engFromDate = farsiToEnglish(filters.fromDate);
          const startMoment = moment(engFromDate, "jYYYY/jMM/jDD").startOf("day");
          if (itemMoment.isBefore(startMoment)) return false;
        }

        if (filters.toDate && filters.toDate !== "") {
          const engToDate = farsiToEnglish(filters.toDate);
          const endMoment = moment(engToDate, "jYYYY/jMM/jDD").endOf("day");
          if (itemMoment.isAfter(endMoment)) return false;
        }
      }

      // ۵. فیلتر زمان (مدیریت آبجکت‌های DateObject)
      if (item.occurred_at) {
        // تبدیل زمان آیتم به دقیقه (از روی ISO string)
        const itemTimeStr = moment(item.occurred_at).format("HH:mm");
        const [iH, iM] = itemTimeStr.split(":").map(Number);
        const itemTotalMins = iH * 60 + iM;

        // بررسی زمان شروع (startTime)
        if (filters.startTime) {
          // استخراج ساعت و دقیقه از آبجکت DateObject (مثلاً با متد getHours یا toString)
          // اگر DateObject است، معمولاً متدی برای گرفتن ساعت دارد یا باید به رشته تبدیل شود
          const sTime = filters.startTime.toString(); // تبدیل i{} به رشته "HH:mm"

          const [sH, sM] = sTime.split(":").map(Number);
          if (!isNaN(sH)) {
            const startTotalMins = sH * 60 + (sM || 0);
            if (itemTotalMins < startTotalMins) return false;
          }
        }

        // بررسی زمان پایان (endTime)
        if (filters.endTime) {
          const eTime = filters.endTime.toString();
          const [eH, eM] = eTime.split(":").map(Number);
          if (!isNaN(eH)) {
            const endTotalMins = eH * 60 + (eM || 0);
            if (itemTotalMins > endTotalMins) return false;
          }
        }
      }

      return true;
    });
  }, [data, filters]);
};