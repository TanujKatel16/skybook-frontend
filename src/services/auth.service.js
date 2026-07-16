import api from "./api";


const register = async (userData) =>{
    const response = await api.post(
        "/users/register",
        userData
    );

    return response.data;
}

const login = async (userData) => {
    const response = await api.post(
        "/users/login",
        userData
    );
    return response.data;
};


const getCurrentUser = async () => {
    const response = await api.get(
        "/users/current-user"
    );
    return response.data.data;
};

const logout= async() =>{
    await api.post(
        "/users/logout"
    );
}

const authService = {

    login,
    getCurrentUser,
    logout,
    register

};

export default authService;