const Appointment = require('../models/Appointment');

// Create new appointment
exports.createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all appointments, optionally sorted
exports.getAppointments = async (req, res) => {
  try {
    const sort = req.query.sort || '-created_date';
    const appointments = await Appointment.find().sort(sort);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update appointment by ID
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};