export const validateClientForm = () => {
    const userSurname = document.getElementById('floatingSurname'),
          userName = document.getElementById('floatingName'),
          userLastName = document.getElementById('floatingLastName'),
          unacceptableLetter = document.getElementById('unacceptableLetter'),
          writeSurname = document.getElementById('writeSurname'),
          writeName = document.getElementById('writeName'),
          writeLastName = document.getElementById('writeLastName'),
          requiredValue = document.getElementById('requiredValue');

    const validateArray = [unacceptableLetter, writeSurname, writeName, writeLastName, requiredValue];
    const regexp = /[^а-яА-ЯёЁ]+$/g;

    const onInputValue = input => {
        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--grey)';
            for (const item of validateArray) {
                item.textContent = '';
            }
        });

        input.oncut = input.oncopy = input.onpaste = () => {
            input.style.borderColor = 'var(--grey)';
            for (const item of validateArray) {
                item.textContent = '';
            }
        };

        input.onchange = () => {
            input.style.borderColor = 'var(--grey)';

            if (userSurname.value && userName.value && userLastName.value) {
                for (const item of validateArray) {
                    item.textContent = '';
                };
            };
        };
    };

    onInputValue(userSurname);
    onInputValue(userName);

    const checkRequiredName = (input, message, name) => {
        if (!input.value) {
            input.style.borderColor = 'var(--red)';
            message.textContent = `Введите ${name} клиента!`;

            return false;
        } else {
            message.textContent = '';
        }

        return true;
    };

    const checkByRegexp = (input, regexp) => {
        if (regexp.test(input.value)) {
            input.style.borderColor = 'var(--red)';
            unacceptableLetter.textContent = `Недопустимые символы!`;
            return false;
        }

        return true;
    };

    if (!checkRequiredName(userSurname, writeSurname, 'фамилию')) { return false };
    if (!checkRequiredName(userName, writeName, 'имя')) { return false };

    if (!checkByRegexp(userSurname, regexp)) { return false };
    if (!checkByRegexp(userName, regexp)) { return false };
    if (!checkByRegexp(userLastName, regexp)) { return false };

    return true;
}

