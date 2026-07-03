import API from "../../api/axios";


// ==========================
// Login API
// ==========================

export const login = async (userData) => {
  const response = await API.post(
    "/auth/login",
    userData
  );

  return response.data;
};


// ==========================
// Logout API
// ==========================

export const logout = async () => {
  const response = await API.post(
    "/auth/logout"
  );

  return response.data;
};


// ==========================
// Get Current User
// ==========================

export const getCurrentUser = async () => {
  const response = await API.get(
    "/auth/me"
  );

  return response.data;
};


const authAPI = {
  login,
  logout,
  getCurrentUser,
};

export default authAPI;