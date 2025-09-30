import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Appointment } from "../../entities/Appointment";

export default function AppointmentDetailsModal({ 
  appointment, 
  onClose, 
  onConfirm, 
  onReschedule,
  onCancel 
}) {
  const [rescheduleDate, setRescheduleDate] = useState(appointment.preferred_date);
  const [rescheduleTime, setRescheduleTime] = useState(appointment.preferred_time);
  const [adminNotes, setAdminNotes] = useState(appointment.admin_notes || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveNotes = async () => {
    setIsSaving(true);
    try {
      await Appointment.update(appointment.id, { admin_notes: adminNotes });
      alert("Notes saved successfully!");
    } catch (error) {
      console.error("Error saving notes:", error);
    }
    setIsSaving(false);
  };

  return (
    <Dialog open={!!appointment} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Appointment Details</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="bg-zinc-800">
            <TabsTrigger value="details">Customer & Vehicle</TabsTrigger>
            <TabsTrigger value="service">Service Details</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6 mt-6">
            {/* Customer Information */}
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-red-500" />
                Customer Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-400">Name</p>
                  <p className="font-semibold">{appointment.first_name} {appointment.last_name}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Email</p>
                  <p className="font-semibold break-all">{appointment.email}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Phone</p>
                  <p className="font-semibold">{appointment.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Booking Date</p>
                  <p className="font-semibold">{format(new Date(appointment.created_date), 'MMM d, yyyy HH:mm')}</p>
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-red-500" />
                Vehicle Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-400">Make & Model</p>
                  <p className="font-semibold">{appointment.car_company} {appointment.car_model}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Year</p>
                  <p className="font-semibold">{appointment.car_year}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-zinc-400">VIN Number</p>
                  <p className="font-semibold">{appointment.vin_number}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="service" className="space-y-6 mt-6">
            {/* Appointment Details */}
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-500" />
                Appointment Schedule
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-400">Preferred Date</p>
                  <p className="font-semibold">{appointment.preferred_date}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Preferred Time</p>
                  <p className="font-semibold">{appointment.preferred_time}</p>
                </div>
                {appointment.confirmed_date && (
                  <>
                    <div>
                      <p className="text-sm text-zinc-400">Confirmed Date</p>
                      <p className="font-semibold text-green-500">{appointment.confirmed_date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Confirmed Time</p>
                      <p className="font-semibold text-green-500">{appointment.confirmed_time}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-red-500" />
                Service Requested
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-zinc-400">Service Type</p>
                  <p className="font-semibold text-lg">{appointment.issue_type}</p>
                </div>
                {appointment.issue_description && (
                  <div>
                    <p className="text-sm text-zinc-400">Additional Details</p>
                    <p className="text-zinc-300">{appointment.issue_description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Admin Notes */}
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Internal Notes</h3>
              <Textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="bg-zinc-900 border-zinc-700 text-white min-h-24"
                placeholder="Add internal notes about this appointment..."
              />
              <Button
                onClick={handleSaveNotes}
                disabled={isSaving}
                className="mt-2 bg-zinc-700 hover:bg-zinc-600"
              >
                {isSaving ? "Saving..." : "Save Notes"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6 mt-6">
            {appointment.status === "pending" && (
              <>
                {/* Confirm Appointment */}
                <div className="bg-zinc-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Confirm Appointment
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    Confirm this appointment for the requested date and time.
                  </p>
                  <Button
                    onClick={() => onConfirm(appointment)}
                    className="w-full gradient-red text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm for {appointment.preferred_date} at {appointment.preferred_time}
                  </Button>
                </div>

                {/* Reschedule */}
                <div className="bg-zinc-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CalendarClock className="w-5 h-5 text-blue-500" />
                    Reschedule Appointment
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    Propose a different date and time for this appointment.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="text-zinc-300">New Date</Label>
                      <Input
                        type="date"
                        value={rescheduleDate}
                        onChange={(e) => setRescheduleDate(e.target.value)}
                        className="bg-zinc-900 border-zinc-700 text-white"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-300">New Time</Label>
                      <Input
                        type="time"
                        value={rescheduleTime}
                        onChange={(e) => setRescheduleTime(e.target.value)}
                        className="bg-zinc-900 border-zinc-700 text-white"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => onReschedule(appointment, rescheduleDate, rescheduleTime)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <CalendarClock className="w-4 h-4 mr-2" />
                    Reschedule to {rescheduleDate} at {rescheduleTime}
                  </Button>
                </div>
              </>
            )}

            {/* Cancel Appointment */}
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                Cancel Appointment
              </h3>
              <p className="text-zinc-400 mb-4">
                Cancel this appointment and notify the customer.
              </p>
              <Button
                onClick={() => onCancel(appointment)}
                variant="destructive"
                className="w-full"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Cancel Appointment
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose} variant="outline" className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}