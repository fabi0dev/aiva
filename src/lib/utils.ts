import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navigate = (route: string) => {
  return (window.location.href = `/#${route}`);
};

export const capitalizeFirstLetter = (string: string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return string;
  }
};

export const getTime = () => {
  const currentDate = new Date();

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const timeInText24Hours = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;

  return timeInText24Hours;
};

export const getFormattedDate = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = currentDate.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getDayOfWeekName = () => {
  const today = new Date().getDay();

  const daysOfWeek = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  return daysOfWeek[today];
};

export const randomHash = (limit = 5): string => {
  let randomWord = "";
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (let i = 0; i < limit; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomWord += characters.charAt(randomIndex);
  }

  return randomWord;
};

export const handleMsg = (content: string) => {
  return content.replace(new RegExp("(<hrs>.*</hrs>).", "gi"), "");
};

export const isValidJSON = (text: string) => {
  try {
    JSON.parse(text);
    return true;
  } catch (error) {
    return false;
  }
};
