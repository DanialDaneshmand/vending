"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "@/components/shared/Modal";
import TextField from "@/components/form/TextFeild";
import Select from "@/components/form/Select";
import { useCreateUser } from "../hooks/useCreateUser";
import AddNewButton from "@/components/ui/AddNewButton";

interface CreateUserModalProps {
  onClose: () => void;
  open: boolean;
  editId?: number;
}

const options = [
  { id: "1", label: "مدیر کل", value: "super_admin" },
  { id: "2", label: "پشتیبانی فنی ", value: "technical_support" },
  { id: "3", label: "مدیر مجموعه", value: "location_manager" },
  { id: "4", label: "پشتیبانی مرکزی", value: "central_viewer" },
  { id: "5", label: "حسابدار", value: "accounting" },
  { id: "6", label: "اپراتور", value: "operator" },
];

export const schema = yup
  .object({
    username: yup.string().required("نام و نام خانوادگی الزامی است"),
    phone: yup.string().required(" شماره موبایل الزامی است"),
    role: yup.string().required(" نقش کاربر الزامی است"),
  })
  .required();
type FormValues = yup.InferType<typeof schema>;

export default function CreateUserModal({
  onClose,
  open,
  editId,
}: CreateUserModalProps) {
  const { createUser, isCreatingUser } = useCreateUser();

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
    createUser(data, {
      onSuccess: () => {
        onClose();
      },
    });
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
              name="username"
              register={register}
              placeholder="نام و نام خانوادگی را وارد کنید"
            />
          </div>
          <div>
            <TextField
              errors={errors}
              label="شماره موبایل"
              name="phone"
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
          <AddNewButton isLoading={isCreatingUser} title="ثبت کاربر جدید"/>
        )}
      </form>
    </Modal>
  );
}
