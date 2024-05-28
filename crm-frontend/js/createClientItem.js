import { deleteClientModal } from "./createDeleteModal.js";
import { createEditClient } from "./editClient.js";
import { spinnerSvg } from "./svg.js";
import { createItemByType, formatDate, formatTime } from "./utils.js";

export const createClientItem = (data) => {
  const $clientTr = document.createElement("tr"),
    $clientId = document.createElement("span"),
    $clientIdTd = document.createElement('td'),
    $clientFullName = document.createElement("td"),
    $clientSurname = document.createElement("span"),
    $clientName = document.createElement("span"),
    $clientLastName = document.createElement("span"),
    $clientCreation = document.createElement("td"),
    $creationDate = document.createElement("span"),
    $creationTime = document.createElement("span"),
    $clientLastUpdate = document.createElement("td"),
    $lastUpdateDate = document.createElement("span"),
    $lastUpdateTime = document.createElement("span"),
    $clientContacts = document.createElement("td"),
    $clientActions = document.createElement("td"),
    $clientEdit = document.createElement("button"),
    $clientDelete = document.createElement("button"),
    $editSpinner = document.createElement("span"),
    $deleteSpinner = document.createElement("span");

  $clientTr.classList.add("client__item");
  $clientIdTd.classList.add("client__id");
  $clientFullName.classList.add("client__full-name");
  $clientCreation.classList.add("client__creation");
  $creationDate.classList.add("creation__date");
  $creationTime.classList.add("creation__time");
  $clientLastUpdate.classList.add("client__last-update");
  $lastUpdateDate.classList.add("last-update__date");
  $lastUpdateTime.classList.add("last-update__time");
  $clientContacts.classList.add("client__contacts");
  $clientActions.classList.add("client__actions");
  $clientEdit.classList.add("btn-reset", "clients__edit-btn");
  $clientDelete.classList.add("btn-reset", "clients__delete-btn");
  $editSpinner.classList.add("actions__spinner");
  $deleteSpinner.classList.add("actions__spinner");

  $clientTr.setAttribute("id", data.id);
  $clientId.textContent = data.id.substr(7, 13);
  $clientSurname.textContent = data.surname;
  $clientName.textContent = data.name;
  $clientLastName.textContent = data.lastName;
  $creationDate.textContent = formatDate(data.createdAt);
  $creationTime.textContent = formatTime(data.createdAt);
  $lastUpdateDate.textContent = formatDate(data.updatedAt);
  $lastUpdateTime.textContent = formatTime(data.updatedAt);
  $clientEdit.textContent = "Изменить";
  $clientDelete.textContent = "Удалить";
  $editSpinner.innerHTML = spinnerSvg;
  $deleteSpinner.innerHTML = spinnerSvg;

  for (const contact of data.contacts) {
    createItemByType(contact.type, contact.value, $clientContacts);
  }

  // delete modal window actions
  const deleteClient = deleteClientModal();
  const editClient = createEditClient(data);

  const deleteById = () => {
    import("./clientsAPI.js").then(({ deleteClientItem }) => {
      deleteClient.$deleteModalDelete.addEventListener("click", () => {
        try {
          deleteClient.$deleteSpinner.style.display = "block";
          setTimeout(() => {
            deleteClientItem(data.id);
            document.getElementById(data.id).remove();
            deleteClient.$deleteModal.remove();
          }, 1500);
        } catch (error) {
          console.log(error);
        } finally {
          setTimeout(() => {
            deleteClient.$deleteSpinner.style.display = "none";
          }, 1500);
        }
      });
    });
  };

  // обработчики на кнопки
  $clientEdit.addEventListener("click", () => {
    $editSpinner.style.display = "block";
    $clientEdit.classList.add("action-delay");
    setTimeout(() => {
      document.body.append(editClient.$editModal);

      $editSpinner.style.display = "none";
      $clientEdit.classList.remove("action-delay");
    }, 1500);
  });

  $clientDelete.addEventListener("click", () => {
    $deleteSpinner.style.display = "block";
    $clientDelete.classList.add("action-delay");
    setTimeout(() => {
      deleteById();
      document.body.append(deleteClient.$deleteModal);

      $deleteSpinner.style.display = "none";
      $clientDelete.classList.remove("action-delay");
    }, 1500);
  });

  $clientIdTd.append($clientId)
  $clientFullName.append($clientSurname, $clientName, $clientLastName);
  $clientCreation.append($creationDate, $creationTime);
  $clientLastUpdate.append($lastUpdateDate, $lastUpdateTime);
  $clientEdit.append($editSpinner);
  $clientDelete.append($deleteSpinner);
  $clientActions.append($clientEdit, $clientDelete);
  $clientTr.append(
    $clientIdTd,
    $clientFullName,
    $clientCreation,
    $clientLastUpdate,
    $clientContacts,
    $clientActions
  );

  return $clientTr;
};
