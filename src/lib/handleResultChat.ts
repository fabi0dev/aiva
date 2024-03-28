import { isValidJSON } from "./utils";
import { getFirstLink } from "./youtube";

export const handleResultChat = async (content: string) => {
  if (isValidJSON(content)) {
    const action = JSON.parse(content);

    switch (action?.type) {
      case "music":
        return await handleMusic(action.name);
    }

    return content;
  }
  return content;
};

export const handleMusic = async (name: any) => {
  try {
    const link = await getFirstLink(name);

    if (link) {
      const { url } = link;
      window.open(url, "_blank");
      return `Certo, já encontrei e vou tocar ${name}!`;
    }
  } catch (e) {
    return `Não consegui tocar ${name}!`;
  }
};
