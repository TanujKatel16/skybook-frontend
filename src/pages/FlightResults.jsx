import { useLocation } from "react-router-dom";
import FlightList from "../components/common/FlightList";
import Navbar from "../components/common/Navbar";

const FlightResults = () => {

    const { state } = useLocation();

    const flights = state?.flights || [];

    return (

    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        
       <Navbar />       

        <div className="max-w-5xl mx-auto mt-10">

            <h1 className="text-3xl font-bold mb-6">

                Available Flights

            </h1>

            {
                flights.length === 0 ? (

                    <p>No flights found.</p>

                ) : (

                    <FlightList flights={flights} />

                )
            }

        </div>
    </div>

    );

};

export default FlightResults;