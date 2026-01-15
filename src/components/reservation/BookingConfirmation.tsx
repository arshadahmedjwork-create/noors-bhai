import { motion } from "framer-motion";
import { format } from "date-fns";
import { Check, Calendar, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingConfirmationProps {
  booking: {
    id: string;
    name: string;
    email: string;
    guestCount: number;
    session: string;
    scheduledStart: string;
    scheduledEnd: string;
    status: string;
  };
  onViewBookings: () => void;
  onReturnHome: () => void;
}

const BookingConfirmation = ({ booking, onViewBookings, onReturnHome }: BookingConfirmationProps) => {
  const startDate = new Date(booking.scheduledStart);
  
  return (
    <motion.div
      key="confirmation"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-2xl p-8 md:p-10 shadow-sm border border-border text-center"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Check size={40} className="text-primary-foreground" />
      </motion.div>
      
      <h2 className="text-2xl md:text-3xl font-playfair font-bold text-foreground mb-3">
        Reservation Confirmed
      </h2>
      
      <p className="text-muted-foreground mb-8">
        Thank you for choosing Noor's Bhai Biryani. We look forward to serving you.
      </p>
      
      <div className="mb-8 p-6 bg-muted rounded-xl text-left">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Reservation Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium text-foreground">
                {format(startDate, "EEEE, MMMM do, yyyy")}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-medium text-foreground">
                {format(startDate, "h:mm a")}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Party Size</p>
              <p className="font-medium text-foreground">
                {booking.guestCount} {booking.guestCount === 1 ? 'guest' : 'guests'}
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Booking ID</p>
            <p className="font-bold text-primary uppercase">
              {booking.id.slice(0, 8)}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 capitalize">
              {booking.status}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onViewBookings}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          View My Bookings
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onReturnHome}
          className="border-primary text-primary hover:bg-primary/10"
        >
          Return to Home
        </Button>
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          A confirmation email has been sent to {booking.email}
        </p>
        <a 
          href={`https://wa.me/16473555671?text=Hello,%20I%20have%20a%20question%20about%20my%20reservation%20(Booking:%20${booking.id.slice(0, 8)})`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-primary hover:underline text-sm"
        >
          Questions? Contact us via WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

export default BookingConfirmation;
