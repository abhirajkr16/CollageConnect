import api from "./api";

export const getAllPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const createPost = async (payload) => {
  const response = await api.post("/posts", payload);
  return response.data;
};

export const toggleLike = async (postId) => {
  const response = await api.put(`/posts/${postId}/like`);
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
};
