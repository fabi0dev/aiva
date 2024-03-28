export const getFirstLink = async (
  q: string
): Promise<
  | {
      url: string;
      title: string;
      description: string;
    }
  | undefined
> => {
  const apiKey = import.meta.env.VITE_API_GOOGLE;

  const apiUrl =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" +
    encodeURIComponent(q) +
    "&key=" +
    apiKey;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.items.length > 0) {
      const {
        id: { videoId },
        snippet: { title, description },
      } = data.items[0];

      return {
        url: `https://www.youtube.com/watch?v=${videoId}`,
        title,
        description,
      };
    } else {
      throw new Error("Nenhum vídeo encontrado para a consulta fornecida.");
    }
  } catch (error) {
    console.error("Erro ao obter resultados da pesquisa:", error);
    return undefined; // Retornar undefined em caso de erro
  }
};
