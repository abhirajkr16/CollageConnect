import api from "./api";

export const signupUser = async (payload) => {
  const response = await api.post("/auth/signup", payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};
