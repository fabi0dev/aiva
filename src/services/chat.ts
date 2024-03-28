import { Messages } from "@/store/reducers/chats";
import { store } from "@/store/store";
import axios, { AxiosInstance } from "axios";

export const intructionsChatOpenAi = `Instruções:
Seu nome é Aiva, minha assistente pessoal, pode me chamar de chefe, não use emotes;
Seja as vezes engraçada, mas dê um toque de amizade e seja objetiva ao falar;
<hrs> Essa tag tem as informações de data e horas atuais;
Se eu te perdir para tocar uma música ou playlist retorne somente um json assim  {"type":"music","name":nomeDaMusica };
Se eu pedir algum comando que você não sabe recomende usar o comando da página inicial;`;

export const chatInitial = [
  {
    role: "user",
    content: intructionsChatOpenAi,
    hidden: true,
  },
  {
    role: "assistant",
    content: "Oi chefe!",
    hidden: true,
  },
] as Messages[];

export const apiOpenAI = () => {
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

  return api as AxiosInstance;
};

export const chatCompletions = async (messages: Messages[] | undefined) => {
  const api = apiOpenAI();
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

export const chatCommand = async (messages: Messages[]) => {
  const api = apiOpenAI();

  const initial = chatInitial.map((item) => {
    return {
      role: item.role,
      content: item.content,
    };
  });
  const { data } = await api.post("chat/completions", {
    model: "gpt-3.5-turbo",
    messages: [...initial, ...messages],
  });

  if (data?.choices != undefined) {
    const { choices } = data;
    return choices[0].message;
  }

  return false;
};

export const audioTranscriptions = async (audio: Blob) => {
  const api = apiOpenAI();

  const formData = new FormData();
  formData.append("file", audio, "audio.wav");
  formData.append("model", "whisper-1");

  const { data } = await api.post("audio/transcriptions", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.text;
};

export const textToAudio = async (text: string) => {
  const api = apiOpenAI();

  const { data } = await api.post(
    "audio/speech",
    {
      model: "tts-1",
      input: text,
      voice: "nova",
      speed: 1.1,
    },
    { responseType: "blob" }
  );

  const blob = new Blob([data], { type: "audio/mp3" });
  const url = URL.createObjectURL(blob);

  const audio = new Audio(url);
  return audio;
};
