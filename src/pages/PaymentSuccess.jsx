import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import paymentService from "../services/payment.service";

const PaymentSuccess = () => {

    const { paymentId } = useParams();

    const navigate = useNavigate();

    const location = useLocation();

    const paymentFromState = location.state?.payment || null;

    const bookingFromState = location.state?.booking || null;

    const [payment, setPayment] = useState(paymentFromState);

    const [booking, setBooking] = useState(bookingFromState);

    const [loading, setLoading] = useState(!paymentFromState);

    const [error, setError] = useState("");

    useEffect(() => {

        if (paymentFromState) {

            setLoading(false);

            return;

        }

        const fetchPayment = async () => {

            try {

                const data =
                    await paymentService.getPaymentById(paymentId);

                setPayment(data);

                setBooking(data.booking);

            }

            catch (error) {

                console.log(error);

                setError(

                    error.response?.data?.message ||

                    "Unable to fetch payment."

                );

            }

            finally {

                setLoading(false);

            }

        };

        fetchPayment();

    }, [paymentId, paymentFromState]);

    if (loading) {

        return (

            <div>

                <Navbar />

                <div className="max-w-4xl mx-auto mt-8 bg-white border border-gray-300 p-8">

                    Loading Payment...

                </div>

            </div>

        );

    }

    if (error) {

        return (

            <div>

                <Navbar />

                <div className="max-w-4xl mx-auto mt-8 bg-white border border-red-300 p-8 text-red-700">

                    {error}

                </div>

            </div>

        );

    }

    if (!payment || !booking) {

        return (

            <div>

                <Navbar />

                <div className="max-w-4xl mx-auto mt-8 bg-white border border-red-300 p-8">

                    Payment not found.

                </div>

            </div>

        );

    }

    return (

        <div>

            <Navbar />

            <div className="max-w-4xl mx-auto mt-8 bg-white border border-gray-300 rounded-sm overflow-hidden">

                <div className="bg-green-700 text-white text-center py-6">

                    <h1 className="text-3xl font-bold">

                        ✅ Payment Successful

                    </h1>

                    <p className="mt-2">

                        Thank you for choosing SkyBook.

                    </p>

                </div>

                <div className="p-8">

                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">

                        <div>

                            <p className="text-xs text-gray-500">

                                Transaction ID

                            </p>

                            <p className="font-semibold">

                                {payment.transactionId}

                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">

                                Payment Status

                            </p>

                            <p className="font-semibold text-green-700">

                                {payment.paymentStatus}

                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">

                                Payment Method

                            </p>

                            <p>

                                {payment.paymentMethod}

                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">

                                Booking Status

                            </p>

                            <p className="font-semibold text-green-700">

                                {booking.bookingStatus}

                            </p>

                        </div>

                        <div className="col-span-2">

                            <p className="text-xs text-gray-500 mb-3">
                                Passengers
                            </p>

                            <div className="space-y-2">

                                {booking.passengers?.map((passenger, index) => (

                                    <div
                                        key={index}
                                        className="border border-gray-300 bg-gray-50 p-3"
                                    >

                                        <p className="font-semibold">
                                            Passenger {index + 1}
                                        </p>

                                        <p className="text-sm text-gray-600">
                                            {passenger.fullName}
                                            {" | "}
                                            Age: {passenger.age}
                                            {" | "}
                                            {passenger.gender}
                                        </p>

                                    </div>

                                ))}

                            </div>

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

                                Amount Paid

                            </p>

                            <p className="text-xl font-bold text-green-700">

                                ₹ {payment.amount}

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

                    {/* <button

                        onClick={() => navigate("/bookings")}

                        className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-sm"

                    >

                        My Bookings

                    </button> */}

                </div>

            </div>

        </div>

    );

};

export default PaymentSuccess;