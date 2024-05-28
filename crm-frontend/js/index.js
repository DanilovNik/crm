import { createClientsHeader } from "./createHeader.js";
import { createClientsSection } from "./createClientsSection.js";
import { getClients } from "./clientsAPI.js";
import { createClientItem } from "./createClientItem.js";
import { sortTable } from "./sortClients.js";
import { searchClients } from "./searchClient.js";

export const createApp = async () => {
  const $header = createClientsHeader();
  const $clientsSection = createClientsSection();
  document.body.append($header, $clientsSection.$main);

  try {
    const clients = await getClients();
    searchClients(clients);

    for (const client of clients) {
      document
        .querySelector(".clients__tbody")
        .append(createClientItem(client));
    }
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      const preloader = document.querySelector('.preloader');
      preloader.remove();
    }, 2000);
  }
};

createApp();
document.addEventListener('DOMContentLoaded', sortTable);
