import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface DateOfBirthSelectorProps {
  value?: string;
  onChange: (formattedDate: string | null) => void;
}

export const DateOfBirthSelector: React.FC<DateOfBirthSelectorProps> = ({ value, onChange }) => {
  const [year, setYear] = useState<number | "">("");
  const [month, setMonth] = useState<number | "">("");
  const [day, setDay] = useState<number | "">("");

  useEffect(() => {
    if (value) {
      const [y, m, d] = value.split("-").map(Number);
      setYear(y);
      setMonth(m);
      setDay(d);
    }
  }, [value]);

  useEffect(() => {
    if (year && month && day) {
      const formatted = new Date(year, month - 1, day).toLocaleDateString("en-CA");
      onChange(formatted);
    } else {
      onChange(null);
    }
  }, [year, month, day]);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-white">Date of birth</Label>
      <div className="flex items-center gap-2">
        
        {/* Month Select */}
        <select
          className="bg-zinc-900 text-white border border-zinc-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          <option value="">Month</option>
          {months.map((label, i) => (
            <option key={i} value={i + 1}>{label}</option>
          ))}
        </select>

        {/* Day Number */}
        <input
          type="number"
          placeholder="Day"
          min={1}
          max={31}
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
          className="bg-zinc-900 text-white border border-zinc-700 rounded-md px-4 py-2 w-20 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Year Number */}
        <input
          type="number"
          placeholder="Year"
          min={1900}
          max={new Date().getFullYear()}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="bg-zinc-900 text-white border border-zinc-700 rounded-md px-4 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </div>
  );
};
