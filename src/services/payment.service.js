import api from "./api";

const makePayment = async (paymentData) => {

    const response = await api.post(
        "/payments",
        paymentData
    );

    return response.data.data;

};

const getPaymentById = async (id) => {

    const response = await api.get(
        `/payments/${id}`
    );

    return response.data.data;

};

const getPaymentByBookingId = async (bookingId) => {

    const response = await api.get(
        `/payments/booking/${bookingId}`
    );

    return response.data.data;

};

export default {

    makePayment,

    getPaymentById,

    getPaymentByBookingId

};