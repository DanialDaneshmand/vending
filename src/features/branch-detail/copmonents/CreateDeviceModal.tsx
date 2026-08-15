"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import Modal from "@/components/shared/Modal";
import TextField from "@/components/form/TextFeild";
import { FaPlus } from "react-icons/fa6";
import Select from "@/components/form/Select";

interface CreateDeviceModalProps {
  onClose: () => void;
  open: boolean;
}

export const schema = yup
  .object({
    organizationID: yup.string().required("نام مجموعه الزامی است"),
    sectionID: yup.string().required("نام بخش الزامی است"),
    deviceID: yup.string().required("آیدی دستگاه الزامی است"),
  })
  .required();
type FormValues = yup.InferType<typeof schema>;

export default function CreateDeviceModal({
  onClose,
  open,
}: CreateDeviceModalProps) {
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
    <Modal onClose={onClose} open={open} title="افزودن دستگاه جدید">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 py-4 sm:grid-cols-3 gap-4">
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
            <Select
              control={control}
              label="بخش"
              name="sectionID"
              errors={errors}
              options={[
                { id: 1, label: "انتخاب بخش", value: "12cdx34" },
                { id: 2, label: "بخش 1", value: "12cdx35" },
                { id: 3, label: "بخش 2", value: "12cdx36" },
              ]}
            />
          </div>
          <div>
            <Select
              control={control}
              label="آیدی دستگاه"
              name="deviceID"
              errors={errors}
              options={[
                { id: 1, label: "انتخاب دستگاه", value: "" },
                { id: 2, label: "12cdx35", value: "12cdx35" },
                { id: 3, label: "12cdx36", value: "12cdx36" },
              ]}
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
