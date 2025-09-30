import React from "react";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";  // Single import of Card
import { Button } from "../ui/button";

// ...rest of your component code

export default function ServiceCard({ title, description, icon: Icon, gradient }) {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Card className={`relative overflow-hidden group hover:scale-105 transition-all duration-300 bg-zinc-900 border-zinc-800 ${gradient}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="p-6 relative z-10">
        <div className="w-16 h-16 rounded-xl bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors duration-300">
          <Icon className="w-8 h-8 text-red-500 group-hover:text-white transition-colors duration-300" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-zinc-400 mb-4 leading-relaxed">{description}</p>
        
        <Button
          variant="ghost"
          onClick={scrollToBooking}
          className="text-red-500 hover:text-red-400 p-0 h-auto font-semibold group/btn"
        >
          Book Now
          <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}