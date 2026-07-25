import FlightCard from "./FlightCard";

const FlightList = ({ flights }) => {

    return (

        <div className="space-y-4">

            {flights.map((flight) => (

                <FlightCard
                    key={flight._id}
                    flight={flight}
                />

            ))}

        </div>

    );

};

export default FlightList;