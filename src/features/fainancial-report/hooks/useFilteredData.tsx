import { useMemo } from "react";

// --- Interfaces ---
export interface DeviceData {
  id: number;
  date: string;
  time: string;
  location: string;
  sectionName: string;
  deviceName: string;
  deviceId: string;
  devices: number;
  games: number;
  income: string;
}

interface FilterValues {
  searchQuery: string;
  fromDate: string; // تغییر از startDate
  toDate: string; // تغییر از endDate
  startTime: string;
  endTime: string;
  places: string;
  sections: string;
}

// --- Helper Functions ---
const toEnglishDigits = (str: string | null | undefined): string => {
  if (!str) return "";
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[۰-۹]/g, (w) => persianDigits.indexOf(w).toString());
};

const normalizeDate = (dateStr: string): number => {
  if (!dateStr) return 0;
  // Convert "1405/05/20" to 14050520
  const englishDate = toEnglishDigits(dateStr);
  return parseInt(englishDate.replace(/\//g, ""), 10);
};

const timeToMinutes = (timeStr: string): number => {
  if (!timeStr) return -1;
  const englishTime = toEnglishDigits(timeStr);
  const [hours, minutes] = englishTime.split(":").map(Number);
  return hours * 60 + minutes;
};

// --- Main Hook ---
export const useFilteredData = (data: DeviceData[], filters: FilterValues) => {
  return useMemo(() => {
    if (!data) return [];

    return data.filter((item) => {
      // 1. Search Query
      // فقط اگر searchQuery مقدار داشت و خالی نبود فیلتر کن
      if (filters.searchQuery && filters.searchQuery.trim() !== "") {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch =
          String(item.id).toLowerCase().includes(query) ||
          item.deviceId.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // 2. Location / Places Filter
      // اگر مقدار "همه مجموعه ها" بود یا کلاً خالی بود، از این فیلتر رد شو (Pass)
      const isAllPlaces =
        !filters.places ||
        filters.places === "همه مجموعه ها" ||
        filters.places === "";
      if (!isAllPlaces && item.location !== filters.places) {
        return false;
      }

      // 3. Section Filter
      const isAllSections =
        !filters.sections ||
        filters.sections === "بخش ها" ||
        filters.sections === "همه بخش ها" ||
        filters.sections === "";
      if (!isAllSections && item.sectionName !== filters.sections) {
        return false;
      }

      // 4. Date Range Filter
      // فقط اگر تاریخ مقدار داشت و خالی نبود بررسی کن
      if (filters.fromDate && filters.fromDate !== "") {
        const itemDate = normalizeDate(item.date);
        const start = normalizeDate(filters.fromDate);
        if (itemDate < start) return false;
      }
      if (filters.toDate && filters.toDate !== "") {
        const itemDate = normalizeDate(item.date);
        const end = normalizeDate(filters.toDate);
        if (itemDate > end) return false;
      }

      // 5. Time Range Filter
      if (filters.startTime && filters.startTime !== "") {
        const itemTimeMins = timeToMinutes(item.time);
        const startMins = timeToMinutes(filters.startTime);
        if (itemTimeMins < startMins) return false;
      }
      if (filters.endTime && filters.endTime !== "") {
        const itemTimeMins = timeToMinutes(item.time);
        const endMins = timeToMinutes(filters.endTime);
        if (itemTimeMins > endMins) return false;
      }

      return true; // اگر هیچ‌کدام از شروط بالا باعث return false نشدند، ردیف نمایش داده شود
    });
  }, [data, filters]);
};
