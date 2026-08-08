import React, { useEffect, useState } from "react";
import flightService from "../../services/flight.service";

const RouteTable = () => {

    const [popularRoutes, setPopularRoutes] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchRoutes = async () => {

            try {

                const data =
                    await flightService.getFrequentRoutes();

                setPopularRoutes(data);

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        };

        fetchRoutes();

    }, []);

    const getStatusBadge = (flight) => {

        if (flight.status === "Delayed") {

            return (
                <span className="px-1 text-[10px] bg-red-100 text-red-800">
                    DELAYED
                </span>
            );

        }

        if (flight.availableSeats < 10) {

            return (
                <span className="px-1 text-[10px] bg-yellow-100 text-yellow-800">
                    FAST FILLING
                </span>
            );

        }

        return (
            <span className="px-1 text-[10px] bg-green-100 text-green-800">
                AVAILABLE
            </span>
        );

    };

    return (

        <div className="border border-gray-300 bg-white">

            <div className="bg-gray-100 border-b border-gray-300 p-2">

                <span className="font-mono text-xs font-bold text-gray-600 uppercase">

                    :: Frequent Routes & Fares

                </span>

            </div>

            <table className="w-full text-left text-xs">

                <thead>

                    <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-mono">

                        <th className="p-2 border-r border-gray-200">

                            Flight #

                        </th>

                        <th className="p-2 border-r border-gray-200">

                            Route

                        </th>

                        <th className="p-2 border-r border-gray-200">

                            Status

                        </th>

                        <th className="p-2">

                            Base Fare

                        </th>

                    </tr>

                </thead>

                <tbody className="divide-y divide-gray-200 font-mono">

                    {

                        loading ?

                            (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="p-4 text-center"
                                    >

                                        Loading...

                                    </td>

                                </tr>

                            )

                            :

                            popularRoutes.map((flight) => (

                                <tr
                                    key={flight._id}
                                    className="hover:bg-yellow-50/50"
                                >

                                    <td className="p-2 border-r border-gray-200 text-blue-600 font-bold">

                                        {flight.flightNumber}

                                    </td>

                                    <td className="p-2 border-r border-gray-200 font-sans">

                                        {flight.source} 

                                        {" → "}

                                        {flight.destination} 

                                    </td>

                                    <td className="p-2 border-r border-gray-200">

                                        {getStatusBadge(flight)}

                                    </td>

                                    <td className="p-2 text-gray-700">

                                        ₹ {flight.baseFare}

                                    </td>

                                </tr>

                            ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default RouteTable;