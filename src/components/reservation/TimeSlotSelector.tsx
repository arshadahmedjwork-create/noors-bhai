
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export interface TimeSlot {
  id: string;
  time: string;
  capacity: number;
  booked: number;
}

interface TimeSlotSelectorProps {
  timeSlots: TimeSlot[];
  selectedTimeSlot: TimeSlot | null;
  onTimeSlotSelect: (timeSlot: TimeSlot) => void;
}

const TimeSlotSelector = ({
  timeSlots,
  selectedTimeSlot,
  onTimeSlotSelect,
}: TimeSlotSelectorProps) => {
  // Calculate availability status
  const getAvailabilityStatus = (timeSlot: TimeSlot) => {
    const remaining = timeSlot.capacity - timeSlot.booked;
    if (remaining === 0) return "Fully Booked";
    if (remaining <= 5) return `Limited: ${remaining} seats left`;
    return `Available: ${remaining} seats`;
  };

  // Get status color based on availability
  const getStatusColor = (timeSlot: TimeSlot) => {
    const remaining = timeSlot.capacity - timeSlot.booked;
    if (remaining === 0) return "text-red-500";
    if (remaining <= 5) return "text-amber-500";
    return "text-green-500";
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-playfair text-cafe-gold mb-4">Select Time</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {timeSlots.map((slot) => {
          const isAvailable = slot.capacity - slot.booked > 0;
          const isSelected = selectedTimeSlot?.id === slot.id;

          return (
            <Button
              key={slot.id}
              variant={isSelected ? "default" : "outline"}
              className={`h-auto p-4 flex flex-col items-start text-left ${
                isSelected 
                  ? "bg-cafe-gold text-cafe-black border-cafe-gold" 
                  : "bg-cafe-brown/20 text-cafe-white border-cafe-brown"
              } ${!isAvailable && "opacity-50 cursor-not-allowed"}`}
              disabled={!isAvailable}
              onClick={() => isAvailable && onTimeSlotSelect(slot)}
            >
              <div className="flex items-center w-full">
                <Clock className={isSelected ? "text-cafe-black" : "text-cafe-gold"} size={18} />
                <span className="ml-2 text-lg font-medium">{slot.time}</span>
              </div>
              <div className={`mt-2 text-sm ${isSelected ? "text-cafe-black/80" : getStatusColor(slot)}`}>
                {getAvailabilityStatus(slot)}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
