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
      className={cn("p-4 rounded-xl bg-white shadow-lg", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-6 justify-center",
        month: "space-y-3 w-full sm:w-auto",
        caption: "flex justify-between items-center px-4",
        caption_dropdowns: "flex gap-2 items-center",
        caption_label: "text-sm font-semibold text-gray-800",
        dropdown: "relative",
        dropdown_month: "w-24",
        dropdown_year: "w-28",
        dropdown_icon: "h-4 w-4 opacity-60",
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
          "border border-primary font-semibold bg-blue-50 text-blue-700",
        day_selected:
          "bg-primary text-white hover:bg-primary/90 focus:ring-2 focus:ring-primary",
        day_outside: "text-gray-400",
        day_disabled: "text-gray-300 cursor-not-allowed",
        day_range_middle: "bg-accent text-accent-foreground",
        day_range_end: "bg-primary text
