
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
import PageLayout from "@/components/layout/PageLayout";
import { toast } from "@/hooks/use-toast";
import { Phone, Instagram } from "lucide-react";
import { EnhancedAnimatedSection } from "@/components/ui/enhanced-animated-section";
import { ScrollSection } from "@/components/ui/scroll-section";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    // In a real app, this would be an API call
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      setIsSubmitting(false);
      form.reset();
    }, 1500);
  };

  return (
    <PageLayout>
      {/* Header with Brand-Aligned Design */}
      <ScrollSection triggerAnimation="parallax" className="bg-cafe-black py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative">
          <EnhancedAnimatedSection animation="fadeInUp" delay={0.2}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-playfair-sc text-cafe-gold mb-4 sm:mb-6">
              Get in Touch
            </h1>
            <p className="text-cafe-white/90 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto">
              We'd love to hear from you. Reach out with any questions or feedback.
            </p>
          </EnhancedAnimatedSection>
        </div>
      </ScrollSection>

      {/* Contact Info and Form */}
      <ScrollSection triggerAnimation="fadeUp" className="py-12 sm:py-16 md:py-20 bg-cafe-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <EnhancedAnimatedSection animation="fadeInLeft" delay={0.3}>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-playfair text-cafe-black mb-6 sm:mb-8">
                  Get In <span className="text-cafe-gold">Touch</span>
                </h2>

                {/* Contact Cards */}
                <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                  {/* Phone */}
                  <div className="flex items-center p-4 sm:p-6 bg-cafe-black rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cafe-gold/20 group">
                    <div className="mr-4 sm:mr-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cafe-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Phone className="text-cafe-black" size={20} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-playfair text-cafe-gold mb-1 sm:mb-2">Phone</h3>
                      <p className="text-cafe-white/90 text-sm sm:text-base">
                        <a href="tel:+16473555671" className="hover:text-cafe-gold transition-colors duration-300">
                          (647) 355-5671
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-center p-4 sm:p-6 bg-cafe-black rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cafe-gold/20 group">
                    <div className="mr-4 sm:mr-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cafe-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Instagram className="text-cafe-black" size={20} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-playfair text-cafe-gold mb-1 sm:mb-2">Instagram</h3>
                      <p className="text-cafe-white/90 text-sm sm:text-base">
                        <a 
                          href="https://instagram.com/NOORS_BHAI_BIRYANI" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-cafe-gold transition-colors duration-300"
                        >
                          @NOORS_BHAI_BIRYANI
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours & Location */}
                <div className="p-4 sm:p-6 bg-gradient-to-br from-cafe-gold/20 via-cafe-gold/10 to-cafe-brown/10 rounded-lg transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-lg sm:text-xl font-playfair text-cafe-black mb-3 sm:mb-4">Hours & Location</h3>
                  
                  <div className="mb-3 sm:mb-4">
                    <p className="font-bold text-cafe-black mb-1 text-sm sm:text-base">Address:</p>
                    <p className="text-cafe-black/80 text-sm sm:text-base">17 Queen Street N,</p>
                    <p className="text-cafe-black/80 text-sm sm:text-base">Mississauga, Ontario,</p>
                    <p className="text-cafe-black/80 mb-3 sm:mb-4 text-sm sm:text-base">L5N 6A1</p>
                  </div>
                  
                  <div>
                    <p className="font-bold text-cafe-black mb-2 flex items-center text-sm sm:text-base">
                      <span className="w-2 h-2 bg-cafe-gold rounded-full mr-2 animate-pulse"></span>
                      Business Hours:
                    </p>
                    <ul className="text-cafe-black/80 space-y-1 text-sm sm:text-base">
                      <li className="flex items-center transition-colors duration-300 hover:text-cafe-black">
                        <span className="w-1 h-1 bg-cafe-brown rounded-full mr-2"></span>
                        Monday - Friday: 11:30 AM - 10:00 PM
                      </li>
                      <li className="flex items-center transition-colors duration-300 hover:text-cafe-black">
                        <span className="w-1 h-1 bg-cafe-brown rounded-full mr-2"></span>
                        Saturday - Sunday: 12:30 PM - 10:00 PM
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </EnhancedAnimatedSection>

            {/* Contact Form */}
            <EnhancedAnimatedSection animation="fadeInRight" delay={0.5}>
              <div className="bg-cafe-black p-6 sm:p-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cafe-gold/20">
                <h2 className="text-xl sm:text-2xl font-playfair text-cafe-gold mb-4 sm:mb-6">Send us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cafe-white font-semibold text-sm sm:text-base">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              className="bg-cafe-brown/20 border-cafe-brown text-cafe-white placeholder:text-cafe-white/50 focus:border-cafe-gold focus:ring-2 focus:ring-cafe-gold/20 transition-all duration-300 text-sm sm:text-base h-10 sm:h-12"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-cafe-white font-semibold text-sm sm:text-base">Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Your email"
                                className="bg-cafe-brown/20 border-cafe-brown text-cafe-white placeholder:text-cafe-white/50 focus:border-cafe-gold focus:ring-2 focus:ring-cafe-gold/20 transition-all duration-300 text-sm sm:text-base h-10 sm:h-12"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-cafe-white font-semibold text-sm sm:text-base">Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your phone number"
                                className="bg-cafe-brown/20 border-cafe-brown text-cafe-white placeholder:text-cafe-white/50 focus:border-cafe-gold focus:ring-2 focus:ring-cafe-gold/20 transition-all duration-300 text-sm sm:text-base h-10 sm:h-12"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cafe-white font-semibold text-sm sm:text-base">Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Subject of your message"
                              className="bg-cafe-brown/20 border-cafe-brown text-cafe-white placeholder:text-cafe-white/50 focus:border-cafe-gold focus:ring-2 focus:ring-cafe-gold/20 transition-all duration-300 text-sm sm:text-base h-10 sm:h-12"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cafe-white font-semibold text-sm sm:text-base">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message"
                              className="resize-none h-24 sm:h-32 bg-cafe-brown/20 border-cafe-brown text-cafe-white placeholder:text-cafe-white/50 focus:border-cafe-gold focus:ring-2 focus:ring-cafe-gold/20 transition-all duration-300 text-sm sm:text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-cafe-gold text-cafe-black hover:bg-cafe-gold/90 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cafe-gold/30 text-sm sm:text-base h-10 sm:h-12"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </EnhancedAnimatedSection>
          </div>
        </div>
      </ScrollSection>

      {/* Google Maps Section */}
      <ScrollSection triggerAnimation="scaleIn" className="py-12 sm:py-16 md:py-20 bg-cafe-black">
        <div className="container mx-auto px-4 text-center">
          <EnhancedAnimatedSection animation="fadeInUp" delay={0.3}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-playfair text-cafe-gold mb-6 sm:mb-8">
              Find Us
            </h2>
            <div className="rounded-lg overflow-hidden h-[300px] sm:h-[350px] md:h-[400px] w-full shadow-2xl transition-all duration-300 hover:shadow-cafe-gold/20">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=17+Queen+Street+N,+Mississauga,+ON+L5N+6A1,+Canada&zoom=16"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Noor's Bhai Biryani - 17 Queen Street N, Mississauga"
                className="transition-all duration-300"
              />
            </div>
          </EnhancedAnimatedSection>
        </div>
      </ScrollSection>
    </PageLayout>
  );
};

export default Contact;
