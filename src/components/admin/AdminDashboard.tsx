import { useState, useEffect } from "react";
import { format, startOfDay, endOfDay, nextSaturday, nextSunday, isSaturday, isSunday, addDays } from "date-fns";
import { Calendar, Users, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  weekendBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalGuests: number;
  nextWeekendDate: string;
}

// Helper to get upcoming weekend dates (Sat/Sun)
const getUpcomingWeekend = () => {
  const today = new Date();
  let saturday: Date;
  let sunday: Date;

  if (isSaturday(today)) {
    saturday = today;
    sunday = addDays(today, 1);
  } else if (isSunday(today)) {
    saturday = today; // Include today if it's Sunday
    sunday = today;
  } else {
    saturday = nextSaturday(today);
    sunday = nextSunday(today);
  }

  return { saturday, sunday };
};

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { saturday, sunday } = getUpcomingWeekend();
        const weekendStart = startOfDay(saturday).toISOString();
        const weekendEnd = endOfDay(sunday).toISOString();

        // Fetch all bookings for stats
        const { data: allBookings } = await supabase
          .from("buffet_bookings")
          .select("status, guest_count, scheduled_start");

        // Fetch weekend bookings
        const { data: weekendBookings } = await supabase
          .from("buffet_bookings")
          .select("*")
          .gte("scheduled_start", weekendStart)
          .lte("scheduled_start", weekendEnd)
          .in("status", ["pending", "confirmed"]);

        const pending = allBookings?.filter(b => b.status === "pending").length || 0;
        const confirmed = allBookings?.filter(b => b.status === "confirmed").length || 0;
        const cancelled = allBookings?.filter(b => b.status === "cancelled").length || 0;
        const totalGuests = weekendBookings?.reduce((sum, b) => sum + (b.guest_count || 0), 0) || 0;

        setStats({
          weekendBookings: weekendBookings?.length || 0,
          pendingBookings: pending,
          confirmedBookings: confirmed,
          cancelledBookings: cancelled,
          totalGuests,
          nextWeekendDate: format(saturday, "MMM d"),
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const statCards = [
    { label: `Weekend (${stats?.nextWeekendDate})`, value: stats?.weekendBookings || 0, icon: Calendar, color: "text-blue-400" },
    { label: "Pending", value: stats?.pendingBookings || 0, icon: Clock, color: "text-yellow-400" },
    { label: "Confirmed", value: stats?.confirmedBookings || 0, icon: CheckCircle, color: "text-green-400" },
    { label: "Cancelled", value: stats?.cancelledBookings || 0, icon: XCircle, color: "text-red-400" },
    { label: "Weekend Guests", value: stats?.totalGuests || 0, icon: Users, color: "text-primary" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center justify-between mb-2">
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <p className="text-3xl font-bold text-foreground">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;

