const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  car_company: { type: String, required: true },
  car_model: { type: String, required: true },
  car_year: { type: String, required: true },
  vin_number: { type: String, required: true },
  issue_type: { type: String, required: true },
  issue_description: { type: String },
  preferred_date: { type: String, required: true },
  preferred_time: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["pending", "confirmed", "rescheduled", "completed", "cancelled"], 
    default: "pending" 
  },
  admin_notes: { type: String },
  confirmed_date: { type: String },
  confirmed_time: { type: String },
  google_calendar_event_id: { type: String },
  created_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);