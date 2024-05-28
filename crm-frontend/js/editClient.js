import { sendClientData } from "./clientsAPI.js";
import { createModalForm } from "./createClientForm.js";
import { createContactItem } from "./createContact.js";
import { deleteClientModal } from "./createDeleteModal.js";
import { createApp } from "./index.js";
import { validateClientContact } from "./validateContact.js";
import { validateClientForm } from "./validateForm.js";

export const createEditClient = (data) => {
  const createForm = createModalForm();

  const $editModal = document.createElement("div"),
    $editModalContent = document.createElement("div"),
    $titleId = document.createElement("span");

  $editModal.classList.add("modal-edit", "app-modal", "modal-active");
  $editModalContent.classList.add(
    "edit-modal__content",
    "app-modal__content",
    "modal-active"
  );
  $titleId.classList.add("modal__id");

  $titleId.textContent = `ID: ${data.id.substr(7, 13)}`;
  createForm.$modalTitle.textContent = "Изменить данные";
  createForm.$cancelBtn.textContent = "Удалить клиента";

  createForm.$inputSurname.value = data.surname;
  createForm.$inputName.value = data.name;
  createForm.$inputLastName.value = data.lastName;

  for (const contact of data.contacts) {
    const createContact = createContactItem();

    createContact.$contactName.textContent = contact.type;
    createContact.$contactInput.value = contact.value;

    createForm.$contactsBlock.prepend(createContact.$contact);
    createForm.$contactsBlock.style.backgroundColor = "var(--block-background)";
  }

  if (data.contacts.length == 10) {
    createForm.$addContactBtn.classList.remove("modal__add-btn--active");
  }

  createForm.$cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const deleteModal = deleteClientModal();
    document.body.append(deleteModal.$deleteModal);

    import("./clientsAPI.js").then(({ deleteClientItem }) => {
      deleteModal.$deleteModalDelete.addEventListener("click", () => {
        try {
          deleteModal.$deleteSpinner.style.display = "block";
          setTimeout(() => {
            deleteClientItem(data.id);
            document.getElementById(data.id).remove();
            deleteModal.$deleteModal.remove();
            $editModal.remove();
          }, 1500);
        } catch (error) {
          console.log(error);
        } finally {
          setTimeout(() => {
            deleteModal.$deleteSpinner.style.display = "none";
          }, 1500);
        }
      });
    });
  });

  createForm.$closeBtn.addEventListener("click", () => {
    $editModal.remove();
  });

  document.addEventListener("click", (e) => {
    if (e.target == $editModal) {
      $editModal.remove();
    }
  });

  createForm.$modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateClientForm()) {
      return;
    }

    const contactTypes = document.querySelectorAll(".contact__name");
    const contactValues = document.querySelectorAll(".contact__input");
    let contacts = [];
    let client = {};

    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactValues[i])) {
        return;
      }
      contacts.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value,
      });
    }

    client.surname = createForm.$inputSurname.value;
    client.name = createForm.$inputName.value;
    client.lastName = createForm.$inputLastName.value;
    client.contacts = contacts;

    const spinner = document.querySelector(".modal__spinner");

    try {
      spinner.style.display = "block";
      await sendClientData(client, "PATCH", data.id);

      setTimeout(() => {
        $editModal.remove(); // убрать модальное окно
        createApp(); // отрисовать заново
      }, 1500);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        spinner.style.display = "none";
      }, 1500);
    }
    // window.location.reload(); // обновить страницу
  });

  createForm.$modalTitle.append($titleId);
  $editModalContent.append(
    createForm.$closeBtn,
    createForm.$modalTitle,
    createForm.$modalForm
  );
  $editModal.append($editModalContent);

  return {
    $editModal,
    $editModalContent,
  };
};
