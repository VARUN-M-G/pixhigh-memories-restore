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

  // Parse incoming value
  useEffect(() => {
    if (value) {
      const [y, m, d] = value.split("-").map(Number);
      setYear(y);
      setMonth(m);
      setDay(d);
    }
  }, [value]);

  // Update parent when any change happens
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
      <Label>Date of birth</Label>
      <div className="flex gap-2">
        {/* Month */}
        <select
          className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          <option value="">Month</option>
          {months.map((label, i) => (
            <option key={i} value={i + 1}>{label}</option>
          ))}
        </select>

        {/* Day */}
        <select
          className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none"
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
        >
          <option value="">Day</option>
          {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        {/* Year */}
        <select
          className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none text-white"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          <option value="">Year</option>
          {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
