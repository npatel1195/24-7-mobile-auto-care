import React, { useState } from "react";
import { Appointment } from "../../entities/Appointment";
import { SendEmail } from "../../integrations/Core";
import { Button } from "../ui/button";          // Only one import of Button
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// ...rest of your component code

const CAR_COMPANIES = [
  "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Hyundai", "Kia", 
  "Mazda", "Subaru", "Volkswagen", "BMW", "Mercedes-Benz", "Audi",
  "Dodge", "Ram", "GMC", "Jeep", "Chrysler", "Tesla", "Lexus", "Other"
];

const CAR_MODELS = {
  "Toyota": ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma", "Tundra", "4Runner", "Sienna", "Prius", "Other"],
  "Honda": ["Civic", "Accord", "CR-V", "Pilot", "Odyssey", "HR-V", "Ridgeline", "Fit", "Passport", "Other"],
  "Ford": ["F-150", "Escape", "Explorer", "Edge", "Mustang", "Ranger", "Expedition", "Bronco", "Maverick", "Other"],
  "Chevrolet": ["Silverado", "Equinox", "Malibu", "Traverse", "Tahoe", "Colorado", "Camaro", "Blazer", "Suburban", "Other"],
  "Nissan": ["Altima", "Sentra", "Rogue", "Pathfinder", "Frontier", "Titan", "Murano", "Maxima", "Kicks", "Other"],
  "Hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona", "Palisade", "Venue", "Accent", "Ioniq", "Other"],
  "Kia": ["Forte", "Optima", "Sportage", "Sorento", "Telluride", "Soul", "Seltos", "Rio", "Stinger", "Other"],
  "Mazda": ["Mazda3", "Mazda6", "CX-5", "CX-9", "CX-30", "MX-5 Miata", "CX-50", "Other"],
  "Subaru": ["Outback", "Forester", "Crosstrek", "Impreza", "Legacy", "Ascent", "WRX", "BRZ", "Other"],
  "Volkswagen": ["Jetta", "Passat", "Tiguan", "Atlas", "Golf", "Taos", "Arteon", "ID.4", "Other"],
  "BMW": ["3 Series", "5 Series", "X3", "X5", "7 Series", "X1", "X7", "4 Series", "2 Series", "Other"],
  "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE", "S-Class", "A-Class", "GLA", "GLB", "GLS", "Other"],
  "Audi": ["A4", "A6", "Q5", "Q7", "A3", "Q3", "A5", "Q8", "e-tron", "Other"],
  "Dodge": ["Charger", "Challenger", "Durango", "Grand Caravan", "Journey", "Other"],
  "Ram": ["1500", "2500", "3500", "ProMaster", "Other"],
  "GMC": ["Sierra", "Terrain", "Acadia", "Yukon", "Canyon", "Savana", "Other"],
  "Jeep": ["Wrangler", "Grand Cherokee", "Cherokee", "Compass", "Renegade", "Gladiator", "Wagoneer", "Other"],
  "Chrysler": ["Pacifica", "300", "Voyager", "Other"],
  "Tesla": ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck", "Other"],
  "Lexus": ["RX", "ES", "NX", "IS", "GX", "UX", "LX", "LS", "Other"]
};

const ISSUE_TYPES = [
  "Engine Light Diagnostics",
  "ABS and Other Electrical",
  "Diagnostics",
  "Mechanical Diagnostics (noises, leaks, etc.)",
  "Electrical Diagnostics",
  "General Inspection",
  "AC Diagnostics and Recharge",
  "Oil Change",
  "Tire Change, Rotation, Repair",
  "SGI Inspection",
  "4-Wheel Alignment",
  "Pre-Purchase Inspection",
  "Other"
];

const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear + 1; year >= 1990; year--) {
    years.push(year.toString());
  }
  return years;
};

export default function BookingForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    car_company: "",
    car_model: "",
    car_year: "",
    vin_number: "",
    issue_type: "",
    issue_description: "",
    preferred_date: "",
    preferred_time: ""
  });

  const [showCustomModel, setShowCustomModel] = useState(false);
  const [showCustomIssue, setShowCustomIssue] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === "car_company") {
      // Reset car model when company changes
      setFormData(prev => ({ ...prev, car_model: "" }));
      setShowCustomModel(value === "Other");
    }
    
    if (field === "car_model") {
      setShowCustomModel(value === "Other");
    }
    
    if (field === "issue_type") {
      setShowCustomIssue(value === "Other");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const appointment = await Appointment.create({
        ...formData,
        status: "pending"
      });

      // Send notification email to admin
      await SendEmail({
        to: "24.7mobileautocare@gmail.com",
        subject: "New Appointment Request - 24/7 Mobile Auto Care",
        body: `
New appointment request received:

Customer: ${formData.first_name} ${formData.last_name}
Email: ${formData.email}
Phone: ${formData.phone}

Vehicle Details:
- Company: ${formData.car_company}
- Model: ${formData.car_model}
- Year: ${formData.car_year}
- VIN: ${formData.vin_number}

Service Requested: ${formData.issue_type}
${formData.issue_description ? `Description: ${formData.issue_description}` : ''}

Preferred Date: ${formData.preferred_date}
Preferred Time: ${formData.preferred_time}

Please log in to the admin dashboard to confirm or reschedule this appointment.
        `
      });

      // Send confirmation to customer
      await SendEmail({
        to: formData.email,
        subject: "Appointment Request Received - 24/7 Mobile Auto Care",
        body: `
Dear ${formData.first_name},

Thank you for choosing 24/7 Mobile Auto Care!

We have received your appointment request for ${formData.preferred_date} at ${formData.preferred_time}.

Service: ${formData.issue_type}
Vehicle: ${formData.car_year} ${formData.car_company} ${formData.car_model}

Our team will review your request and send you a confirmation email shortly with the final appointment details.

If you have any questions, please contact us at:
Phone: +1 (639) 339-2407
Email: 24.7mobileautocare@gmail.com

Best regards,
24/7 Mobile Auto Care Team
        `
      });

      setSubmitted(true);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        car_company: "",
        car_model: "",
        car_year: "",
        vin_number: "",
        issue_type: "",
        issue_description: "",
        preferred_date: "",
        preferred_time: ""
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting appointment:", error);
      alert("There was an error submitting your appointment. Please try again.");
    }

    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Appointment Requested!</h3>
          <p className="text-zinc-400">
            We've received your request and will contact you shortly to confirm your appointment.
          </p>
        </CardContent>
      </Card>
    );
  }

  const availableModels = formData.car_company && formData.car_company !== "Other" 
    ? CAR_MODELS[formData.car_company] || []
    : [];

  return (
    <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
      <CardHeader className="border-b border-zinc-800">
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Calendar className="w-6 h-6 text-red-500" />
          Book Your Appointment
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name" className="text-zinc-300">First Name *</Label>
              <Input
                id="first_name"
                required
                value={formData.first_name}
                onChange={(e) => handleChange("first_name", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name" className="text-zinc-300">Last Name *</Label>
              <Input
                id="last_name"
                required
                value={formData.last_name}
                onChange={(e) => handleChange("last_name", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-zinc-300">Phone Number *</Label>
              <Input
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="+1 (639) 123-4567"
              />
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="pt-4 border-t border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-4">Vehicle Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="car_company" className="text-zinc-300">Car Company *</Label>
                <Select value={formData.car_company} onValueChange={(value) => handleChange("car_company", value)} required>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {CAR_COMPANIES.map((company) => (
                      <SelectItem key={company} value={company}>{company}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="car_model" className="text-zinc-300">Car Model *</Label>
                {formData.car_company === "Other" || showCustomModel ? (
                  <Input
                    id="car_model"
                    required
                    value={formData.car_model}
                    onChange={(e) => handleChange("car_model", e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    placeholder="Enter model name"
                  />
                ) : (
                  <Select 
                    value={formData.car_model} 
                    onValueChange={(value) => handleChange("car_model", value)} 
                    required
                    disabled={!formData.car_company}
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder={formData.car_company ? "Select model" : "Select company first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModels.map((model) => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="car_year" className="text-zinc-300">Year *</Label>
                <Select value={formData.car_year} onValueChange={(value) => handleChange("car_year", value)} required>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {generateYears().map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vin_number" className="text-zinc-300">VIN Number *</Label>
                <Input
                  id="vin_number"
                  required
                  value={formData.vin_number}
                  onChange={(e) => handleChange("vin_number", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="17-character VIN"
                  maxLength={17}
                />
              </div>
            </div>
          </div>

          {/* Service Information */}
          <div className="pt-4 border-t border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-4">Service Details</h3>
            
            <div className="space-y-2 mb-4">
              <Label htmlFor="issue_type" className="text-zinc-300">Service Type *</Label>
              <Select value={formData.issue_type} onValueChange={(value) => handleChange("issue_type", value)} required>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {ISSUE_TYPES.map((issue) => (
                    <SelectItem key={issue} value={issue}>{issue}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {showCustomIssue && (
              <div className="space-y-2 mb-4">
                <Label htmlFor="custom_issue" className="text-zinc-300">Describe Your Issue *</Label>
                <Textarea
                  id="custom_issue"
                  required
                  value={formData.issue_description}
                  onChange={(e) => handleChange("issue_description", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="Please describe the issue in detail..."
                  rows={3}
                />
              </div>
            )}

            {!showCustomIssue && (
              <div className="space-y-2">
                <Label htmlFor="issue_description" className="text-zinc-300">Additional Details (Optional)</Label>
                <Textarea
                  id="issue_description"
                  value={formData.issue_description}
                  onChange={(e) => handleChange("issue_description", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="Any additional information..."
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* Appointment Time */}
          <div className="pt-4 border-t border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-4">Preferred Date & Time</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferred_date" className="text-zinc-300">Preferred Date *</Label>
                <Input
                  id="preferred_date"
                  type="date"
                  required
                  value={formData.preferred_date}
                  onChange={(e) => handleChange("preferred_date", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred_time" className="text-zinc-300">Preferred Time *</Label>
                <Input
                  id="preferred_time"
                  type="time"
                  required
                  value={formData.preferred_time}
                  onChange={(e) => handleChange("preferred_time", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full gradient-red text-white font-semibold py-6 text-lg hover:opacity-90 transition-opacity"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting Request...
              </>
            ) : (
              <>
                <Clock className="w-5 h-5 mr-2" />
                Request Appointment
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}