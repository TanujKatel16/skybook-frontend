import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import FlightResults from "./pages/FlightResults.jsx";
import FlightDetails from "./pages/FlightDetails.jsx";
import Booking from "./pages/Booking.jsx";
import BookingDetails from "./pages/BookingDetails";
import Payment from "./pages/Payment.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
function App() {

    return (

        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/flights/search" element={<FlightResults />} />

            <Route path="/flights/:id" element={<FlightDetails/>} />

            <Route path="/bookings/new/:flightId" element={<Booking/>} />

            <Route path="/bookings/:id" element={<BookingDetails/>} />

            <Route path="/payments/:bookingId" element={<Payment/>} />

            <Route path="/payments/success/:paymentId" element={<PaymentSuccess/>} />

        </Routes>

    );

}

export default App;