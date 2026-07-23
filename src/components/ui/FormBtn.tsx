import { Spinner } from "@/components/ui/spinner";
import { IconType } from "react-icons";

type FormBtnProps = {
  btnTitle: string;
  Icon?: IconType;
  isLoading?: boolean;
};

export default function FormBtn({ btnTitle, Icon, isLoading }: FormBtnProps) {
  return (
    <button
      disabled={isLoading}
      className=" cursor-pointer bg-[#032062] text-white w-full py-3  items-center rounded-lg my-2 font-bold flex justify-center gap-x-2"
    >
      <span>{btnTitle}</span>
      {Icon && (
        <span className=" text-[#F6711A]">
          <Icon className="text-2xl" />
        </span>
      )}
      {isLoading && (
        <span>
          <Spinner />
        </span>
      )}
    </button>
  );
}
