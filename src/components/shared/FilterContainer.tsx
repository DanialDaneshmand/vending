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
}

export default function FilterContainer<T>({
  className,
  optionsMap,
  filterValues,
  handleInputChange,
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
      <div className=" flex items-center ">
        <button className=" flex items-center justify-center gap-x-3 border border-gray-100 rounded-lg px-3 w-full py-2 cursor-pointer text-sm">
          <span>
            <LuFilter size={18}/>
          </span>
          <span>پاکسازی فیلتر ها</span>
        </button>
      </div>
    </div>
  );
}
