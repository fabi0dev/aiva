interface News {
  title: string;
  link: string;
  image?: string;
  summary?: string;
}

export async function fetchG1Local() {
  try {
    const response = await fetch("https://g1.globo.com/to/tocantins/");
    const html = await response.text();

    const parser = new DOMParser();
    const dom = parser.parseFromString(html, "text/html");

    const news = [];

    const elements = dom.querySelectorAll("div.feed-post-body");

    elements.forEach((element) => {
      const titleElement = element.querySelector("a.feed-post-link");
      const title = titleElement?.textContent?.trim() || "";
      const link = titleElement?.getAttribute("href") || "";
      const imageElement = element.querySelector("img");
      const image = imageElement?.getAttribute("src") || "";
      const summaryElement = element.querySelector("div.feed-post-body-resumo");
      const summary = summaryElement?.textContent?.trim() || "";
      if (title && link && image && summary) {
        news.push({ title, link, image, summary });
      }
    });
  } catch (error) {
    console.error("An error occurred while fetching G1 Tocantins news:", error);
    return [];
  }
}
