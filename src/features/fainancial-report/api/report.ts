import clientApi from "@/shared/clientApi/clientApi";

export async function getTransactionsCSVReportsApi(params: any) {
  const queryParams: Record<string, string> = {};

  // 💡 اصلاح نام کلیدها برای هماهنگی با استیت (استفاده از underscore)
  if (params.places) queryParams.location_id = params.places;
  if (params.sections) queryParams.section_id = params.sections;
  if (params.search_query) queryParams.search_query = params.search_query;
  if (params.date_from) queryParams.date_from = params.date_from;
  if (params.date_to) queryParams.date_to = params.date_to;
  if (params.start_time) queryParams.start_time = params.start_time;
  if (params.end_time) queryParams.end_time = params.end_time;
  if (params.device_id) queryParams.end_time = params.device_id;


  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/reports/transactions.csv${queryString ? `?${queryString}` : ""}`;
  

  // دریافت فایل به صورت blob
  return await clientApi.get(url, { responseType: 'blob' }).then(({ data }) => data);
}