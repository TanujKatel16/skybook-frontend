import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import flightService from "../services/flight.service";
import Navbar from "../components/common/Navbar";

const FlightDetails = () => {

    const { id } = useParams();

    const [flight, setFlight] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchFlight = async () => {

            try {

                const data = await flightService.getFlightById(id);

                setFlight(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchFlight();

    }, [id]);

    if (loading) {

        return (

            <div className="max-w-3xl mx-auto mt-8 border border-gray-300 bg-white p-8 rounded-sm">

                <h1 className="text-lg font-bold border-b pb-2">
                    Flight Details
                </h1>

                <p className="mt-5 text-gray-600">
                    Loading flight information...
                </p>

            </div>

        );

    }

    if (!flight) {

        return (

            <div className="max-w-3xl mx-auto mt-8 border border-red-300 bg-white p-8 rounded-sm">

                <h1 className="text-lg font-bold text-red-700">
                    Flight Not Found
                </h1>

                <p className="mt-3 text-gray-600">
                    The requested flight does not exist or has been removed.
                </p>

            </div>

        );

    }

    return (

        <div>

            <Navbar />

            <div className="max-w-3xl mx-auto mt-8 border border-gray-300 bg-white rounded-sm overflow-hidden">

                <div className="bg-gray-100 border-b border-gray-300 px-5 py-3">

                    <h1 className="text-lg font-bold text-gray-800">
                        Flight Details
                    </h1>

                </div>

                <div className="p-5">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-5">

                        <div>

                            <p className="text-xs text-gray-500">
                                Flight Number
                            </p>

                            <p className="font-bold text-blue-800 text-base">
                                {flight.flightNumber}
                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">
                                Status
                            </p>

                            <p
                                className={`font-bold ${flight.status === "Scheduled"
                                        ? "text-green-700"
                                        : flight.status === "Cancelled"
                                            ? "text-red-700"
                                            : "text-orange-600"
                                    }`}
                            >
                                {flight.status}
                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">
                                Source
                            </p>

                            <p className="font-semibold">
                                {flight.source}
                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">
                                Destination
                            </p>

                            <p className="font-semibold">
                                {flight.destination}
                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">
                                Departure
                            </p>

                            <p className="font-semibold">
                                {new Date(flight.departureTime).toLocaleString()}
                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">
                                Arrival
                            </p>

                            <p className="font-semibold">
                                {new Date(flight.arrivalTime).toLocaleString()}
                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">
                                Available Seats
                            </p>

                            <p className="font-semibold">
                                {flight.availableSeats} / {flight.totalSeats}
                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">
                                Base Fare
                            </p>

                            <p className="font-bold text-green-700 text-lg">
                                ₹ {flight.baseFare}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="bg-gray-50 border-t border-gray-300 px-5 py-4 flex justify-end">

                    <button
                        className="border border-gray-400 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-4 py-1.5 rounded-sm transition-colors cursor-pointer active:bg-gray-300">
                        Continue Booking →
                    </button>

                </div>

            </div>
        </div>

    );

};

export default FlightDetails;