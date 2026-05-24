import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PropertyDetails from "./pages/PropertyDetails";
import Header from "./components/Header";
import VisitModal from "./components/VisitModal";
import ContactModal from "./components/ContactModal";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProperty from "./pages/admin/AddProperty";
import ManageProperties from "./pages/admin/ManageProperties";
import EditProperty from "./pages/admin/EditProperty";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoutes";
import "./index.css";

export default function App() {
  const [visitProp, setVisitProp] = useState(null);
  const [contactMode, setContactMode] = useState(null);

  return (
   <>
      <Header onListProperty={() => setContactMode("sell")} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              onVisit={setVisitProp}
              onListProperty={() => setContactMode("sell")}
              onConsult={() => setContactMode("contact")}
            />
          }
        />
        <Route
  path="/property/:id"
  element={<PropertyDetails />}
/>
 <Route path="/admin/login" element={<AdminLogin />} />

<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/add"
  element={
    <ProtectedRoute>
      <AddProperty />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/properties"
  element={
    <ProtectedRoute>
  <ManageProperties />
  </ProtectedRoute>
  }
/>

<Route
  path="/admin/edit/:id"
  element={
    <ProtectedRoute>
  <EditProperty />
  </ProtectedRoute>}
/>
      
      </Routes>

      {visitProp && (
        <VisitModal
          prop={visitProp}
          onClose={() => setVisitProp(null)}
        />
      )}

      {contactMode && (
        <ContactModal
          mode={contactMode}
          onClose={() => setContactMode(null)}
        />
      )}
    </>
  );
}