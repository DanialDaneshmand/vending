"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import Modal from "@/components/shared/Modal";
import TextField from "@/components/form/TextFeild";
import { FaPlus } from "react-icons/fa6";

interface CreateDeviceModalProps {
  onClose: () => void;
  open: boolean;
}

export const schema = yup
  .object({
    organizationID: yup.string().required("آیدی مجموعه الزامی است"),
    sectionID: yup.string().required("آیدی بخش الزامی است"),
    deviceID: yup.string().required("آیدی دستگاه الزامی است"),
  })
  .required();
type FormValues = yup.InferType<typeof schema>;

export default function CreateDeviceModal({
  onClose,
  open,
}: CreateDeviceModalProps) {
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
    <Modal onClose={onClose} open={open} title="افزودن دستگاه جدید">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 py-4 sm:grid-cols-3 gap-4">
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
              label="آیدی بخش"
              name="sectionID"
              register={register}
              placeholder="آیدی بخش را وارد کنید"
            />
          </div>
          <div>
            <TextField
              errors={errors}
              label="آیدی دستگاه"
              name="deviceID"
              register={register}
              placeholder="آیدی دستگاه را وارد کنید"
            />
          </div>
        </div>
        <button className="flex py-2 px-5 mt-2 items-center justify-center gap-x-2 bg-emerald-600 rounded-lg text-white font-medium text-sm">
          <span>ثبت دستگاه جدید</span>
          <span>
            <FaPlus />
          </span>
        </button>
      </form>
    </Modal>
  );
}
