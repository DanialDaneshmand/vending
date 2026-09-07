import { useMutation } from "@tanstack/react-query";
import { getTransactionsCSVReportsApi } from "../api/report";

export default function useGetTransactionsCSVReports() {
  const {
    mutateAsync: executeGetCsv,
    isPending: isGettingtransactionsCsvReports,
  } = useMutation({
    mutationFn: async (params: any) => {
      return await getTransactionsCSVReportsApi(params);
    },
  });

  return {
    executeGetCsv,
    isGettingtransactionsCsvReports,
  };
}