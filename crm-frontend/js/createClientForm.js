import { createContactItem } from "./createContact.js";
import { addContactSvgDef, spinnerSvg } from "./svg.js";

export const createModalForm = () => {
    const $modalTitle = document.createElement('h2'),
          $closeBtn = document.createElement('button'),
          $modalForm = document.createElement('form'),
          $labelName = document.createElement('label'),
          $inputName = document.createElement('input'),
          $labelSurname = document.createElement('label'),
          $inputSurname = document.createElement('input'),
          $labelLastName = document.createElement('label'),
          $inputLastName = document.createElement('input'),
          $requiredName = document.createElement('span'),
          $requiredSurname = document.createElement('span'),
          $addContactBtn = document.createElement('button'),
          $contactBtnSvgDef = document.createElement('span'),
          $contactBtnSvgHover = document.createElement('span'),
          $saveBtn = document.createElement('button'),
          $cancelBtn = document.createElement('button'),
          $contactsBlock = document.createElement('div'),
          $formFloatingName = document.createElement('div'),
          $formFloatingSurname = document.createElement('div'),
          $formFloatingLastName = document.createElement('div'),
          $saveSpinner = document.createElement('span');

    //создание элементов для валидации
    const $errorBlock = document.createElement('p'),
          $unacceptableLetter = document.createElement('span'),
          $writeSurname = document.createElement('span'),
          $writeName = document.createElement('span'),
          $writeLastName = document.createElement('span'),
          $requiredValue = document.createElement('span'),
          $requiredContacts = document.createElement('span');

    $saveSpinner.classList.add('modal__spinner');
    $modalTitle.classList.add('modal__title');
    $closeBtn.classList.add('btn-reset', 'modal__close-btn');
    $modalForm.classList.add('modal__form');
    $labelName.classList.add('modal__label');
    $labelSurname.classList.add('modal__label');
    $labelLastName.classList.add('modal__label');
    $inputName.classList.add('modal__input');
    $inputSurname.classList.add('modal__input');
    $inputLastName.classList.add('modal__input');
    $requiredName.classList.add('modal__label');
    $requiredSurname.classList.add('modal__label');
    $addContactBtn.classList.add('btn-reset', 'modal__add-btn', 'modal__add-btn--active');
    $saveBtn.classList.add('btn-reset', 'modal__save-btn', 'app-btn');
    $cancelBtn.classList.add ('btn-reset', 'modal__cancel-btn');
    $contactBtnSvgDef.classList.add('btn-contact__svg', 'btn-contact__svg--def', 'btn-contact__svg--active');
    $contactBtnSvgHover.classList.add('btn-contact__svg', 'btn-contact__svg--hover');
    $contactsBlock.classList.add('modal__contacts');
    $formFloatingName.classList.add('form-floating');
    $formFloatingSurname.classList.add('form-floating');
    $formFloatingLastName.classList.add('form-floating');
    $errorBlock.classList.add('modal__error');

    $labelSurname.for = 'floatingSurname';
    $labelName.for = 'floatingName';
    $labelLastName.for = 'floatingLastName';
    $inputSurname.id = 'floatingSurname';
    $inputName.id = 'floatingName';
    $inputLastName.id = 'floatingLastName';
    $inputSurname.type = 'text';
    $inputName.type = 'text';
    $inputLastName.type = 'text';
    $inputSurname.placeholder = 'Фамилия';
    $inputName.placeholder = 'Имя';
    $inputLastName.placeholder = 'Отчество';
    $unacceptableLetter.id = 'unacceptableLetter';
    $writeSurname.id ='writeSurname';
    $writeName.id = 'writeName';
    $writeLastName.id = 'writeLastName';
    $requiredValue.id = 'requiredValue';
    $requiredContacts.id = 'requiredContacts';

    $modalTitle.textContent = 'Новый клиент';
    $labelName.textContent = 'Имя';
    $labelSurname.textContent = 'Фамилия';
    $labelLastName.textContent = 'Отчество';
    $addContactBtn.textContent = 'Добавить контакт';
    $saveBtn.textContent = 'Сохранить';
    $cancelBtn.textContent = 'Отмена';
    $requiredName.textContent = '*';
    $requiredSurname.textContent = '*';
    $contactBtnSvgDef.innerHTML = addContactSvgDef;
    $saveSpinner.innerHTML = spinnerSvg;

    $labelName.append($requiredName);
    $saveBtn.append($saveSpinner);
    $labelSurname.append($requiredSurname);
    $formFloatingName.append($inputName, $labelName);
    $formFloatingSurname.append($inputSurname, $labelSurname);
    $formFloatingLastName.append($inputLastName, $labelLastName);
    $contactsBlock.append($addContactBtn);
    $errorBlock.append($writeSurname, $writeName, $writeLastName, $requiredValue, $unacceptableLetter, $requiredContacts);
    $modalForm.append(
        $formFloatingSurname,
        $formFloatingName,
        $formFloatingLastName,
        $contactsBlock,
        $errorBlock,
        $saveBtn,
        $cancelBtn
    );
    
    $addContactBtn.append($contactBtnSvgDef);

    $addContactBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const contactsItems = document.getElementsByClassName('contact');

        if (contactsItems.length < 9) {
            const contactItem = createContactItem();
            $contactsBlock.prepend(contactItem.$contact);
            $contactsBlock.style.backgroundColor = 'var(--block-background)';
            if (contactsItems.length >= 5) {
                document.querySelector('.app-modal__content').style.top = '60%';
            } else {
                document.querySelector('.app-modal__content').style.top = '50%';
            };
        } else {
            const contactItem = createContactItem();
            $contactsBlock.prepend(contactItem.$contact);

            $addContactBtn.classList.remove('modal__add-btn--active');
        }
    });
    
    return {
        $modalForm,
        $closeBtn,
        $modalTitle,
        $inputName,
        $inputSurname,
        $inputLastName,
        $labelName,
        $labelSurname,
        $labelLastName,
        $contactsBlock,
        $addContactBtn,
        $cancelBtn
    };
}