import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, MapPin, Mail, Wrench } from "lucide-react";
import { createPageUrl } from "./utils";


export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const isAdminPage = location.pathname.includes("Admin");

  return (
    <div className="min-h-screen bg-zinc-950">
      <style>{`
        :root {
          --primary-red: #dc2626;
          --dark-bg: #09090b;
          --card-bg: #18181b;
        }
        
        .gradient-red {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
        }
        
        .text-glow {
          text-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
        }
      `}</style>

      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-red rounded-lg flex items-center justify-center">
                <Wrench className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">24/7 Mobile Auto Care</h1>
                <p className="text-sm text-zinc-400">Your Parts and Fleet Specialist</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 text-sm">
              <div className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-4 h-4 text-red-500" />
                <a href="tel:+16393392407" className="hover:text-red-500 transition-colors">
                  +1 (639) 339-2407
                </a>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Mail className="w-4 h-4 text-red-500" />
                <a href="mailto:24.7mobileautocare@gmail.com" className="hover:text-red-500 transition-colors">
                  24.7mobileautocare@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-xs">Unit 235, 243 Wheeler Street, Saskatoon, SK S7P 0A4</span>
              </div>
            </div>
          </div>

          {!isAdminPage && (
            <nav className="mt-4 flex justify-center gap-6">
              <a href="#home" className="text-zinc-300 hover:text-red-500 transition-colors font-medium">
                Home
              </a>
              <a href="#services" className="text-zinc-300 hover:text-red-500 transition-colors font-medium">
                Services
              </a>
              <a href="#booking" className="text-zinc-300 hover:text-red-500 transition-colors font-medium">
                Book Now
              </a>
              <a href="#contact" className="text-zinc-300 hover:text-red-500 transition-colors font-medium">
                Contact
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold mb-3">Contact Us</h3>
              <div className="space-y-2 text-zinc-400 text-sm">
                <p>Phone: +1 (639) 339-2407</p>
                <p>Email: 24.7mobileautocare@gmail.com</p>
                <p>Unit 235, 243 Wheeler Street</p>
                <p>Saskatoon, Saskatchewan S7P 0A4</p>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3">Hours</h3>
              <div className="space-y-2 text-zinc-400 text-sm">
                <p>Available 24/7</p>
                <p>Emergency Services Available</p>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3">Services</h3>
              <div className="space-y-2 text-zinc-400 text-sm">
                <p>Mobile Auto Repair</p>
                <p>Diagnostics</p>
                <p>Inspections</p>
                <p>Maintenance</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-800 text-center text-zinc-500 text-sm">
            <p>© 2024 24/7 Mobile Auto Care. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}