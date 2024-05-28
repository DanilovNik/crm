import { addClientModal } from "./addClient.js";
import { createModalForm } from "./createClientForm.js";
import { createPreloader } from "./preloader.js";
import { addClientSvg } from "./svg.js";

export const createClientsSection = () => {
  if (document.body.contains(document.querySelector(".main"))) {
    document.querySelector(".main").remove();
  }

  const $main = document.createElement("main"),
    $section = document.createElement("section"),
    $container = document.createElement("div"),
    $h1 = document.createElement("h1"),
    $tableWrapper = document.createElement("div"),
    $table = document.createElement("table"),
    $tbody = document.createElement("tbody"),
    $thead = document.createElement("thead"),
    $theadTr = document.createElement("tr"),
    $theadId = document.createElement("th"),
    $theadName = document.createElement("th"),
    $theadCreation = document.createElement("th"),
    $theadEdit = document.createElement("th"),
    $theadContacts = document.createElement("th"),
    $theadActions = document.createElement("th"),
    $theadSpan = document.createElement("span"),
    $creationSpan = document.createElement("span"),
    $editSpan = document.createElement("span"),
    $addButton = document.createElement("button"),
    $addButtonSvg = document.createElement("span");

  $main.classList.add("main");
  $section.classList.add("clients");
  $container.classList.add("container", "clients__content");
  $h1.classList.add("clients__title");
  $tableWrapper.classList.add("clients__wrapper");
  $table.classList.add("clients__table");
  $tbody.classList.add("clients__tbody");
  $thead.classList.add("clients__thead", "thead-descr");
  $theadTr.classList.add("clients__theadTr");
  $theadId.classList.add(
    "thead-descr__item",
    "thead-descr__item--id",
    "sort-up"
  );
  $theadName.classList.add(
    "thead-descr__item",
    "thead-descr__item--name",
    "sort-down"
  );
  $theadCreation.classList.add(
    "thead-descr__item",
    "thead-descr__item--creation",
    "sort-down"
  );
  $theadEdit.classList.add(
    "thead-descr__item",
    "thead-descr__item--edit",
    "sort-down"
  );
  $theadContacts.classList.add(
    "thead-descr__item",
    "thead-descr__item--contacts"
  );
  $theadActions.classList.add(
    "thead-descr__item",
    "thead-descr__item--actions"
  );
  $theadSpan.classList.add("thead-descr__sorting");
  $creationSpan.classList.add("creation-span");
  $editSpan.classList.add("edit-span");
  $addButton.classList.add("clients__btn", "btn-reset");
  $addButtonSvg.classList.add("clients__btn-svg");

  $theadId.setAttribute("data-type", "id");
  $theadName.setAttribute("data-type", "text");
  $theadCreation.setAttribute("data-type", "create");
  $theadEdit.setAttribute("data-type", "update");

  $h1.textContent = "Клиенты";
  $theadId.textContent = "id";
  $theadName.textContent = "Фамилия Имя Отчество";
  $theadSpan.textContent = "а-я";
  $theadCreation.textContent = "Дата и время ";
  $theadEdit.textContent = "Последние ";
  $theadContacts.textContent = "Контакты";
  $theadActions.textContent = "Действия";
  $addButton.textContent = "Добавить клиента";
  $addButtonSvg.innerHTML = addClientSvg;

  // arrow directions
  const sortTheadItems = [$theadId, $theadName, $theadCreation, $theadEdit];

  for (const item of sortTheadItems) {
    item.addEventListener('click', () => {
        if (item.classList.contains("sort-down")) {
            item.classList.remove("sort-down");
            item.classList.add("sort-up");
          } else {
            item.classList.add("sort-down");
            item.classList.remove("sort-up");
          }
    });
  }

  $theadCreation.addEventListener("click", () => {
    if ($theadCreation.classList.contains("sort-down")) {
      $creationSpan.classList.add("sort-up");
    } else {
      $creationSpan.classList.remove("sort-up");
    }
  });

  $theadEdit.addEventListener("click", () => {
    if ($theadEdit.classList.contains("sort-down")) {
      $editSpan.classList.add("sort-up");
    } else {
      $editSpan.classList.remove("sort-up");
    }
  });

  $addButton.addEventListener("click", () => {
    document.body.append(addClientModal());
  });

  $theadName.append($theadSpan);
  $theadCreation.append($creationSpan);
  $theadEdit.append($editSpan);
  $theadTr.append(
    $theadId,
    $theadName,
    $theadCreation,
    $theadEdit,
    $theadContacts,
    $theadActions
  );
  $thead.append($theadTr);
  $tableWrapper.append($table, createPreloader());
  $table.append($thead, $tbody);
  $addButton.append($addButtonSvg);
  $container.append($h1, $tableWrapper, $addButton);
  $section.append($container);
  $main.append($section);

  return {
    $main,
    $table,
    $tbody,
  };
};
