
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateSelectProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  className?: string;
  disabled?: boolean;
}

export function DateSelect({
  value,
  onChange,
  className,
  disabled,
}: DateSelectProps) {
  // Initialize with current value or current date as default
  const selectedDate = value || new Date();
  const [month, setMonth] = React.useState(selectedDate.getMonth());
  const [day, setDay] = React.useState(selectedDate.getDate());
  const [year, setYear] = React.useState(selectedDate.getFullYear());

  // Generate years from 1940 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1939 }, (_, i) => currentYear - i);
  
  // Months array
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Update days based on selected month and year
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const daysInMonth = getDaysInMonth(year, month);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Initialize with current values when component mounts
  React.useEffect(() => {
    if (value) {
      setMonth(value.getMonth());
      setDay(value.getDate());
      setYear(value.getFullYear());
    }
  }, [value]);

  // Update the date when selections change
  React.useEffect(() => {
    const newDate = new Date(year, month, day);
    if (
      newDate.getFullYear() === year &&
      newDate.getMonth() === month &&
      newDate.getDate() === day &&
      (value?.getTime() !== newDate.getTime() || !value)
    ) {
      onChange(newDate);
    }
  }, [day, month, year, onChange, value]);

  return (
    <div className={cn("flex gap-2 w-full", className)}>
      <Select
        value={month.toString()}
        onValueChange={(val) => setMonth(parseInt(val, 10))}
        disabled={disabled}
      >
        <SelectTrigger className="flex-grow bg-background dark:bg-sidebar-accent rounded-xl">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent className="bg-background dark:bg-sidebar-background">
          {months.map((monthName, index) => (
            <SelectItem key={index} value={index.toString()}>
              {monthName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select
        value={day.toString()}
        onValueChange={(val) => setDay(parseInt(val, 10))}
        disabled={disabled}
      >
        <SelectTrigger className="w-20 bg-background dark:bg-sidebar-accent rounded-xl">
          <SelectValue placeholder="Day" />
        </SelectTrigger>
        <SelectContent className="bg-background dark:bg-sidebar-background">
          {days.map((d) => (
            <SelectItem key={d} value={d.toString()}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select
        value={year.toString()}
        onValueChange={(val) => setYear(parseInt(val, 10))}
        disabled={disabled}
      >
        <SelectTrigger className="w-28 bg-background dark:bg-sidebar-accent rounded-xl">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] overflow-y-auto bg-background dark:bg-sidebar-background">
          {years.map((y) => (
            <SelectItem key={y} value={y.toString()}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
