import Link from "next/link";
import { useEffect, useRef, memo } from "react";

type DropdownNavItemProps = {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  setIsOpen: (dropdown: "ATS" | "EMS" | "CALENDAR" | "HISTORY" | "TOOLS") => void;
  onClose: () => void;
  items: {
    label: string;
    link: string;
  }[];
};

const DropdownNavItem = ({
  icon,
  label,
  isOpen,
  setIsOpen,
  items,
  onClose,
}: DropdownNavItemProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleClick = () => {
    if (isOpen) {
      onClose();
    } else {
      setIsOpen(label as any);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`flex items-center px-2 text-xs sm:text-sm font-medium cursor-pointer hover:text-blue-500 rounded-md transition-all duration-300 ${isOpen ? "text-blue-500" : ""}`}
        onClick={handleClick}
      >
        {icon}
        <span className="ml-2">{label}</span>
        <i
          className={`fas fa-angle-down ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 bg-white text-black shadow-md rounded-md text-sm w-48 p-1">
          <div className="">
            {items.map((item, index) => (
              <Link key={index} href={item.link} prefetch={false}>
                <div className="px-3 hover:bg-[#4f46e5] hover:text-white py-1 rounded-md">
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(DropdownNavItem);
