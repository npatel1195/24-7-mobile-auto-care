import axios from "axios";

export async function SendEmail({ to, subject, body }) {
  // For demo, just log email sending
  console.log(`Sending email to ${to} with subject "${subject}" and body:\n${body}`);

  // In real app, call backend email API or third-party service here
  // Example:
  // await axios.post(`${process.env.REACT_APP_API_URL}/send-email`, { to, subject, body });
}