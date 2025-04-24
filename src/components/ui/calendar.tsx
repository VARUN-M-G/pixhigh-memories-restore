import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 bg-white rounded-lg shadow-sm", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-6 justify-center",
        month: "space-y-4",
        caption: "flex justify-between items-center px-4",
        caption_dropdowns: "flex gap-2 items-center",
        caption_label: "text-sm font-semibold text-gray-800",
        dropdown: "relative z-10",
        dropdown_month: "w-24",
        dropdown_year: "w-28",
        dropdown_icon: "h-4 w-4 text-gray-500",
        nav: "flex items-center gap-2",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 p-0 bg-white border border-gray-300 hover:bg-gray-100"
        ),
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-separate border-spacing-y-1",
        head_row: "flex justify-between px-4",
        head_cell:
          "text-xs font-medium text-gray-500 w-9 text-center uppercase",
        row: "flex justify-between px-4",
        cell:
          "w-9 h-9 relative p-0 text-sm text-center rounded-md focus-within:z-10",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "w-full h-full p-0 text-sm rounded-md hover:bg-gray-100 focus:outline-none"
        ),
        day_today:
          "border-2 border-blue-500 bg-blue-50 text-blue-800 font-semibold",
        day_selected:
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400",
        day_outside: "text-gray-400",
        day_disabled: "text-gray-300 cursor-not-allowed",
        day_range_middle:
          "bg-blue-100 text-blue-800 hover:bg-blue-200",
        day_range_end: "bg-blue-600 text-white",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4 text-gray-500" />,
        IconRight: () => <ChevronRight className="h-4 w-4 text-gray-500" />,
      }}
      captionLayout="dropdown-buttons"
      fromYear={1940}
      toYear={2025}
      ISOWeek
      fixedWeeks
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
