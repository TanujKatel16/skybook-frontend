import api from "./api";

const createBooking = async (bookingData) => {

    const response = await api.post(
        "/bookings",
        bookingData
    );

    return response.data.data;

};

const getBookingById = async (id) => {

    const response = await api.get(`/bookings/${id}`);

    return response.data.data;

};

const getMyBookings = async () => {

    const response = await api.get("/bookings/my-bookings");

    return response.data.data;

};

const cancelBooking = async (id) => {

    const response = await api.patch(`/bookings/${id}/cancel`);

    return response.data.data;

};

const getBookingByPNR = async (pnr) => {

    const response =
        await api.get(`/bookings/pnr/${pnr}`);

    return response.data.data;

};

export default {

    createBooking,
    getBookingById,
    getMyBookings,
    cancelBooking,
    getBookingByPNR

};