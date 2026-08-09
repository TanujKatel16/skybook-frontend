import React from "react";
import { useNavigate } from "react-router-dom";

const FlightCard = ({ flight, passengers }) => {

    const navigate = useNavigate();

    const handleBookNow = () => {

        console.log("Passengers:", passengers);

        navigate(`/flights/${flight._id}`, {
            state: {
                passengers
            }
        });

    };

    return (

        <div className="border border-gray-300 bg-white p-3 mb-2 rounded-sm font-sans hover:bg-gray-50 transition-colors">

            <div className="flex justify-between items-center">

                <div className="flex flex-col">

                    <div className="text-blue-800 font-bold text-base">
                        {flight.flightNumber}
                    </div>

                    <span className="text-sm text-gray-600 mt-1">
                        {flight.source} &rarr; {flight.destination}
                    </span>

                </div>

                <div className="flex items-center gap-6">

                    <div className="text-right flex flex-col">

                        <span className="text-base font-bold text-gray-900">
                            ₹{flight.baseFare}
                        </span>

                        <span className="text-xs font-bold text-green-700 mt-1">
                            {flight.availableSeats} seats left
                        </span>

                    </div>

                    <button
                        onClick={handleBookNow}
                        className="border border-gray-400 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-4 py-1.5 rounded-sm transition-colors cursor-pointer active:bg-gray-300"
                    >
                        Book Now
                    </button>

                </div>

            </div>

        </div>

    );

};

export default FlightCard;