import got from "got";
import cheerio from "cheerio";

const extractLinks = async (url) => {
  try {
    // Fetching HTML
    const response = await got(url);
    const html = response.body;

    const $ = cheerio.load(html);

    const linkObjects = $("a");

    // Collect the "href" and "name" and "date" of each link and add them to an array
    const links = [];
    linkObjects.each((index, element) => {
      try {
        if ($(element).attr("href").includes("makro-letaky-a-katalogy")) {
          links.push({
            name: $(element).find("strong").text(),
            date: $(element).find("span").last().text(),
            href: $(element).attr("href"),
          });
        }
      } catch (err) {
        console.log(err);
      }
    });

    // console.log(links);
    return links;
  } catch (error) {
    console.log(error.response.body);
  }
};

const URL = "https://www.makro.cz/aktualni-nabidka";
extractLinks(URL);
