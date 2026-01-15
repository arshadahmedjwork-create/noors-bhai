import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CalendlyEmbedProps {
    prefillData: {
        name: string;
        email: string;
        phone: string;
        guests: string;
    };
    onBookingComplete: (eventUri: string, inviteeUri: string, startTime: string, endTime: string) => void;
}

declare global {
    interface Window {
        Calendly?: {
            initInlineWidget: (options: any) => void;
        };
    }
}

const CalendlyEmbed = ({ prefillData, onBookingComplete }: CalendlyEmbedProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptLoaded = useRef(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Function to fetch event details from Calendly via Edge Function
    const fetchCalendlyEventDetails = async (eventUri: string): Promise<{ start_time: string; end_time: string } | null> => {
        try {
            console.log("Fetching Calendly event details via Edge Function:", eventUri);

            const { data, error } = await supabase.functions.invoke('get-calendly-event', {
                body: { eventUri }
            });

            if (error) {
                console.error("Edge Function error:", error);
                return null;
            }

            console.log("Received event details:", data);
            return {
                start_time: data.start_time,
                end_time: data.end_time
            };
        } catch (error) {
            console.error("Error fetching Calendly event details:", error);
            return null;
        }
    };

    useEffect(() => {
        // Load Calendly script
        if (!scriptLoaded.current) {
            const script = document.createElement("script");
            script.src = "https://assets.calendly.com/assets/external/widget.js";
            script.async = true;
            document.body.appendChild(script);
            scriptLoaded.current = true;
        }

        // Listen for Calendly events
        const handleCalendlyEvent = async (e: MessageEvent) => {
            if (e.origin !== "https://calendly.com") return;

            console.log("Calendly event received:", e.data);

            if (e.data.event === "calendly.event_scheduled") {
                const payload = e.data.payload;
                console.log("Calendly booking payload:", JSON.stringify(payload, null, 2));

                const eventUri = payload.event?.uri || "";
                const inviteeUri = payload.invitee?.uri || "";

                if (!eventUri) {
                    console.error("No event URI in Calendly payload");
                    return;
                }

                setIsProcessing(true);

                // Fetch actual event details from Calendly API via Edge Function
                const eventDetails = await fetchCalendlyEventDetails(eventUri);

                setIsProcessing(false);

                if (eventDetails?.start_time && eventDetails?.end_time) {
                    console.log("Successfully retrieved booking times:", eventDetails);
                    onBookingComplete(eventUri, inviteeUri, eventDetails.start_time, eventDetails.end_time);
                } else {
                    console.error("Could not fetch booking times from Calendly API");
                    // Still complete the booking but with current time as fallback
                    onBookingComplete(eventUri, inviteeUri, new Date().toISOString(), new Date().toISOString());
                }
            }
        };

        window.addEventListener("message", handleCalendlyEvent);

        return () => {
            window.removeEventListener("message", handleCalendlyEvent);
        };
    }, [onBookingComplete]);

    // Build prefill query params
    const prefillParams = new URLSearchParams({
        name: prefillData.name,
        email: prefillData.email,
        a1: prefillData.phone, // Custom answer 1: Phone
        a2: prefillData.guests, // Custom answer 2: Guests
    }).toString();

    // Use Calendly URL from environment variable
    const baseCalendlyUrl = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/noorsbhaibiryani/buffet-reservation";
    const calendlyUrl = `${baseCalendlyUrl}?${prefillParams}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border"
        >
            <div className="p-4 border-b border-border">
                <h3 className="text-lg font-playfair font-semibold text-foreground">
                    Select Your Preferred Time
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Choose an available slot that works best for you.
                </p>
            </div>

            <div
                ref={containerRef}
                className="relative min-h-[600px] bg-background"
            >
                {/* Processing overlay */}
                {isProcessing && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-20">
                        <div className="text-center">
                            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                            <p className="text-foreground font-medium">Confirming your booking...</p>
                        </div>
                    </div>
                )}

                {/* Placeholder while Calendly loads */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">Loading available slots...</p>
                    </div>
                </div>

                {/* Calendly inline widget */}
                <div
                    className="calendly-inline-widget"
                    data-url={calendlyUrl}
                    style={{
                        minWidth: "320px",
                        height: "630px",
                        position: "relative",
                        zIndex: 1,
                    }}
                />
            </div>

            <div className="p-4 bg-muted/30 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                    Having trouble? Contact us at{" "}
                    <a href="tel:+16473555671" className="text-primary hover:underline">
                        (647) 355-5671
                    </a>
                </p>
            </div>
        </motion.div>
    );
};

export default CalendlyEmbed;
