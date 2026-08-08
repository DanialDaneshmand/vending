"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import Modal from "@/components/shared/Modal";

interface CreateSectionModalProps {
  onClose: () => void;
  open: boolean;
}

export const schema = yup
  .object({
    phoneNumber: yup.string().required("شماره موبایل الزامی است"),
  })
  .required();
type FormValues = yup.InferType<typeof schema>;

export default function CreateSectionModal({
  onClose,
  open,
}: CreateSectionModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
  };
  return (
    <Modal onClose={onClose} open={open} title="افزودن بخش جدید">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div></div>
        <button>ثبت بخش جدید</button>
      </form>
    </Modal>
  );
}
