import { contactDelSvg } from "./svg.js";

export const createContactItem = () => {
    const $contact = document.createElement('div'),
          $contactType = document.createElement('div'),
          $contactName = document.createElement('button'),
          $contactList = document.createElement('ul'),
          $contactPhone = document.createElement('li'),
          $contactEmail = document.createElement('li'),
          $contactVk = document.createElement('li'),
          $contactFb = document.createElement('li'),
          $contactOther = document.createElement('li'),
          $contactInput = document.createElement('input'),
          $contactDel = document.createElement('button'),
          $contactDelTooltip = document.createElement('span');

    $contact.classList.add('contact');
    $contactType.classList.add('contact__type');
    $contactName.classList.add('contact__name');
    $contactList.classList.add('list-reset', 'contact__list');
    $contactPhone.classList.add('contact__item');
    $contactEmail.classList.add('contact__item');
    $contactVk.classList.add('contact__item');
    $contactFb.classList.add('contact__item');
    $contactOther.classList.add('contact__item');
    $contactInput.classList.add('contact__input');
    $contactDel.classList.add('btn-reset', 'contact__del');
    $contactDelTooltip.classList.add('contact-tooltip', 'app-tooltip');

    $contactName.textContent = 'Телефон';
    $contactPhone.textContent = 'Телефон';
    $contactEmail.textContent = 'Email';
    $contactVk.textContent = 'VK';
    $contactFb.textContent = 'Facebook';
    $contactOther.textContent = 'Другое';
    $contactDelTooltip.textContent = 'Удалить контакт';
    $contactInput.placeholder = 'Введите данные контакта';
    $contactInput.type = 'text';
    $contactDel.innerHTML = contactDelSvg;

    $contactDel.addEventListener('click', (e) => {
        e.preventDefault();

        $contact.remove();

        document.querySelector('.modal__add-btn').classList.add('modal__add-btn--active');
    });

    $contactName.addEventListener('click', (e) => {
        e.preventDefault();

        $contactList.classList.toggle('contact__list--active');
        $contactName.classList.toggle('contact__list--active');
    });

    $contactType.addEventListener('mouseleave', () => {
        $contactList.classList.remove('contact__list--active');
        $contactName.classList.remove('contact__list--active');
    });

    const setType = (type) => {
        type.addEventListener('click', () => {
            $contactName.textContent = type.textContent;

            $contactList.classList.remove('contact__list--active');
            $contactName.classList.remove('contact__list--active');
        });
    };

    const arrayTypes = [$contactPhone, $contactEmail, $contactVk, $contactFb, $contactOther];

    for (const type of arrayTypes) {
        setType(type);
    }

    $contactDel.append($contactDelTooltip);
    $contactList.append($contactPhone, $contactEmail, $contactVk, $contactFb, $contactOther);
    $contactType.append($contactName, $contactList);
    $contact.append($contactType, $contactInput, $contactDel);

    return {
        $contact,
        $contactName,
        $contactInput,
        $contactDel
    };
}