
const TestimonialsSection = () => (
  <section className="py-20 bg-cafe-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-playfair text-cafe-black mb-4">
          What Our Guests Say
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Testimonial 1 */}
        <div className="bg-white/90 p-8 rounded-lg shadow-lg border border-cafe-gold/20 glass-effect">
          <div className="flex items-center mb-4">
            <div className="flex text-cafe-gold">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-cafe-black/80 mb-6">
            "The most authentic South Indian food I've had outside of Chennai. The dosas are crispy, and the chutneys are flavorful. The weekend buffet is a must-try!"
          </p>
          <div>
            <p className="font-bold text-cafe-black">Priya M.</p>
            <p className="text-cafe-black/60">Regular Customer</p>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-white/90 p-8 rounded-lg shadow-lg border border-cafe-gold/20 glass-effect">
          <div className="flex items-center mb-4">
            <div className="flex text-cafe-gold">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-cafe-black/80 mb-6">
            "Z-Cafe's biryani is exceptional. The flavors are perfectly balanced, and the service is always friendly. My family's favorite weekend dining spot."
          </p>
          <div>
            <p className="font-bold text-cafe-black">Rajesh K.</p>
            <p className="text-cafe-black/60">Mississauga Resident</p>
          </div>
        </div>

        {/* Testimonial 3 */}
        <div className="bg-white/90 p-8 rounded-lg shadow-lg border border-cafe-gold/20 glass-effect">
          <div className="flex items-center mb-4">
            <div className="flex text-cafe-gold">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-cafe-black/80 mb-6">
            "As someone who isn't familiar with South Indian cuisine, the staff at Z-Cafe were incredibly helpful in guiding my selections. Every dish was delightful!"
          </p>
          <div>
            <p className="font-bold text-cafe-black">Sarah T.</p>
            <p className="text-cafe-black/60">First-time visitor</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
