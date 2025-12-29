import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// AUTH
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// USER PAGES
import SearchPage from "./pages/SearchPage";
import BusList from "./pages/Buses/BusList";
import SeatSelection from "./pages/Seats/SeatSelection";
import PaymentPage from "./pages/PaymentPage";
import BookingSuccess from "./pages/BookingSuccess";
import PaymentSuccess from "./pages/PaymentSuccess";

// ADMIN PAGES
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddBus from "./pages/Admin/AddBus";
import AddSeats from "./pages/Admin/AddSeats";
import AddRoute from "./pages/Admin/AddRoute";
import ViewBookings from "./pages/Admin/ViewBookings";

// PROTECTED ROUTE
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Register />} />  
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER ROUTES */}
        <Route
          path="/search"
          element={
            <ProtectedRoute role="USER">
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buses"
          element={
            <ProtectedRoute role="USER">
              <BusList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seats"
          element={
            <ProtectedRoute role="USER">
              <SeatSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute role="USER">
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-success"
          element={
            <ProtectedRoute role="USER">
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
        <Route
  path="/my-bookings"
  element={
    <ProtectedRoute role="USER">
      <BookingSuccess />
    </ProtectedRoute>
  }
/>


        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-bus"
          element={
            <ProtectedRoute role="ADMIN">
              <AddBus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-seats"
          element={
            <ProtectedRoute role="ADMIN">
              <AddSeats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-route"
          element={
            <ProtectedRoute role="ADMIN">
              <AddRoute />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/view-bookings"
          element={
            <ProtectedRoute role="ADMIN">
              <ViewBookings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
