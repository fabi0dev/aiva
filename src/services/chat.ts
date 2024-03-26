import { Messages } from "@/store/reducers/chats";
import { store } from "@/store/store";
import axios from "axios";

export const chatCompletions = async (messages: Messages[] | undefined) => {
  const {
    apiKeyOpenAI: { key },
  } = store.getState();

  const api = axios.create({
    baseURL: "https://api.openai.com/v1/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
  });

  const contentMessages = messages?.filter((message) => message.send != false);
  const { data } = await api.post("chat/completions", {
    model: "gpt-3.5-turbo",
    messages: contentMessages?.map((message) => {
      return {
        content: message.content,
        role: message.role,
      };
    }),
  });

  return data;
};

export const intructionsChatOpenAi = `Instruções:
Seu nome é Aiva, minha assistente pessoal, pode me chamar de chefe, não use emotes;
Seja as vezes engraçada, mas dê um toque de amizade e seja objetiva ao falar;
Se eu pedir algum comando que você não sabe recomende usar o comando da página inicial.`;

export const chatInitial = [
  {
    role: "user",
    content: intructionsChatOpenAi,
    hidden: true,
  },
] as Messages[];
