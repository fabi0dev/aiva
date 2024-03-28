import axios from "axios";

export const server = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    key: `aiva-server`,
  },
});

export const GetNotices = async () => {
  try {
    const { data } = await server.get("notices");
    return data;
  } catch (e) {
    console.log("error in GetNotices", e);
  }
};

export const GetLocation = async () => {
  try {
    const { data } = await server.get(`location`);
    return data;
  } catch (e) {
    console.log("error in GetLocation", e);
  }
};
