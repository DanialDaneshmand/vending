"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import Modal from "@/components/shared/Modal";
import TextField from "@/components/form/TextFeild";
import { FaPlus } from "react-icons/fa6";
import Select from "@/components/form/Select";

interface CreateSectionModalProps {
  onClose: () => void;
  open: boolean;
}

export const schema = yup
  .object({
    organizationID: yup.string().required(" مجموعه الزامی است"),
    sectionName: yup.string().required("نام بخش الزامی است"),
  })
  .required();
type FormValues = yup.InferType<typeof schema>;

export default function CreateSectionModal({
  onClose,
  open,
}: CreateSectionModalProps) {
  const {
    control,
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
            
            <Select
              control={control}
              label="مجموعه"
              name="organizationID"
              errors={errors}
              options={[
                { id: 1, label: "انتخاب مجموعه", value: "12cdx34" },
                { id: 2, label: "مجموعه 2", value: "12cdx35" },
                { id: 3, label: "مجموعه 3", value: "12cdx36" },
              ]}
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
