import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import FlightResults from "./pages/FlightResults.jsx";
import FlightDetails from "./pages/FlightDetails.jsx";

function App() {

    return (

        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/flights/search" element={<FlightResults />} />

            <Route path="/flights/:id" element={<FlightDetails/>} />

        </Routes>

    );

}

export default App;