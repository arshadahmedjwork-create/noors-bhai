import { useState, useEffect } from "react";
import { format, startOfDay, endOfDay, nextSaturday, addDays, isSaturday, isSunday } from "date-fns";
import { Loader2, Users, AlertTriangle, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DayCapacity {
  date: Date;
  lunchGuests: number;
  dinnerGuests: number;
  lunchCapacity: number;
  dinnerCapacity: number;
  isWeekend: boolean;
}

// Get upcoming weekend days only (next 4 weekends = 8 days)
const getUpcomingWeekendDays = (): Date[] => {
  const days: Date[] = [];
  const today = new Date();
  let currentDate = today;

  // If today is Saturday, start from today
  if (isSaturday(today)) {
    currentDate = today;
  } else if (isSunday(today)) {
    // If today is Sunday, include today and then find next Saturday
    days.push(today);
    currentDate = nextSaturday(today);
  } else {
    // Find the next Saturday
    currentDate = nextSaturday(today);
  }

  // Add next 4 weekends (8 days: 4 Saturdays + 4 Sundays)
  for (let weekendCount = 0; weekendCount < 4 && days.length < 8; weekendCount++) {
    if (days.length === 0 || !isSaturday(days[days.length - 1]) || currentDate > days[days.length - 1]) {
      days.push(currentDate); // Saturday
      days.push(addDays(currentDate, 1)); // Sunday
      currentDate = addDays(currentDate, 7); // Next Saturday
    }
  }

  return days.slice(0, 8); // Max 8 days (4 weekends)
};

const AdminCapacityView = () => {
  const [capacityData, setCapacityData] = useState<DayCapacity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCapacity = async () => {
      try {
        // Get settings
        const { data: settings } = await supabase
          .from("settings")
          .select("*")
          .eq("key", "buffet_capacity_by_session")
          .single();

        const capacity = settings?.value as { lunch: number; dinner: number } || { lunch: 30, dinner: 40 };

        // Get only weekend days
        const weekendDays = getUpcomingWeekendDays();
        const days: DayCapacity[] = [];

        for (const date of weekendDays) {
          const dayStart = startOfDay(date).toISOString();
          const dayEnd = endOfDay(date).toISOString();

          const { data: bookings } = await supabase
            .from("buffet_bookings")
            .select("guest_count, scheduled_start")
            .gte("scheduled_start", dayStart)
            .lte("scheduled_start", dayEnd)
            .in("status", ["pending", "confirmed"]);

          // Calculate guests for each session based on actual buffet schedule:
          // Saturday: Lunch 12-3 PM, Dinner 5-10 PM
          // Sunday: Lunch 12-6 PM only (no dinner)
          const isSat = isSaturday(date);

          const lunchGuests = bookings?.filter(b => {
            const hour = new Date(b.scheduled_start!).getHours();
            // Saturday lunch: 12-3 PM (12-15 hours)
            // Sunday lunch: 12-6 PM (12-18 hours)
            if (isSat) {
              return hour >= 12 && hour < 15;
            } else {
              return hour >= 12 && hour < 18;
            }
          }).reduce((sum, b) => sum + b.guest_count, 0) || 0;

          // Saturday dinner: 5-10 PM (17-22 hours)
          // Sunday: No dinner
          const dinnerGuests = isSat ? (bookings?.filter(b => {
            const hour = new Date(b.scheduled_start!).getHours();
            return hour >= 17 && hour <= 22;
          }).reduce((sum, b) => sum + b.guest_count, 0) || 0) : 0;

          days.push({
            date,
            lunchGuests,
            dinnerGuests,
            lunchCapacity: capacity.lunch,
            dinnerCapacity: isSat ? capacity.dinner : 0, // Sunday has no dinner
            isWeekend: isSaturday(date) || isSunday(date),
          });
        }

        setCapacityData(days);
      } catch (error) {
        console.error("Error fetching capacity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCapacity();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Weekend Capacity Overview</h3>
        <span className="text-xs text-muted-foreground ml-2">(Buffet available Sat & Sun only)</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 divide-y md:divide-y-0 md:divide-x divide-border">
        {capacityData.map((day) => {
          const lunchOverbooked = day.lunchGuests > day.lunchCapacity;
          const dinnerOverbooked = day.dinnerGuests > day.dinnerCapacity;
          const dayName = format(day.date, "EEE");
          const isSat = isSaturday(day.date);

          return (
            <div key={day.date.toISOString()} className="p-4">
              <p className={`text-sm font-medium mb-1 ${isSat ? "text-amber-400" : "text-blue-400"}`}>
                {dayName}
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                {format(day.date, "MMM d")}
              </p>

              <div className="space-y-3">
                <div className={`p-2 rounded-lg ${lunchOverbooked ? "bg-red-500/20" : "bg-muted/50"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Lunch</span>
                    {lunchOverbooked && <AlertTriangle className="w-3 h-3 text-red-400" />}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-primary" />
                    <span className={`text-sm font-medium ${lunchOverbooked ? "text-red-400" : "text-foreground"}`}>
                      {day.lunchGuests}/{day.lunchCapacity}
                    </span>
                  </div>
                </div>

                {isSat ? (
                  <div className={`p-2 rounded-lg ${dinnerOverbooked ? "bg-red-500/20" : "bg-muted/50"}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Dinner</span>
                      {dinnerOverbooked && <AlertTriangle className="w-3 h-3 text-red-400" />}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-primary" />
                      <span className={`text-sm font-medium ${dinnerOverbooked ? "text-red-400" : "text-foreground"}`}>
                        {day.dinnerGuests}/{day.dinnerCapacity}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-2 rounded-lg bg-muted/30">
                    <span className="text-xs text-muted-foreground">No Dinner</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminCapacityView;

