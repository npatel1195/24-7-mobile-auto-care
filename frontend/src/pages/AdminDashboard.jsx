import React, { useState, useEffect } from "react";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import { SendEmail } from "../integrations/Core";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { createPageUrl } from "../utils";


export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    loadUser();
    loadAppointments();
  }, []);

  const loadUser = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);
      
      // Check if user is admin
      if (user.role !== 'admin') {
        // Redirect non-admins to the home page.
        window.location.href = createPageUrl('Home');
      }
    } catch (error) {
      // If user is not logged in, prompt them to log in.
      await User.loginWithRedirect(window.location.href);
    }
  };

  const handleLogout = async () => {
    await User.logout();
    window.location.href = createPageUrl('Home');
  };

  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      const data = await Appointment.list("-created_date");
      setAppointments(data);
    } catch (error) {
      console.error("Error loading appointments:", error);
    }
    setIsLoading(false);
  };

  const handleConfirm = async (appointment) => {
    try {
      await Appointment.update(appointment.id, {
        status: "confirmed",
        confirmed_date: appointment.preferred_date,
        confirmed_time: appointment.preferred_time
      });

      await SendEmail({
        to: appointment.email,
        subject: "Appointment Confirmed - 24/7 Mobile Auto Care",
        body: `
Dear ${appointment.first_name},

Great news! Your appointment has been confirmed.

Confirmed Details:
Date: ${appointment.preferred_date}
Time: ${appointment.preferred_time}
Service: ${appointment.issue_type}
Vehicle: ${appointment.car_year} ${appointment.car_company} ${appointment.car_model}

We'll see you then! If you need to make any changes, please contact us at:
Phone: +1 (639) 339-2407
Email: 24.7mobileautocare@gmail.com

Best regards,
24/7 Mobile Auto Care Team
        `
      });

      loadAppointments();
      setSelectedAppointment(null);
    } catch (error) {
      console.error("Error confirming appointment:", error);
    }
  };

  const handleReschedule = async (appointment, newDate, newTime) => {
    try {
      await Appointment.update(appointment.id, {
        status: "rescheduled",
        confirmed_date: newDate,
        confirmed_time: newTime
      });

      await SendEmail({
        to: appointment.email,
        subject: "Appointment Rescheduled - 24/7 Mobile Auto Care",
        body: `
Dear ${appointment.first_name},

Your appointment has been rescheduled to better accommodate our schedule.

New Appointment Details:
Date: ${newDate}
Time: ${newTime}
Service: ${appointment.issue_type}
Vehicle: ${appointment.car_year} ${appointment.car_company} ${appointment.car_model}

If this time doesn't work for you, please contact us at:
Phone: +1 (639) 339-2407
Email: 24.7mobileautocare@gmail.com

Best regards,
24/7 Mobile Auto Care Team
        `
      });

      loadAppointments();
      setSelectedAppointment(null);
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  const handleCancel = async (appointment) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      await Appointment.update(appointment.id, {
        status: "cancelled"
      });

      await SendEmail({
        to: appointment.email,
        subject: "Appointment Cancelled - 24/7 Mobile Auto Care",
        body: `
Dear ${appointment.first_name},

We regret to inform you that your appointment for ${appointment.preferred_date} at ${appointment.preferred_time} has been cancelled.

If you'd like to reschedule, please contact us at:
Phone: +1 (639) 339-2407
Email: 24.7mobileautocare@gmail.com

We apologize for any inconvenience.

Best regards,
24/7 Mobile Auto Care Team
        `
      });

      loadAppointments();
      setSelectedAppointment(null);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const downloadExcel = () => {
    const csvData = appointments.map(apt => ({
      'First Name': apt.first_name,
      'Last Name': apt.last_name,
      'Email': apt.email,
      'Phone': apt.phone,
      'Car Company': apt.car_company,
      'Car Model': apt.car_model,
      'Year': apt.car_year,
      'VIN': apt.vin_number,
      'Service': apt.issue_type,
      'Description': apt.issue_description || '',
      'Preferred Date': apt.preferred_date,
      'Preferred Time': apt.preferred_time,
      'Status': apt.status,
      'Confirmed Date': apt.confirmed_date || '',
      'Confirmed Time': apt.confirmed_time || '',
      'Created': format(new Date(apt.created_date), 'yyyy-MM-dd HH:mm')
    }));

    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `appointments-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-300", text: "Pending" },
      confirmed: { color: "bg-green-100 text-green-800 border-green-300", text: "Confirmed" },
      rescheduled: { color: "bg-blue-100 text-blue-800 border-blue-300", text: "Rescheduled" },
      completed: { color: "bg-gray-100 text-gray-800 border-gray-300", text: "Completed" },
      cancelled: { color: "bg-red-100 text-red-800 border-red-300", text: "Cancelled" }
    };
    const variant = variants[status] || variants.pending;
    return <Badge className={`${variant.color} border`}>{variant.text}</Badge>;
  };

  const filteredAppointments = appointments.filter(apt => {
    if (activeTab === "all") return true;
    return apt.status === activeTab;
  });

  const stats = {
    pending: appointments.filter(a => a.status === "pending").length,
    confirmed: appointments.filter(a => a.status === "confirmed").length,
    total: appointments.length
  };

  if (isLoading || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-zinc-400">Manage appointment requests and bookings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={downloadExcel}
            variant="outline"
            className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export to Excel
          </Button>
          <Button
            onClick={handleLogout}
            variant="destructive"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-zinc-400">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-zinc-400">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{stats.confirmed}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments List */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-zinc-800">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="rescheduled">Rescheduled</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">
                No appointments in this category
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className="bg-zinc-800 border-zinc-700 hover:border-zinc-600 transition-colors cursor-pointer"
                  onClick={() => setSelectedAppointment(appointment)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">
                            {appointment.first_name} {appointment.last_name}
                          </h3>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {appointment.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {appointment.phone}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Car className="w-4 h-4 text-red-500" />
                        <span>{appointment.car_year} {appointment.car_company} {appointment.car_model}</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Calendar className="w-4 h-4 text-red-500" />
                        <span>{appointment.preferred_date} at {appointment.preferred_time}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-zinc-400">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
                      <span className="text-sm">{appointment.issue_type}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onConfirm={handleConfirm}
          onReschedule={handleReschedule}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
