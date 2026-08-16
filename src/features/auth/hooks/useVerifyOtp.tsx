import { useMutation } from "@tanstack/react-query";
import { verifyOtpApi } from "../api/auth";
import toast from "react-hot-toast";

export function useVerifyOtp() {
  const { isPending: isSendingOtp, mutate: verifyOtp } = useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: (data) => {
        toast.success("ورود با موفقیت انجام شد")
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
    },
    onError: (err) => {
      toast.error("مشکلی در تایید کد otp رخ  داده است");
    },
  });
  return { isSendingOtp, verifyOtp };
}
