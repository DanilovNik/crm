export const validateClientContact = (contactType, contactInput) => {
  const writeValue = document.getElementById("writeName");
  const onlyNumbers = /[^0-9]+$/g;
  const onlyEng = /[^a-zA-Z|@|.]+$/g;

  const onInputValue = (input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = "var(--grey)";
      writeValue.textContent = "";
    });

    input.oncut =
      input.oncopy =
      input.onpaste =
        () => {
          input.style.borderColor = "var(--grey)";
          writeValue.textContent = "";
        };
  };

  const showErrorMessage = (message, block, input) => {
    block.textContent = message;
    input.style.borderColor = "var(--red)";
  };

  onInputValue(contactInput);

  if (!contactInput.value) {
    showErrorMessage("Заполните все поля контактов!", writeValue, contactInput);

    return false;
  }

  switch (contactType.innerHTML) {
    case "Телефон":
      if (onlyNumbers.test(contactInput.value)) {
        showErrorMessage(
          "Недопустимые символы, только цифры!",
          writeValue,
          contactInput
        );
        return false;
      } else if (contactInput.value.length !== 11) {
        showErrorMessage(
          "Номер должен состоять из 11 цифр!",
          writeValue,
          contactInput
        );
        return false;
      }

      return true;

    case "Email":
      if (onlyEng.test(contactInput.value)) {
        showErrorMessage("Некорректный email!", writeValue, contactInput);
        return false;
      }

      return true;

    default:
      return true;
  }
};
