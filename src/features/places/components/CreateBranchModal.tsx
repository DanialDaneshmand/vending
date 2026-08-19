"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import Modal from "@/components/shared/Modal";
import TextField from "@/components/form/TextFeild";
import { FaPlus } from "react-icons/fa6";
import UseGetProfile from "@/shared/hooks/useGetProfile";
import { useCreateLocation } from "../hooks/useCreateLocation";

interface CreateBranchModalProps {
  onClose: () => void;
  open: boolean;
}

export const schema = yup
  .object({
    name: yup.string().required("نام مجموعه الزامی است"),
  })
  .required();
type FormValues = yup.InferType<typeof schema>;

export default function CreateBranchModal({
  onClose,
  open,
}: CreateBranchModalProps) {
  const { isgettingprofile, profile } = UseGetProfile();
  const { createLocation, isCreatingLocation } = useCreateLocation();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log({ name: data.name, manager_id: profile.id });
    
    if (!isgettingprofile) {
      createLocation(
        { name: data.name, manager_id: profile.id },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    }
  };
  return (
    <Modal onClose={onClose} open={open} title="افزودن مجموعه جدید">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-6">
          <TextField
            errors={errors}
            label="نام مجموعه"
            name="name"
            register={register}
            placeholder="نام مجموعه را وارد کنید"
          />
        </div>
        <button className="flex py-2 px-5 mt-2 items-center justify-center gap-x-2 bg-emerald-600 rounded-lg text-white font-medium text-sm">
          <span>ثبت مجموعه جدید</span>
          <span>
            <FaPlus />
          </span>
        </button>
      </form>
    </Modal>
  );
}
