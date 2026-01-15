import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Loader2, CheckCircle, XCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed" | "no_show" | "draft";

interface Booking {
  id: string;
  user_id: string;
  status: BookingStatus;
  scheduled_start: string | null;
  guest_count: number;
  phone: string;
  notes: string | null;
  created_at: string;
}

interface Profile {
  user_id: string;
  name: string | null;
  email: string;
}

interface BookingWithProfile extends Booking {
  profile?: Profile | null;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
  completed: "bg-blue-500/20 text-blue-400",
  no_show: "bg-gray-500/20 text-gray-400",
  draft: "bg-gray-500/20 text-gray-400",
};

const AdminBookingsTable = () => {
  const [bookings, setBookings] = useState<BookingWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      // Fetch bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("buffet_bookings")
        .select("*")
        .order("scheduled_start", { ascending: false })
        .limit(100);

      if (bookingsError) throw bookingsError;

      if (!bookingsData || bookingsData.length === 0) {
        setBookings([]);
        return;
      }

      // Get unique user IDs
      const userIds = [...new Set(bookingsData.map(b => b.user_id))];

      // Fetch profiles for these users
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("user_id, name, email")
        .in("user_id", userIds);

      // Create a map of user_id to profile
      const profileMap = new Map<string, Profile>();
      profilesData?.forEach(p => profileMap.set(p.user_id, p));

      // Merge bookings with profiles
      const bookingsWithProfiles: BookingWithProfile[] = bookingsData.map(booking => ({
        ...booking,
        status: booking.status as BookingStatus,
        profile: profileMap.get(booking.user_id) || null,
      }));

      setBookings(bookingsWithProfiles);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: string, newStatus: BookingStatus) => {
    try {
      const { error } = await supabase
        .from("buffet_bookings")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      toast({ title: "Status Updated", description: `Booking marked as ${newStatus}` });
      fetchBookings();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const exportCSV = () => {
    const csv = bookings.map(b =>
      `${b.id},${b.profile?.name || "N/A"},${b.profile?.email || "N/A"},${b.phone},${b.guest_count},${b.status},${b.scheduled_start || "TBD"}`
    ).join("\n");

    const blob = new Blob([`ID,Name,Email,Phone,Guests,Status,Date\n${csv}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="font-semibold text-foreground">All Bookings</h3>
        <Button onClick={exportCSV} variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {bookings.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          No bookings found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 text-muted-foreground font-medium">ID</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Guest</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Date/Time</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Guests</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-4 text-foreground font-mono text-xs">{booking.id.slice(0, 8)}</td>
                  <td className="p-4">
                    <p className="text-foreground">{booking.profile?.name || "Unknown"}</p>
                    <p className="text-xs text-muted-foreground">{booking.phone}</p>
                  </td>
                  <td className="p-4 text-foreground">
                    {booking.scheduled_start
                      ? (
                        <div>
                          <span className="font-medium">{format(new Date(booking.scheduled_start), "EEE")}</span>
                          <span className="text-muted-foreground"> - </span>
                          {format(new Date(booking.scheduled_start), "MMM d, h:mm a")}
                        </div>
                      )
                      : "TBD"}
                  </td>
                  <td className="p-4 text-foreground">{booking.guest_count}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateStatus(booking.id, "confirmed")}
                        disabled={booking.status === "confirmed"}
                      >
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateStatus(booking.id, "cancelled")}
                        disabled={booking.status === "cancelled"}
                      >
                        <XCircle className="w-4 h-4 text-red-400" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookingsTable;
