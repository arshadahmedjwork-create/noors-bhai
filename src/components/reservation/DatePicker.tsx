
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

const DatePicker = ({ selectedDate, onDateSelect }: DatePickerProps) => {
  const today = new Date();
  const twoMonthsFromNow = new Date();
  twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);

  // Only allow booking on Saturday and Sunday
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-playfair text-cafe-gold mb-4">Select Date</h3>
      <p className="text-cafe-white/80 mb-4">
        Buffet is available on weekends only (Saturday and Sunday)
      </p>
      <div className="border rounded-lg overflow-hidden bg-cafe-brown/20 p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          disabled={(date) => 
            date < today || 
            date > twoMonthsFromNow || 
            !isWeekend(date)
          }
          className={cn("bg-cafe-black rounded-md", 
            "text-cafe-white", 
            "[&_.rdp-day]:text-cafe-white/70",
            "[&_.rdp-day_button]:hover:bg-cafe-gold/20",
            "[&_.rdp-day_button.rdp-day_selected]:bg-cafe-gold",
            "[&_.rdp-day_button.rdp-day_selected]:text-cafe-black",
            "[&_.rdp-nav_button]:text-cafe-gold",
            "[&_.rdp-caption]:text-cafe-gold"
          )}
        />
      </div>
      {selectedDate && (
        <p className="mt-4 text-cafe-gold">
          Selected date: <span className="font-medium">{format(selectedDate, "EEEE, MMMM do, yyyy")}</span>
        </p>
      )}
    </div>
  );
};

export default DatePicker;
