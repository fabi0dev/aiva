import { server } from "./server";

export const InteractIA = async (content: string) => {
  const formData = new FormData();
  formData.append("content", content);

  try {
    const { data } = await server.post(`interact`, formData);
    return data;
  } catch (e) {
    console.log("error in GetFiles", e);
  }
};
