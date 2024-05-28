import { sendClientData } from "./clientsAPI.js";
import { createModalForm } from "./createClientForm.js";
import { createApp } from "./index.js";
import { validateClientContact } from "./validateContact.js";
import { validateClientForm } from "./validateForm.js";

export const addClientModal = () => {
  const createForm = createModalForm();

  const $modal = document.createElement("div"),
    $modalContent = document.createElement("div");

  $modal.classList.add("modal", "app-modal", "modal-active");
  $modalContent.classList.add(
    "modal__content",
    "app-modal__content",
    "modal-active"
  );
  createForm.$modalForm.classList.add("add-client");

  $modal.append($modalContent);
  $modalContent.append(
    createForm.$modalTitle,
    createForm.$closeBtn,
    createForm.$modalForm
  );

  createForm.$modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const contactTypes = document.querySelectorAll(".contact__name");
    const contactValues = document.querySelectorAll(".contact__input");
    let contacts = [];
    let clientObj = {};

    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactValues[i])) {
        return;
      }
      contacts.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value,
      });
    }

    clientObj.surname = createForm.$inputSurname.value.trim();
    clientObj.name = createForm.$inputName.value.trim();
    clientObj.lastName = createForm.$inputLastName.value.trim();
    clientObj.contacts = contacts;

    const spinner = document.querySelector(".modal__spinner");

    try {
      spinner.style.display = "block";
      if (validateClientForm()) {
        await sendClientData(clientObj, "POST");
        setTimeout(() => {
          $modal.remove(); // удалить модалку
          createApp(); // запустить ререндер
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        spinner.style.display = "none";
      }, 1500);
    }
  });

  createForm.$closeBtn.addEventListener("click", () => {
    $modal.remove();
  });

  createForm.$cancelBtn.addEventListener("click", () => {
    $modal.remove();
  });

  document.addEventListener("click", (e) => {
    if (e.target == $modal) {
      $modal.remove();
    }
  });

  return $modal;
};
