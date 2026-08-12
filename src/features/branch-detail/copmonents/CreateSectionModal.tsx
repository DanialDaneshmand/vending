"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import Modal from "@/components/shared/Modal";
import TextField from "@/components/form/TextFeild";
import { FaPlus } from "react-icons/fa6";

interface CreateSectionModalProps {
  onClose: () => void;
  open: boolean;
}

export const schema = yup
  .object({
    organizationID: yup.string().required("آیدی مجموعه الزامی است"),
    sectionName: yup.string().required("نام بخش الزامی است"),
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
          <div>
            <TextField
              errors={errors}
              label="آیدی مجموعه"
              name="organizationID"
              register={register}
              placeholder="آیدی مجموعه را وارد کنید"
            />
          </div>
          <div>
            <TextField
              errors={errors}
              label="نام بخش"
              name="sectionName"
              register={register}
              placeholder="نام بخش را وارد کنید"
            />
          </div>
        </div>
        <button className="flex py-2 px-5 mt-2 items-center justify-center gap-x-2 bg-emerald-600 rounded-lg text-white font-medium text-sm">
          <span>ثبت بخش جدید</span>
          <span>
            <FaPlus />
          </span>
        </button>
      </form>
    </Modal>
  );
}
