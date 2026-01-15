import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Check, Loader2, Calendar, Users, Phone, Mail, User, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import GoogleSignInCard from "@/components/reservation/GoogleSignInCard";
import CalendlyEmbed from "@/components/reservation/CalendlyEmbed";
import BookingConfirmation from "@/components/reservation/BookingConfirmation";

// Form validation schema (session removed - handled by Calendly)
const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").max(20, "Phone number is too long"),
  guestCount: z.number().min(1, "At least 1 guest required").max(20, "Maximum 20 guests per booking"),
  notes: z.string().max(500, "Notes must be less than 500 characters").optional(),
  confirmDetails: z.literal(true, { errorMap: () => ({ message: "Please confirm your details are correct" }) }),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

// LocalStorage key for persisting user form data
const FORM_STORAGE_KEY = 'nbb_booking_form_data';

type ReservationStage = "signin" | "form" | "calendly" | "confirmation";

const ReservePage = () => {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading, signInWithGoogle } = useAuth();

  const [stage, setStage] = useState<ReservationStage>("signin");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // Form state - initialize from localStorage if available
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        return {
          name: parsed.name || "",
          email: "", // Always get fresh from auth
          phone: parsed.phone || "",
          guestCount: parsed.guestCount || 2,
          notes: parsed.notes || "",
          confirmDetails: false, // Always require re-confirmation
        };
      } catch (e) {
        console.error('Error parsing saved form data:', e);
      }
    }
    return {
      name: "",
      email: "",
      phone: "",
      guestCount: 2,
      notes: "",
      confirmDetails: false,
    };
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Save form data to localStorage when it changes
  useEffect(() => {
    const dataToSave = {
      name: formData.name,
      phone: formData.phone,
      guestCount: formData.guestCount,
      notes: formData.notes,
    };
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(dataToSave));
  }, [formData.name, formData.phone, formData.guestCount, formData.notes]);

  // Update stage based on auth state
  useEffect(() => {
    if (!authLoading) {
      if (user) {
        if (stage === "signin") {
          setStage("form");
        }
        // Pre-fill form with user data
        if (profile) {
          setFormData(prev => ({
            ...prev,
            name: prev.name || profile.name || user.user_metadata?.full_name || "",
            email: prev.email || profile.email || user.email || "",
            phone: prev.phone || profile.phone || "",
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            name: prev.name || user.user_metadata?.full_name || "",
            email: prev.email || user.email || "",
          }));
        }
      } else {
        setStage("signin");
      }
    }
  }, [user, profile, authLoading]);

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    const { error } = await signInWithGoogle();
    if (error) {
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  const validateForm = (): boolean => {
    try {
      bookingFormSchema.parse(formData);
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setFormErrors(errors);
      }
      return false;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create or update booking draft
      const draftData = {
        user_id: user.id,
        name: formData.name!,
        email: formData.email!,
        phone: formData.phone!,
        guest_count: formData.guestCount!,
        session: null, // Session handled by Calendly time slot selection
        notes: formData.notes || null,
        status: 'submitted',
      };

      let result;
      if (draftId) {
        result = await supabase
          .from('buffet_booking_drafts')
          .update(draftData)
          .eq('id', draftId)
          .select()
          .single();
      } else {
        result = await supabase
          .from('buffet_booking_drafts')
          .insert(draftData)
          .select()
          .single();
      }

      if (result.error) {
        throw result.error;
      }

      setDraftId(result.data.id);
      setStage("calendly");

      toast({
        title: "Details Saved",
        description: "Now select your preferred time slot.",
      });
    } catch (error: any) {
      console.error('Error saving draft:', error);
      toast({
        title: "Error Saving Details",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCalendlyBookingComplete = async (eventUri: string, inviteeUri: string, startTime: string, endTime: string) => {
    if (!user || !draftId) return;

    try {
      // Create the booking record
      const { data: booking, error } = await supabase
        .from('buffet_bookings')
        .insert({
          user_id: user.id,
          draft_id: draftId,
          status: 'confirmed',
          booking_source: 'calendly',
          scheduled_start: startTime,
          scheduled_end: endTime,
          guest_count: formData.guestCount!,
          phone: formData.phone!,
          notes: formData.notes || null,
          calendly_event_uri: eventUri,
          calendly_invitee_uri: inviteeUri,
        })
        .select()
        .single();

      if (error) throw error;

      setBookingDetails({
        id: booking.id,
        name: formData.name,
        email: formData.email,
        guestCount: formData.guestCount,
        scheduledStart: startTime,
        scheduledEnd: endTime,
        status: 'confirmed',
      });

      setStage("confirmation");

      toast({
        title: "Booking Confirmed",
        description: "Your buffet reservation has been successfully booked.",
      });
    } catch (error: any) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking Error",
        description: "Your slot is reserved. We'll confirm shortly.",
        variant: "destructive",
      });
    }
  };

  const progressSteps = [
    { key: "form", label: "Details", number: 1, icon: User },
    { key: "calendly", label: "Schedule", number: 2, icon: Calendar },
    { key: "confirmation", label: "Confirmed", number: 3, icon: Check },
  ];

  const getStepStatus = (stepKey: string) => {
    const stageOrder = ["signin", "form", "calendly", "confirmation"];
    const currentIndex = stageOrder.indexOf(stage);
    const stepIndex = stageOrder.indexOf(stepKey);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  const isFormValid = formData.name && formData.email && formData.phone &&
    formData.guestCount && formData.confirmDetails;

  if (authLoading) {
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
      {/* Premium Header */}
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
            Buffet Reservations
          </motion.h1>
          <motion.div
            variants={fadeInUp}
            className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"
          />
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            Reserve your spot for our authentic South Indian weekend buffet experience
          </motion.p>
        </motion.div>
      </section>

      {/* Reservation Process */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Progress Steps - Only show after sign-in */}
          {stage !== "signin" && stage !== "confirmation" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-12"
            >
              <div className="flex items-center w-full max-w-lg">
                {progressSteps.map((step, index) => {
                  const status = getStepStatus(step.key);
                  const Icon = step.icon;
                  return (
                    <React.Fragment key={step.key}>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${status === "completed"
                            ? "bg-primary text-primary-foreground"
                            : status === "current"
                              ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                              : "bg-muted text-muted-foreground"
                            }`}
                        >
                          {status === "completed" ? <Check size={18} /> : <Icon size={18} />}
                        </div>
                        <span className={`mt-2 text-sm font-medium ${status === "current" ? "text-primary" : "text-muted-foreground"
                          }`}>
                          {step.label}
                        </span>
                      </div>
                      {index < progressSteps.length - 1 && (
                        <div
                          className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${getStepStatus(progressSteps[index + 1].key) !== "upcoming"
                            ? "bg-primary"
                            : "bg-muted"
                            }`}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Main Content */}
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {/* Sign In Gate */}
              {stage === "signin" && (
                <GoogleSignInCard
                  onSignIn={handleGoogleSignIn}
                  isLoading={isSubmitting}
                />
              )}

              {/* Booking Form */}
              {stage === "form" && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border"
                >
                  <h2 className="text-2xl font-playfair font-semibold text-foreground mb-2">
                    Reservation Details
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Complete your details to proceed with booking.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground font-medium">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="pl-10 bg-background border-border focus:border-primary"
                          placeholder="Enter your full name"
                        />
                      </div>
                      {formErrors.name && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {formErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-medium">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-10 bg-background border-border focus:border-primary"
                          placeholder="your@email.com"
                          readOnly
                        />
                      </div>
                      {formErrors.email && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {formErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground font-medium">
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="pl-10 bg-background border-border focus:border-primary"
                          placeholder="+1 (647) 123-4567"
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {formErrors.phone}
                        </p>
                      )}
                    </div>

                    {/* Guest Count & Session */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="guestCount" className="text-foreground font-medium">
                          Number of Guests <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="guestCount"
                            type="number"
                            min={1}
                            max={20}
                            value={formData.guestCount}
                            onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 1 })}
                            className="pl-10 bg-background border-border focus:border-primary"
                          />
                        </div>
                        {formErrors.guestCount && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {formErrors.guestCount}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-foreground font-medium">
                        Special Requests (Optional)
                      </Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="bg-background border-border focus:border-primary min-h-[80px] resize-none"
                        placeholder="Any dietary restrictions or special requests..."
                      />
                    </div>

                    {/* Confirmation Checkbox */}
                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                      <Checkbox
                        id="confirmDetails"
                        checked={formData.confirmDetails}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, confirmDetails: checked as boolean })
                        }
                        className="mt-0.5"
                      />
                      <Label
                        htmlFor="confirmDetails"
                        className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                      >
                        I confirm that the details provided above are correct and I understand that
                        cancellations must be made at least 2 hours before the reservation time.
                      </Label>
                    </div>
                    {formErrors.confirmDetails && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {formErrors.confirmDetails}
                      </p>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting || !isFormValid}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-semibold disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Calendar className="mr-2 h-4 w-4" />
                          Choose Time Slot
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}

              {/* Calendly Embed */}
              {stage === "calendly" && (
                <motion.div
                  key="calendly"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-playfair font-semibold text-foreground">
                        Your Details
                      </h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setStage("form")}
                        className="text-primary"
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name:</span>
                        <p className="font-medium text-foreground">{formData.name}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Guests:</span>
                        <p className="font-medium text-foreground">{formData.guestCount}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phone:</span>
                        <p className="font-medium text-foreground">{formData.phone}</p>
                      </div>
                    </div>
                  </div>

                  <CalendlyEmbed
                    prefillData={{
                      name: formData.name || "",
                      email: formData.email || "",
                      phone: formData.phone || "",
                      guests: formData.guestCount?.toString() || "2",
                    }}
                    onBookingComplete={handleCalendlyBookingComplete}
                  />
                </motion.div>
              )}

              {/* Confirmation */}
              {stage === "confirmation" && bookingDetails && (
                <BookingConfirmation
                  booking={bookingDetails}
                  onViewBookings={() => navigate('/my-bookings')}
                  onReturnHome={() => navigate('/')}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Buffet Information */}
      {stage !== "confirmation" && (
        <section className="py-12 md:py-16 bg-background border-t border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold font-playfair text-foreground mb-6">
                  About Our Buffet
                </h2>
                <p className="text-muted-foreground mb-4">
                  Experience the rich flavors of South India with our weekend buffet. We offer a wide selection of authentic dishes prepared by our expert chefs using traditional recipes.
                </p>
                <p className="text-muted-foreground mb-6">
                  The buffet includes appetizers, main courses, rice dishes, breads, desserts, and beverages. All-you-can-eat from our carefully curated selection.
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Pricing</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Adults: $24.99 per person
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Children (5-10 years): $14.99 per child
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Children under 5: Free
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Buffet Schedule</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2" />
                      <div>
                        <span className="font-medium text-foreground">Saturday</span>
                        <p className="text-sm">Lunch: 12:00 PM - 3:00 PM</p>
                        <p className="text-sm">Dinner: 5:00 PM - 10:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                      <div>
                        <span className="font-medium text-foreground">Sunday</span>
                        <p className="text-sm">Lunch: 12:00 PM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Special Diets</h3>
                  <p className="text-muted-foreground">
                    Our buffet includes vegetarian, vegan, and gluten-free options. Please let us know about any allergies or dietary restrictions when making your reservation.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <div className="absolute -left-3 -top-3 w-full h-full border-2 border-primary/30 rounded-xl" />
                <img
                  src="/lovable-uploads/c97d2eb0-ed62-4acb-9a50-992ae468ed4a.png"
                  alt="Noor's Bhai Biryani buffet spread"
                  className="rounded-xl w-full h-full object-cover min-h-[300px] relative z-10"
                />
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default ReservePage;
