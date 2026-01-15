import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format, addWeeks, startOfDay, endOfDay, isSaturday, isSunday, nextSaturday, addDays } from "date-fns";
import { ChevronLeft, ChevronRight, Users, Clock, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface BookingCalendarProps {
    onSlotSelect: (date: Date, session: string, startTime: string, endTime: string) => void;
    selectedSlot?: { date: Date; session: string } | null;
}

interface TimeSlot {
    session: "saturday_lunch" | "saturday_dinner" | "sunday_lunch";
    label: string;
    startTime: string;
    endTime: string;
    capacity: number;
}

interface DayAvailability {
    date: Date;
    slots: {
        slot: TimeSlot;
        bookedGuests: number;
        availableSeats: number;
    }[];
}

// Buffet schedule configuration
const BUFFET_SCHEDULE: Record<string, TimeSlot[]> = {
    saturday: [
        { session: "saturday_lunch", label: "Lunch", startTime: "12:00", endTime: "15:00", capacity: 30 },
        { session: "saturday_dinner", label: "Dinner", startTime: "17:00", endTime: "22:00", capacity: 40 },
    ],
    sunday: [
        { session: "sunday_lunch", label: "Lunch", startTime: "12:00", endTime: "18:00", capacity: 30 },
    ],
};

const BookingCalendar = ({ onSlotSelect, selectedSlot }: BookingCalendarProps) => {
    const [weekOffset, setWeekOffset] = useState(0);
    const [availability, setAvailability] = useState<DayAvailability[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSession, setSelectedSession] = useState<string | null>(null);

    // Get upcoming weekend days for the current week offset
    const getWeekendDays = (offset: number): Date[] => {
        const today = new Date();
        let baseSaturday: Date;

        if (isSaturday(today)) {
            baseSaturday = today;
        } else if (isSunday(today)) {
            baseSaturday = addDays(today, -1);
        } else {
            baseSaturday = nextSaturday(today);
        }

        // Add weeks based on offset
        const targetSaturday = addWeeks(baseSaturday, offset);
        const targetSunday = addDays(targetSaturday, 1);

        return [targetSaturday, targetSunday];
    };

    // Fetch availability for the displayed weekend
    useEffect(() => {
        const fetchAvailability = async () => {
            setLoading(true);
            try {
                const weekendDays = getWeekendDays(weekOffset);
                const availabilityData: DayAvailability[] = [];

                for (const date of weekendDays) {
                    const dayStart = startOfDay(date).toISOString();
                    const dayEnd = endOfDay(date).toISOString();
                    const isSat = isSaturday(date);

                    // Get bookings for this day
                    const { data: bookings } = await supabase
                        .from("buffet_bookings")
                        .select("guest_count, scheduled_start")
                        .gte("scheduled_start", dayStart)
                        .lte("scheduled_start", dayEnd)
                        .in("status", ["pending", "confirmed"]);

                    // Get schedule for this day
                    const schedule = isSat ? BUFFET_SCHEDULE.saturday : BUFFET_SCHEDULE.sunday;

                    const slots = schedule.map(slot => {
                        // Calculate booked guests for this slot
                        const slotStart = parseInt(slot.startTime.split(":")[0]);
                        const slotEnd = parseInt(slot.endTime.split(":")[0]);

                        const bookedGuests = bookings?.filter(b => {
                            const hour = new Date(b.scheduled_start!).getHours();
                            return hour >= slotStart && hour < slotEnd;
                        }).reduce((sum, b) => sum + b.guest_count, 0) || 0;

                        return {
                            slot,
                            bookedGuests,
                            availableSeats: Math.max(0, slot.capacity - bookedGuests),
                        };
                    });

                    availabilityData.push({ date, slots });
                }

                setAvailability(availabilityData);
            } catch (error) {
                console.error("Error fetching availability:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAvailability();
    }, [weekOffset]);

    const handleSlotClick = (date: Date, slot: TimeSlot, availableSeats: number) => {
        if (availableSeats <= 0) return;

        setSelectedDate(date);
        setSelectedSession(slot.session);

        // Create full datetime for start and end
        const dateStr = format(date, "yyyy-MM-dd");
        const startDateTime = new Date(`${dateStr}T${slot.startTime}:00`);
        const endDateTime = new Date(`${dateStr}T${slot.endTime}:00`);

        onSlotSelect(date, slot.session, startDateTime.toISOString(), endDateTime.toISOString());
    };

    const isSlotSelected = (date: Date, session: string) => {
        return selectedDate && selectedSession &&
            format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd") &&
            selectedSession === session;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border"
        >
            {/* Header with navigation */}
            <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
                        disabled={weekOffset === 0}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <h3 className="text-lg font-playfair font-semibold text-foreground">
                        Select Your Preferred Time
                    </h3>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setWeekOffset(weekOffset + 1)}
                        disabled={weekOffset >= 4} // Max 4 weeks ahead
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                    Buffet available Saturday & Sunday only
                </p>
            </div>

            {/* Calendar grid */}
            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availability.map((day) => {
                        const isSat = isSaturday(day.date);
                        const dayName = isSat ? "Saturday" : "Sunday";
                        const isPast = day.date < startOfDay(new Date());

                        return (
                            <div
                                key={day.date.toISOString()}
                                className={`rounded-xl p-4 ${isPast ? "opacity-50" : ""} ${isSat ? "bg-amber-500/5 border border-amber-500/20" : "bg-blue-500/5 border border-blue-500/20"
                                    }`}
                            >
                                {/* Day header */}
                                <div className="mb-4">
                                    <p className={`text-lg font-semibold ${isSat ? "text-amber-400" : "text-blue-400"}`}>
                                        {dayName}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {format(day.date, "MMMM d, yyyy")}
                                    </p>
                                </div>

                                {/* Time slots */}
                                <div className="space-y-3">
                                    {day.slots.map(({ slot, availableSeats, bookedGuests }) => {
                                        const isAvailable = availableSeats > 0 && !isPast;
                                        const isSelected = isSlotSelected(day.date, slot.session);
                                        const isFull = availableSeats === 0;

                                        return (
                                            <button
                                                key={slot.session}
                                                onClick={() => handleSlotClick(day.date, slot, availableSeats)}
                                                disabled={!isAvailable}
                                                className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${isSelected
                                                        ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                                                        : isAvailable
                                                            ? "bg-background hover:bg-muted/80 border border-border hover:border-primary/50"
                                                            : "bg-muted/30 cursor-not-allowed"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className={`w-4 h-4 ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`} />
                                                        <span className={`font-medium ${isSelected ? "text-primary-foreground" : "text-foreground"}`}>
                                                            {slot.label}
                                                        </span>
                                                    </div>
                                                    {isSelected && <Check className="w-4 h-4" />}
                                                </div>

                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className={`text-sm ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                                                        {slot.startTime.replace(":00", "")} - {slot.endTime.replace(":00", "")}
                                                    </span>

                                                    <div className="flex items-center gap-1">
                                                        <Users className={`w-3 h-3 ${isFull
                                                                ? "text-red-400"
                                                                : isSelected
                                                                    ? "text-primary-foreground"
                                                                    : "text-primary"
                                                            }`} />
                                                        <span className={`text-sm font-medium ${isFull
                                                                ? "text-red-400"
                                                                : isSelected
                                                                    ? "text-primary-foreground"
                                                                    : availableSeats <= 10
                                                                        ? "text-amber-400"
                                                                        : "text-green-400"
                                                            }`}>
                                                            {isFull ? "Full" : `${availableSeats} seats left`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer hint */}
            <div className="p-4 bg-muted/30 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                    Select a time slot to continue with your reservation
                </p>
            </div>
        </motion.div>
    );
};

export default BookingCalendar;
