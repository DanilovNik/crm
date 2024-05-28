import { findClient } from "./clientsAPI.js";
import { createClientItem } from "./createClientItem.js";

export const searchClients = (clients) => {
  const searchList = document.querySelector(".search-list"),
        tbody = document.querySelector(".clients__tbody"),
        input = document.querySelector(".header__input");

  clients.forEach((client) => {
    const searchItem = document.createElement("li"),
      searchLink = document.createElement("a");

    searchItem.classList.add("search-list__item");
    searchLink.classList.add("search-list__link");

    searchLink.textContent = `${client.surname} ${client.name} ${client.lastName}`;
    searchLink.href = "#";

    searchItem.append(searchLink);
    searchList.append(searchItem);
  });

  const renderTable = async (str) => {
    const response = await findClient(str);

    tbody.innerHTML = '';

    for (const client of response) {
      tbody.append(createClientItem(client));
    }
  };

  input.addEventListener('input', async () => {
    const value = input.value.trim();
    const foundItems = document.querySelectorAll('.search-list__link');

    if (value !== '') {
        renderTable(value);

        foundItems.forEach(link => {
            if (link.innerText.search(value) == -1) {
                link.classList.add('hide');
                link.innerHTML = link.innerText;
            } else {
                link.classList.remove('hide');
                searchList.classList.remove('hide');
                
                const str = link.innerText;

                link.innerHTML = insertMark(str, link.innerText.search(value), value.length);
            } 
        });
    } else {
      foundItems.forEach(link => {
        tbody.innerHTML = '';

        clients.forEach(client => tbody.append(createClientItem(client)));

        link.classList.remove('hide');
        searchList.classList.add('hide');
        link.innerHTML = link.innerText;
      });
    }
  });

  const insertMark = (str, pos, len) => str
  .slice(0, pos) + '<mark>' + str
  .slice(pos, pos + len) + '</mark>' + str
  .slice(pos + len);
};
