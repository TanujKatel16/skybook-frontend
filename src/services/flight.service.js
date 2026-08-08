import api from "./api";

const searchFlights = async (searchData) => {

    const response = await api.get(
        "/flights/search",
        {
            params: searchData
        }
    );

    return response.data.data;
};

const getAllFlights = async () => {

    const response = await api.get(
        "/flights"
    );

    return response.data.data;
};

const getFlightById = async (id) => {

    const response = await api.get(
        `/flights/${id}`
    );

    return response.data.data;
};

const getFrequentRoutes = async () => {

    const response =
        await api.get("/flights/frequent-routes");

    return response.data.data;

};

const flightService = {

    searchFlights,
    getAllFlights,
    getFlightById,
    getFrequentRoutes

};

export default flightService;