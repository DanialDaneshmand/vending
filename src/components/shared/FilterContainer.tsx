import { LuFilter } from "react-icons/lu";
import SelectInput from "../form/SelectInput";

interface OptionsMap {
  [key: string]: {
    title: string;
    options: string[];
  };
}

interface ChangeHandlerEvent {
  target: {
    name: string;
    value: string;
  };
}

interface FilterContainerProps<T> {
  filterValues: T;
  className: string;
  optionsMap: OptionsMap;
  handleInputChange: (e: ChangeHandlerEvent) => void;
  isClearFilter?: boolean;
}

export default function FilterContainer<T>({
  className,
  optionsMap,
  filterValues,
  handleInputChange,
  isClearFilter,
}: FilterContainerProps<T>) {
  return (
    <div className={`${className}`}>
     
      {Object.entries(optionsMap).map(([key, value]) => {
        return (
          <div key={key}>
            <SelectInput
              name={key}
              title={value.title}
              options={value.options}
              filterValues={filterValues as any}
              handleChange={handleInputChange}
            />
          </div>
        );
      })}
      {isClearFilter && (
        <div className=" flex items-end ">
          <button className=" flex shadow-xs bg-white items-center justify-center gap-x-3 border border-gray-100 rounded-lg px-3 w-full py-3  cursor-pointer text-sm">
            <span>
              <LuFilter size={18} />
            </span>
            <span>پاکسازی فیلتر ها</span>
          </button>
        </div>
      )}
    </div>
  );
}
