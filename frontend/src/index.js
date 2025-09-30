import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
