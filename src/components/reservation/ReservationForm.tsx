
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TimeSlot } from "./TimeSlotSelector";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  partySize: z
    .number()
    .min(1, { message: "Party size must be at least 1." })
    .max(10, { message: "For parties larger than 10, please contact us directly." }),
  kidsCount: z
    .number()
    .min(0, { message: "Kids count must be 0 or more." })
    .optional(),
  specialRequests: z.string().optional(),
});

interface ReservationFormProps {
  selectedDate: Date;
  selectedTimeSlot: TimeSlot;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isSubmitting: boolean;
}

const ReservationForm = ({
  selectedDate,
  selectedTimeSlot,
  onSubmit,
  isSubmitting,
}: ReservationFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      partySize: 2,
      kidsCount: 0,
      specialRequests: "",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-playfair font-semibold text-foreground mb-2">
          Your Information
        </h3>
        <p className="text-sm text-muted-foreground">
          Please fill in your details to complete the reservation.
        </p>
      </div>
      
      {/* Reservation Summary */}
      <div className="p-4 bg-muted rounded-xl">
        <h4 className="text-sm font-medium text-foreground mb-2">Reservation Summary</h4>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div>
            <span className="text-primary font-medium">Date:</span>{" "}
            {format(selectedDate, "EEEE, MMMM do, yyyy")}
          </div>
          <div>
            <span className="text-primary font-medium">Time:</span>{" "}
            {selectedTimeSlot.time}
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    {...field}
                    className="bg-background border-border focus:border-primary"
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      {...field}
                      className="bg-background border-border focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(647) 123-4567"
                      {...field}
                      className="bg-background border-border focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="partySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Party Size</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={10}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      className="bg-background border-border focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kidsCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Kids (under 10)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      className="bg-background border-border focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="specialRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Special Requests (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any dietary restrictions or special requests..."
                    className="resize-none bg-background border-border focus:border-primary min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Complete Reservation"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReservationForm;
