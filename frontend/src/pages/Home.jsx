import React from "react";
import { Button } from "../components/ui/button";

// ...rest of your component code

const SERVICES = [
  {
    title: "Computer Diagnostics",
    description: "Unlock the full potential of your vehicle's well-being through our expert Computer Diagnostics service. With cutting-edge technology, we skillfully decode your car's digital language.",
    icon: Wrench
  },
  {
    title: "Engine Light Diagnostics",
    description: "Advanced diagnostics to identify and resolve check engine light issues quickly and accurately.",
    icon: CheckCircle
  },
  {
    title: "Electrical Diagnostics",
    description: "Comprehensive electrical system diagnostics including ABS and other electrical components.",
    icon: Shield
  },
  {
    title: "Mechanical Diagnostics",
    description: "Expert diagnosis of mechanical issues including noises, leaks, and performance problems.",
    icon: Wrench
  },
  {
    title: "Oil Change & Maintenance",
    description: "Complete oil change service and routine maintenance to keep your vehicle running smoothly.",
    icon: CheckCircle
  },
  {
    title: "Tire Services",
    description: "Tire change, rotation, repair, and 4-wheel alignment services for optimal performance.",
    icon: Shield
  },
  {
    title: "Inspections",
    description: "SGI inspections, pre-purchase inspections, and general vehicle inspections.",
    icon: CheckCircle
  },
  {
    title: "AC Service",
    description: "AC diagnostics and recharge services to keep you cool in all seasons.",
    icon: Wrench
  }
];

export default function Home() {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/95 to-transparent z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000')`
          }}
        />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-red-600/20 border border-red-600/50 rounded-full mb-6">
              <p className="text-red-500 font-semibold text-sm">Available 24/7 • Mobile Service</p>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Professional
              <span className="block text-red-500 text-glow">Mobile Auto Care</span>
            </h1>
            
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              Expert automotive diagnostics and repair services that come to you. 
              Available 24/7 in Saskatoon and surrounding areas.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={scrollToBooking}
                className="gradient-red text-white px-8 py-6 text-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Book Appointment Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <a href="tel:+16393392407">
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white px-8 py-6 text-lg font-semibold hover:bg-white hover:text-zinc-950 transition-all"
                >
                  Call +1 (639) 339-2407
                </Button>
              </a>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center">
                <Clock className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-white font-semibold">24/7</p>
                <p className="text-zinc-400 text-sm">Available</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-white font-semibold">Licensed</p>
                <p className="text-zinc-400 text-sm">Certified</p>
              </div>
              <div className="text-center">
                <Wrench className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-white font-semibold">Mobile</p>
                <p className="text-zinc-400 text-sm">Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-red-600/20 border border-red-600/50 rounded-full mb-4">
              <p className="text-red-500 font-semibold text-sm uppercase tracking-wider">Saskatoon Auto Repair</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              One Stop <span className="text-red-500">Auto Repair</span> Shop
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              We are dedicated to swiftly getting you back on the road. Explore the array of services we offer below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Book Your <span className="text-red-500">Appointment</span>
            </h2>
            <p className="text-zinc-400 text-lg">
              Fill out the form below and we'll get back to you shortly to confirm your appointment.
            </p>
          </div>

          <BookingForm />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Get In <span className="text-red-500">Touch</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-zinc-800 p-8 rounded-xl border border-zinc-700">
                <div className="w-16 h-16 gradient-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <a href="tel:+16393392407" className="text-red-500 hover:text-red-400 text-lg">
                  +1 (639) 339-2407
                </a>
              </div>

              <div className="bg-zinc-800 p-8 rounded-xl border border-zinc-700">
                <div className="w-16 h-16 gradient-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <a href="mailto:24.7mobileautocare@gmail.com" className="text-red-500 hover:text-red-400 text-lg break-all">
                  24.7mobileautocare@gmail.com
                </a>
              </div>

              <div className="bg-zinc-800 p-8 rounded-xl border border-zinc-700">
                <div className="w-16 h-16 gradient-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                <p className="text-zinc-300">
                  Unit 235, 243 Wheeler Street
                  <br />
                  Saskatoon, SK S7P 0A4
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}