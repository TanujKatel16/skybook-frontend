import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
    useLocation
} from "react-router-dom";

import flightService from "../services/flight.service";
import bookingService from "../services/booking.service";
import Navbar from "../components/common/Navbar";

const Booking = () => {

    const { flightId } = useParams();

    const navigate = useNavigate();

    const location = useLocation();

    const passengerCount =
        Number(location.state?.passengers) || 1;

    const [flight, setFlight] = useState(null);

    const [loading, setLoading] = useState(true);

    const [bookingLoading, setBookingLoading] =
        useState(false);

    const [error, setError] = useState("");

    const [passengersData, setPassengersData] =
        useState(
            Array.from(
                { length: passengerCount },
                () => ({
                    fullName: "",
                    age: "",
                    gender: "Male"
                })
            )
        );

    useEffect(() => {

        const fetchFlight = async () => {

            try {

                const data =
                    await flightService.getFlightById(
                        flightId
                    );

                setFlight(data);

            }

            catch (error) {

                console.log(error);

                setError(
                    "Unable to load flight details."
                );

            }

            finally {

                setLoading(false);

            }

        };

        fetchFlight();

    }, [flightId]);

    const handleChange = (index, e) => {

        const { name, value } = e.target;

        setPassengersData((prev) => {

            const updated = [...prev];

            updated[index] = {
                ...updated[index],
                [name]: value
            };

            return updated;

        });

    };

    const handleBooking = async () => {

        setError("");

        // Validate every passenger

        for (let i = 0; i < passengersData.length; i++) {

            if (!passengersData[i].fullName.trim()) {

                setError(
                    `Passenger ${i + 1} name is required.`
                );

                return;

            }

            if (!passengersData[i].age) {

                setError(
                    `Passenger ${i + 1} age is required.`
                );

                return;

            }

        }

        // Check seat availability

        if (
            flight.availableSeats <
            passengersData.length
        ) {

            setError(
                `Only ${flight.availableSeats} seats are available.`
            );

            return;

        }

        try {

            setBookingLoading(true);

            const booking =
                await bookingService.createBooking({

                    flightId: flight._id,

                    passengers: passengersData.map(
                        (passenger) => ({

                            fullName:
                                passenger.fullName,

                            age:
                                Number(passenger.age),

                            gender:
                                passenger.gender

                        })
                    )

                });

                console.log("CREATED BOOKING:", booking);
                console.log("PASSENGERS:", booking.passengers);

            navigate(
                `/bookings/${booking._id}`,
                {
                    state: {
                        booking
                    }
                }
            );

        }

        catch (error) {

            console.log(error);

            setError(

                error.response?.data?.message ||

                "Booking failed."

            );

        }

        finally {

            setBookingLoading(false);

        }

    };

    if (loading) {

        return (

            <div>

                <Navbar />

                <div className="max-w-4xl mx-auto mt-8 border border-gray-300 bg-white p-8">

                    <h2 className="text-lg font-bold">

                        Loading Flight...

                    </h2>

                </div>

            </div>

        );

    }

    if (!flight) {

        return (

            <div>

                <Navbar />

                <div className="max-w-4xl mx-auto mt-8 border border-red-300 bg-white p-8">

                    <h2 className="text-lg font-bold text-red-700">

                        Flight Not Found

                    </h2>

                </div>

            </div>

        );

    }

    return (

        <div>

            <Navbar />

            <div className="max-w-5xl mx-auto mt-8 border border-gray-300 bg-white rounded-sm overflow-hidden">

                {/* Header */}

                <div className="bg-gray-100 border-b border-gray-300 px-6 py-4">

                    <h1 className="text-xl font-bold">

                        Passenger Details

                    </h1>

                    <p className="text-xs text-gray-500 mt-1">

                        {passengerCount} passenger
                        {passengerCount > 1 ? "s" : ""}

                    </p>

                </div>

                <div className="grid md:grid-cols-2 gap-8 p-6">

                    {/* Passenger Forms */}

                    <div>

                        {

                            passengersData.map(
                                (passenger, index) => (

                                    <div
                                        key={index}
                                        className="border border-gray-300 p-4 mb-5"
                                    >

                                        <h2 className="font-bold text-sm border-b border-gray-200 pb-2 mb-4">

                                            Passenger {index + 1}

                                        </h2>

                                        {/* Name */}

                                        <div className="mb-5">

                                            <label className="block text-sm font-medium mb-2">

                                                Full Name

                                            </label>

                                            <input
                                                type="text"
                                                name="fullName"
                                                value={
                                                    passenger.fullName
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        index,
                                                        e
                                                    )
                                                }
                                                className="w-full border border-gray-300 p-2 rounded-sm outline-none focus:border-blue-600"
                                            />

                                        </div>

                                        {/* Age */}

                                        <div className="mb-5">

                                            <label className="block text-sm font-medium mb-2">

                                                Age

                                            </label>

                                            <input
                                                type="number"
                                                name="age"
                                                min="1"
                                                value={
                                                    passenger.age
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        index,
                                                        e
                                                    )
                                                }
                                                className="w-full border border-gray-300 p-2 rounded-sm outline-none focus:border-blue-600"
                                            />

                                        </div>

                                        {/* Gender */}

                                        <div>

                                            <label className="block text-sm font-medium mb-2">

                                                Gender

                                            </label>

                                            <select
                                                name="gender"
                                                value={
                                                    passenger.gender
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        index,
                                                        e
                                                    )
                                                }
                                                className="w-full border border-gray-300 p-2 rounded-sm"
                                            >

                                                <option value="Male">
                                                    Male
                                                </option>

                                                <option value="Female">
                                                    Female
                                                </option>

                                                <option value="Other">
                                                    Other
                                                </option>

                                            </select>

                                        </div>

                                    </div>

                                )
                            )

                        }

                    </div>

                    {/* Flight Summary */}

                    <div className="border border-gray-300 bg-gray-50 rounded-sm p-5 h-fit">

                        <h2 className="text-lg font-bold border-b pb-2 mb-4">

                            Flight Summary

                        </h2>

                        <div className="space-y-4">

                            <div>

                                <p className="text-gray-500 text-sm">
                                    Flight Number
                                </p>

                                <p className="font-semibold">
                                    {flight.flightNumber}
                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500 text-sm">
                                    Route
                                </p>

                                <p className="font-semibold">
                                    {flight.source}
                                    {" → "}
                                    {flight.destination}
                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500 text-sm">
                                    Departure
                                </p>

                                <p className="font-semibold">
                                    {new Date(
                                        flight.departureTime
                                    ).toLocaleString()}
                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500 text-sm">
                                    Arrival
                                </p>

                                <p className="font-semibold">
                                    {new Date(
                                        flight.arrivalTime
                                    ).toLocaleString()}
                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500 text-sm">
                                    Passengers
                                </p>

                                <p className="font-semibold">
                                    {passengerCount}
                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500 text-sm">
                                    Available Seats
                                </p>

                                <p className="font-semibold">
                                    {flight.availableSeats}
                                </p>

                            </div>

                            <hr />

                            <div>

                                <p className="text-gray-500 text-sm">
                                    Fare / Passenger
                                </p>

                                <p className="font-semibold">
                                    ₹ {flight.baseFare}
                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500 text-sm">
                                    Total Fare
                                </p>

                                <p className="text-2xl font-bold text-green-700">

                                    ₹{" "}
                                    {
                                        flight.baseFare *
                                        passengerCount
                                    }

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="border-t border-gray-300 bg-gray-100 px-6 py-4">

                    {error && (

                        <p className="text-red-600 mb-4 text-sm">

                            {error}

                        </p>

                    )}

                    <div className="flex justify-end">

                        <button
                            onClick={handleBooking}
                            disabled={bookingLoading}
                            className="border border-gray-400 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-4 py-1.5 rounded-sm transition-colors cursor-pointer active:bg-gray-300 disabled:opacity-50"
                        >

                            {

                                bookingLoading

                                    ? "Creating Booking..."

                                    : "Confirm Booking"

                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Booking;