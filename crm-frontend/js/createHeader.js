export const createClientsHeader = () => {
    const $header = document.createElement('header'),
          $container = document.createElement('div'),
          $inner = document.createElement('div'),
          $wrapper = document.createElement('div'),
          $logo = document.createElement('a'),
          $logoImg = document.createElement('img'),
          $form = document.createElement('form'),
          $input = document.createElement('input'),
          $searchList = document.createElement('ul');

    $header.classList.add('header');
    $container.classList.add('container', 'header__container');
    $inner.classList.add('header__inner');
    $wrapper.classList.add('header__wrapper');
    $logo.classList.add('header__logo');
    $logoImg.classList.add('header__logo-img');
    $logoImg.src = 'img/svg/skb-logo.svg';
    $logoImg.alt = 'Логотип компании Skillbus';
    $form.classList.add('header__form');
    $input.classList.add('header__input');
    $searchList.classList.add('search-list', 'hide');
    $input.placeholder = 'Введите запрос';

    $inner.append($input, $searchList)
    $logo.append($logoImg);
    $form.append($inner);
    $container.append($logo, $form);
    $header.append($container);

    return $header;
}

