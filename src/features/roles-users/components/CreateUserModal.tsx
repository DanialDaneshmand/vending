"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import Modal from "@/components/shared/Modal";
import TextField from "@/components/form/TextFeild";
import Select from "@/components/form/Select";
import { FaPlus } from "react-icons/fa6";

interface CreateUserModalProps {
  onClose: () => void;
  open: boolean;
  editId?: number;
}

const options = [
  { id: 1, label: "پیشتیبانی فنی", value: "1" },
  { id: 2, label: "مدیر مجموعه", value: "2" },
  { id: 3, label: "اپراتور دستگاه", value: "3" },
  { id: 4, label: "حسابدار", value: "4" },
  { id: 5, label: "پشتیبانی مرکزی", value: "5" },
];

export const schema = yup
  .object({
    fullName: yup.string().required("نام و نام خانوادگی الزامی است"),
    phoneNumber: yup.string().required(" شماره موبایل الزامی است"),
    role: yup.string().required(" نقش کاربر الزامی است"),
  })
  .required();
type FormValues = yup.InferType<typeof schema>;

export default function CreateUserModal({
  onClose,
  open,
  editId,
}: CreateUserModalProps) {
  const {
    register,
    control,
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
    <Modal
      onClose={onClose}
      open={open}
      title={`${editId ? "ویرایش کاربر" : "افزودن کاربر جدید"}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 py-8">
          <div>
            <TextField
              errors={errors}
              label="نام و نام خانوادگی"
              isRequired
              name="fullName"
              register={register}
              placeholder="نام و نام خانوادگی را وارد کنید"
            />
          </div>
          <div>
            <TextField
              errors={errors}
              label="شماره موبایل"
              name="phoneNumber"
              register={register}
              placeholder="شماره موبایل را وارد کنید"
              isRequired
            />
          </div>
          <div>
            <Select
              control={control}
              errors={errors}
              label="نقش کاربر"
              name="role"
              options={options}
              isRequire
            />
          </div>
        </div>

        {editId ? (
          <button className="flex items-center justify-center gap-x-2 rounded-lg bg-blue-600 text-white text-sm font-medium py-2 px-5">
            <span>ویرایش کاربر </span>
          </button>
        ) : (
          <button className="flex items-center justify-center gap-x-2 rounded-lg bg-emerald-600 text-white text-sm font-medium py-2 px-5">
            <span>ثبت کاربر جدید</span>
            <span>
              <FaPlus />
            </span>
          </button>
        )}
      </form>
    </Modal>
  );
}
