import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import bookingService from "../services/booking.service";


const BookingDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const location = useLocation();

    const bookingFromState = location.state?.booking || null;

    const [booking, setBooking] = useState(bookingFromState);

    const [loading, setLoading] = useState(!bookingFromState);

    const [error, setError] = useState("");

    useEffect(() => {

        if (bookingFromState) return;

        const fetchBooking = async () => {

            try {

                const data =
                    await bookingService.getBookingById(id);

                setBooking(data);

            }

            catch (error) {

                console.log(error);

                setError(

                    error.response?.data?.message ||

                    "Unable to fetch booking."

                );

            }

            finally {

                setLoading(false);

            }

        };

        fetchBooking();

    }, [id, bookingFromState]);

    if (loading) {

        return (

            <div>

                <Navbar />

                <div className="max-w-4xl mx-auto mt-8 border border-gray-300 bg-white p-8">

                    <h2 className="text-lg font-bold">

                        Loading Booking...

                    </h2>

                </div>

            </div>

        );

    }

    if (error) {

        return (

            <div>

                <Navbar />

                <div className="max-w-4xl mx-auto mt-8 border border-red-300 bg-white p-8">

                    <h2 className="text-lg font-bold text-red-700">

                        {error}

                    </h2>

                </div>

            </div>

        );

    }

    if (!booking) {

        return (

            <div>

                <Navbar />

                <div className="max-w-4xl mx-auto mt-8 border border-red-300 bg-white p-8">

                    Booking not found.

                </div>

            </div>

        );

    }

    console.log("Booking:", booking);

    return (

        <div>

            <Navbar />

            <div className="max-w-4xl mx-auto mt-8 border border-gray-300 bg-white rounded-sm overflow-hidden">

                <div className="bg-gray-100 border-b border-gray-300 px-6 py-4">

                    <h1 className="text-xl font-bold">

                        Booking Confirmation

                    </h1>

                </div>

                <div className="p-6">

                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">

                        <div>

                            <p className="text-xs text-gray-500">

                                Booking ID

                            </p>

                            <p className="font-semibold">

                                {booking._id}

                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">

                                Booking Status

                            </p>

                            <p
                                className={`font-semibold ${
                                    booking.bookingStatus === "Pending"
                                        ? "text-orange-600"
                                        : booking.bookingStatus === "Confirmed"
                                        ? "text-green-700"
                                        : "text-red-700"
                                }`}
                            >

                                {booking.bookingStatus}

                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">

                                Passenger

                            </p>

                            <p className="font-semibold">

                                {booking.passenger.fullName}

                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">

                                Age

                            </p>

                            <p>

                                {booking.passenger.age}

                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">

                                Gender

                            </p>

                            <p>

                                {booking.passenger.gender}

                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">

                                Flight Number

                            </p>

                            <p>

                                {booking.flight.flightNumber}

                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">

                                Route

                            </p>

                            <p>

                                {booking.flight.source} → {booking.flight.destination}

                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">

                                Total Fare

                            </p>

                            <p className="text-xl font-bold text-green-700">

                                ₹ {booking.totalFare}

                            </p>

                        </div>

                    </div>

                </div>

                <div className="bg-gray-50 border-t border-gray-300 px-6 py-4 flex justify-end gap-3">

                    <button

                        onClick={() => navigate("/")}

                        className="border border-gray-400 bg-white hover:bg-gray-100 px-5 py-2 rounded-sm"

                    >

                        Home

                    </button>

                    <button

                        onClick={() => {

                            navigate(`/payments/${booking._id}`, {

                                state: {

                                    booking

                                }

                            });

                            console.log("Proceed to Payment");

                        }}

                        className="border border-gray-400 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-4 py-1.5 rounded-sm transition-colors cursor-pointer active:bg-gray-300"

                    >

                        Proceed To Payment →

                    </button>

                </div>

            </div>

        </div>

    );

};

export default BookingDetails;