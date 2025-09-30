export function createPageUrl(pageName) {
  switch (pageName) {
    case "Home":
      return "/";
    case "Booking":
      return "/booking";
    case "Dashboard":
      return "/dashboard";
    case "Admin":
      return "/admin";
    default:
      return "/";
  }
}