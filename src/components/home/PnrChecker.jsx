import React, { useState } from "react";
import bookingService from "../../services/booking.service";

const PnrChecker = () => {

  const [pnr, setPnr] = useState("");

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!pnr.trim()) return;

    try {

      setLoading(true);

      setError("");

      setBooking(null);

      const data =
        await bookingService.getBookingByPNR(
          pnr.toUpperCase()
        );

      setBooking(data);

    }

    catch (error) {

      console.log(error);

      setBooking(null);

      setError(

        error.response?.data?.message ||

        "Booking not found."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="border border-gray-300 bg-white p-4">

      <h3 className="font-mono text-xs font-bold text-gray-600 uppercase border-b border-gray-200 pb-2 mb-3">

        :: Check PNR Status

      </h3>

      <p className="text-xs text-gray-500 mb-3">

        Enter your booking reference to check current booking status.

      </p>

      <form onSubmit={handleSubmit}>

        <input

          type="text"

          value={pnr}

          onChange={(e) => {

            const value = e.target.value.toUpperCase();
            setPnr(value);
            setBooking(null);
            setError("");

          }}

          placeholder="e.g. SB7A9X2P"

          className="w-full p-1.5 border border-gray-300 text-xs font-mono uppercase mb-2 focus:outline-none focus:border-blue-600"

        />

        <button

          type="submit"

          disabled={loading}

          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-mono text-xs py-1.5 transition-colors"

        >

          {

            loading

              ?

              "CHECKING..."

              :

              "CHECK STATUS"

          }

        </button>

      </form>

      {

        error && (

          <div className="mt-4 p-2 border border-red-300 bg-red-50 text-red-700 text-xs">

            {error}

          </div>

        )

      }

      {

        booking && (

          <div className="mt-4 border-t border-gray-300 pt-3 text-xs space-y-2">

            <div>

              <span className="font-semibold">

                PNR:

              </span>

              {" "}

              {booking.pnr}

            </div>

            <div>

              <span className="font-semibold">

                Passenger:

              </span>

              {" "}

              {booking.passenger.fullName}

            </div>

            <div>

              <span className="font-semibold">

                Flight:

              </span>

              {" "}

              {booking.flight.flightNumber}

            </div>

            <div>

              <span className="font-semibold">

                Route:

              </span>

              {" "}

              {booking.flight.source}

              {" → "}

              {booking.flight.destination}

            </div>

            <div>

              <span className="font-semibold">

                Status:

              </span>

              {" "}

              <span
                className={`font-bold ${booking.bookingStatus === "Confirmed"
                    ? "text-green-700"
                    : booking.bookingStatus === "Pending"
                      ? "text-orange-600"
                      : "text-red-700"
                  }`}
              >

                {booking.bookingStatus}

              </span>

            </div>

          </div>

        )

      }

    </div>

  );

};

export default PnrChecker;