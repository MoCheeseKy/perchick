"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  onValueChange?: (value: string) => void;
  options?: SelectOption[];
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  name?: string;
  children?: React.ReactNode;
}

export function SelectItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-value={value} className={className}>
      {children}
    </div>
  );
}

export const SelectTrigger = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

export const SelectContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

export const SelectValue = ({
  placeholder,
}: {
  placeholder?: string;
}) => <span>{placeholder}</span>;

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onValueChange,
      options,
      placeholder = "Pilih...",
      className,
      containerClassName,
      disabled = false,
      name,
      children,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      defaultValue || ""
    );
    const isControlled = value !== undefined;
    const internalValue = isControlled ? value : uncontrolledValue;
    const containerRef = React.useRef<HTMLDivElement>(null);

    const items: SelectOption[] = React.useMemo(() => {
      if (options && options.length > 0) return options;
      const extracted: SelectOption[] = [];
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
          const val = (child.props as { value?: string }).value;
          const text =
            (child.props as { children?: React.ReactNode }).children ||
            (child.props as { label?: string }).label ||
            val;
          if (val !== undefined) {
            extracted.push({
              value: String(val),
              label: typeof text === "string" ? text : String(val),
            });
          }
        }
      });
      return extracted;
    }, [options, children]);

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen]);

    const selectedOption = items.find((opt) => opt.value === internalValue);

    const handleSelect = (opt: SelectOption) => {
      if (disabled) return;
      if (!isControlled) {
        setUncontrolledValue(opt.value);
      }
      setIsOpen(false);
      onValueChange?.(opt.value);
      onChange?.({
        target: {
          value: opt.value,
          name,
        },
      });
    };

    return (
      <div
        ref={containerRef}
        className={cn("relative inline-block w-full", containerClassName)}
      >
        <div
          ref={ref}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-3.5 text-xs font-semibold text-neutral-800 transition-colors shadow-xs cursor-pointer select-none",
            isOpen && "border-orange-500 ring-1 ring-orange-500",
            disabled && "cursor-not-allowed opacity-50 bg-neutral-50",
            className
          )}
        >
          <span className={cn("truncate", !selectedOption && "text-neutral-400")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 shrink-0 ml-2",
              isOpen && "rotate-180 text-orange-500"
            )}
          />
        </div>

        {isOpen && (
          <div className="absolute left-0 top-full z-50 mt-1.5 max-h-60 w-full min-w-[140px] overflow-y-auto rounded-xl border border-neutral-200 bg-white p-1 text-xs shadow-lg animate-in fade-in-0 zoom-in-95">
            {items.map((opt) => {
              const isSelected = opt.value === internalValue;
              return (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
                    isSelected &&
                      "bg-orange-50 text-orange-600 font-bold hover:bg-orange-100 hover:text-orange-700"
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-orange-600 shrink-0 ml-2" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
