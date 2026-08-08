import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import bookingService from "../services/booking.service";
import paymentService from "../services/payment.service";

const Payment = () => {

    const { bookingId } = useParams();

    console.log("Booking ID:", bookingId);

    const navigate = useNavigate();

    const location = useLocation();

    const bookingFromState = location.state?.booking || null;

    const [booking, setBooking] = useState(bookingFromState);

    const [loading, setLoading] = useState(!bookingFromState);

    const [paymentLoading, setPaymentLoading] = useState(false);

    const [error, setError] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("UPI");

    useEffect(() => {

        if (bookingFromState) return;

        const fetchBooking = async () => {

            try {

                const data =
                    await bookingService.getBookingById(bookingId);

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

    }, [bookingId, bookingFromState]);

    const handlePayment = async () => {

        try {

            setPaymentLoading(true);

            setError("");

            const payment =
                await paymentService.makePayment({

                    bookingId,

                    paymentMethod

                });

            navigate(`/payments/success/${payment._id}`, {

                state: {

                    payment,

                    booking

                }

            });

        }

        catch (error) {

            console.log(error);

            setError(

                error.response?.data?.message ||

                "Payment failed."

            );

        }

        finally {

            setPaymentLoading(false);

        }

    };

    if (loading) {

        return (

            <div>

                <Navbar />

                <div className="max-w-4xl mx-auto mt-8 border border-gray-300 bg-white p-8">

                    Loading...

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

    return (

        <div>

            <Navbar />

            <div className="max-w-4xl mx-auto mt-8 border border-gray-300 bg-white rounded-sm overflow-hidden">

                <div className="bg-gray-100 border-b border-gray-300 px-6 py-4">

                    <h1 className="text-xl font-bold">

                        Payment

                    </h1>

                </div>

                <div className="p-6">

                    <div className="grid grid-cols-2 gap-8">

                        {/* Booking Summary */}

                        <div>

                            <h2 className="font-bold mb-4">

                                Booking Summary

                            </h2>

                            <div className="space-y-3">

                                <p>

                                    <strong>Passenger:</strong>

                                    {" "}

                                    {booking.passenger.fullName}

                                </p>

                                <p>

                                    <strong>Flight:</strong>

                                    {" "}

                                    {booking.flight.flightNumber}

                                </p>

                                <p>

                                    <strong>Route:</strong>

                                    {" "}

                                    {booking.flight.source}

                                    {" → "}

                                    {booking.flight.destination}

                                </p>

                                <p>

                                    <strong>Status:</strong>

                                    {" "}

                                    {booking.bookingStatus}

                                </p>

                                <hr />

                                <p className="text-xl font-bold text-green-700">

                                    ₹ {booking.totalFare}

                                </p>

                            </div>

                        </div>

                        {/* Payment Method */}

                        <div>

                            <h2 className="font-bold mb-4">

                                Payment Method

                            </h2>

                            <div className="space-y-3">

                                {["UPI", "Credit Card", "Debit Card", "Net Banking"].map((method) => (

                                    <label
                                        key={method}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >

                                        <input

                                            type="radio"

                                            value={method}

                                            checked={paymentMethod === method}

                                            onChange={(e) =>

                                                setPaymentMethod(e.target.value)

                                            }

                                        />

                                        {method}

                                    </label>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

                <div className="bg-gray-100 border-t border-gray-300 px-6 py-4">

                    {error && (

                        <p className="text-red-600 mb-3">

                            {error}

                        </p>

                    )}

                    <div className="flex justify-end">

                        <button

                            onClick={handlePayment}

                            disabled={paymentLoading}

                            className="bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white px-8 py-2 rounded-sm"

                        >

                            {

                                paymentLoading

                                    ? "Processing..."

                                    : `Pay ₹${booking.totalFare}`

                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Payment;