"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface ChangeHandlerEvent {
  target: {
    name: string;
    value: string;
  };
}

// تعریف به صورت Generic <T>
interface SelectInputProps<T> {
  filterValues: T; // به جای تایپ سخت، T می‌گیرد
  handleChange: (e: ChangeHandlerEvent) => void;
  name: string;
  options: string[];
  title: string;
}

export default function SelectInput<T>({
  filterValues,
  handleChange,
  options,
  name,
  title,
}: SelectInputProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const label = (filterValues as any)[name] || "انتخاب کنید...";

  return (
    <div dir="rtl" className="relative inline-flex w-full" ref={ref}>
      {/* Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex  gap-2 border border-gray-100 px-3 py-2   items-center justify-between
          w-full
          bg-white
          shadow-xs 
          rounded-lg
          text-sm text-[#09090B]
          transition cursor-pointer
           
           font-medium
        "
      >
        <span className=" flex flex-col items-start">
          <p className="text-xs text-gray-500">{title}</p>
          <span className="mt-2">{label}</span>
        </span>

        <FiChevronDown
          className={`text-[#09090B] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute top-full mt-2 right-0
            w-full
            bg-white
            border border-gray-200
            rounded-xl
            shadow-lg
            overflow-hidden
            z-50
          "
        >
          {options.map((item) => (
            <button
              key={item}
              onClick={() => {
                handleChange({
                  target: {
                    name,
                    value: item,
                  },
                });
                setOpen(false);
              }}
              className={`
                w-full text-right px-4 py-2 text-sm
                hover:bg-gray-100 transition
                ${(filterValues as any)[name] === item ? "bg-gray-100 font-medium" : ""}
              `}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
