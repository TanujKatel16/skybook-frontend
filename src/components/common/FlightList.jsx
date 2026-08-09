import { useLocation } from "react-router-dom";
import FlightCard from "./FlightCard";

const FlightList = () => {

    const location = useLocation();

    const flights = location.state?.flights || [];
    const search = location.state?.search;

    console.log("FlightList search:", search);
    console.log("Passengers:", search?.passengers);

    return (

        <div className="space-y-4">

            {flights.map((flight) => (

                <FlightCard
                    key={flight._id}
                    flight={flight}
                    passengers={Number(search?.passengers) || 1}
                />

            ))}

        </div>

    );

};

export default FlightList;