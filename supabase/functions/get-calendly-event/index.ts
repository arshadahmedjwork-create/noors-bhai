import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CalendlyEventResponse {
    resource: {
        uri: string;
        name: string;
        start_time: string;
        end_time: string;
        status: string;
        location?: {
            type: string;
            location?: string;
        };
    };
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { eventUri } = await req.json();

        if (!eventUri) {
            return new Response(
                JSON.stringify({ error: "eventUri is required" }),
                {
                    status: 400,
                    headers: { ...corsHeaders, "Content-Type": "application/json" }
                }
            );
        }

        const calendlyToken = Deno.env.get("CALENDLY_PERSONAL_ACCESS_TOKEN");

        if (!calendlyToken) {
            console.error("CALENDLY_PERSONAL_ACCESS_TOKEN not configured");
            return new Response(
                JSON.stringify({ error: "Calendly API not configured" }),
                {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" }
                }
            );
        }

        // Fetch event details from Calendly API
        console.log("Fetching Calendly event:", eventUri);

        const response = await fetch(eventUri, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${calendlyToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Calendly API error:", response.status, errorText);
            return new Response(
                JSON.stringify({
                    error: "Failed to fetch event from Calendly",
                    status: response.status,
                    details: errorText
                }),
                {
                    status: response.status,
                    headers: { ...corsHeaders, "Content-Type": "application/json" }
                }
            );
        }

        const data: CalendlyEventResponse = await response.json();
        console.log("Calendly event data:", JSON.stringify(data, null, 2));

        // Extract the relevant booking details
        const eventDetails = {
            uri: data.resource.uri,
            name: data.resource.name,
            start_time: data.resource.start_time,
            end_time: data.resource.end_time,
            status: data.resource.status,
            location: data.resource.location,
        };

        return new Response(
            JSON.stringify(eventDetails),
            {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        console.error("Error in get-calendly-event:", error);
        return new Response(
            JSON.stringify({ error: (error as Error).message }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            }
        );
    }
});
