import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, AlertCircle, Loader2, ChevronRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { fadeInUp, staggerContainer } from "@/utils/animations";

interface Booking {
  id: string;
  status: string;
  scheduled_start: string | null;
  scheduled_end: string | null;
  guest_count: number;
  notes: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
  completed: "bg-blue-500/20 text-blue-400",
  no_show: "bg-gray-500/20 text-gray-400",
};

const MyBookingsPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("buffet_bookings")
          .select("*")
          .eq("user_id", user.id)
          .order("scheduled_start", { ascending: false });

        if (error) throw error;

        setBookings(data || []);
      } catch (err: any) {
        console.error("Error fetching bookings:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Header */}
      <section className="bg-background py-16 md:py-20 border-b border-border">
        <motion.div
          className="container mx-auto px-4 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair text-foreground mb-4"
          >
            My Bookings
          </motion.h1>
          <motion.div
            variants={fadeInUp}
            className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"
          />
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            View and manage your buffet reservations
          </motion.p>
        </motion.div>
      </section>

      {/* Bookings List */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <p className="text-destructive">{error}</p>
            </div>
          )}

          {bookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-8 md:p-12 text-center border border-border"
            >
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-playfair font-semibold text-foreground mb-2">
                No Bookings Yet
              </h2>
              <p className="text-muted-foreground mb-6">
                You haven't made any buffet reservations yet.
              </p>
              <Button
                onClick={() => navigate("/reserve")}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Reserve a Table
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                            statusColors[booking.status] || "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {booking.status.replace("_", " ")}
                        </span>
                        <span className="text-xs text-muted-foreground uppercase">
                          #{booking.id.slice(0, 8)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="text-foreground">
                            {booking.scheduled_start
                              ? format(new Date(booking.scheduled_start), "MMM d, yyyy")
                              : "TBD"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-foreground">
                            {booking.scheduled_start
                              ? format(new Date(booking.scheduled_start), "h:mm a")
                              : "TBD"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-primary" />
                          <span className="text-foreground">
                            {booking.guest_count} {booking.guest_count === 1 ? "guest" : "guests"}
                          </span>
                        </div>
                      </div>

                      {booking.notes && (
                        <p className="mt-3 text-sm text-muted-foreground line-clamp-1">
                          Notes: {booking.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center">
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* New Booking CTA */}
          {bookings.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <Button
                onClick={() => navigate("/reserve")}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Make Another Reservation
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default MyBookingsPage;
