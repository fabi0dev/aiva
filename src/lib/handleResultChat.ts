import { PlayMusicYoutube } from "@/services/server";
import { isValidJSON } from "./utils";

export const handleResultChat = async (content: string) => {
  if (isValidJSON(content)) {
    const action = JSON.parse(content);

    switch (action?.type) {
      case "music":
        return await handleMusic(action.name, action.openIn == "web");
    }

    return content;
  }
  return content;
};

export const handleMusic = async (name: any, openInWeb = true) => {
  try {
    await PlayMusicYoutube(name, openInWeb);
    return `Certo, vou tocar ${name}`;
  } catch (e) {
    return `Não consegui tocar ${name}`;
  }
};
