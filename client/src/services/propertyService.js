import axios from "axios";

const API = "http://localhost:8000/api/properties";

export const getProperties = async () => {
  const res = await axios.get(API);

  return res.data;
};

export const getPropertyById = async (id) => {
  const res = await axios.get(
    `${API}/${id}`
  );

  return res.data;
};