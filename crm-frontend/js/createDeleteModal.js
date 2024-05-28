import { spinnerSvg } from "./svg.js";

export const deleteClientModal = () => {
    const $deleteModalContent = document.createElement('div'),
          $deleteModal = document.createElement('div'),
          $deleteModalTitle = document.createElement('h2'),
          $modalClose = document.createElement('button'),
          $deleteModalText = document.createElement('p'),
          $deleteModalDelete = document.createElement('button'),
          $deleteModalCancel = document.createElement('button'),
          $deleteSpinner = document.createElement('span');

    $deleteModalContent.classList.add('delete-modal__content', 'app-modal__content', 'modal-active');
    $deleteModal.classList.add('delete-modal', 'app-modal', 'modal-active');
    $deleteModalTitle.classList.add('delete-modal__title', 'modal__title');
    $modalClose.classList.add('btn-reset', 'modal__close-btn');
    $deleteModalText.classList.add('delete-modal__text');
    $deleteModalDelete.classList.add('delete-modal__delete', 'btn-reset', 'app-btn');
    $deleteModalCancel.classList.add('delete-modal__cancel', 'btn-reset');
    $deleteSpinner.classList.add('modal__spinner');

    $deleteModalTitle.textContent = 'Удалить клиента';
    $deleteModalText.textContent = 'Вы действительно хотите удалить данного клиента?';
    $deleteModalDelete.textContent = 'Удалить';
    $deleteModalCancel.textContent = 'Отмена';
    $deleteSpinner.innerHTML = spinnerSvg;

    $deleteModalDelete.append($deleteSpinner);
    $deleteModalContent.append(
        $modalClose,
        $deleteModalTitle,
        $deleteModalText,
        $deleteModalDelete,
        $deleteModalCancel 
    );
    $deleteModal.append($deleteModalContent);

    $modalClose.addEventListener('click', () => $deleteModal.remove());
    $deleteModalCancel.addEventListener('click', () => $deleteModal.remove());

    window.addEventListener('click', (e) => {
        if(e.target === $deleteModal) {
            $deleteModal.remove();
        }
    })

    return {
        $deleteModal,
        $deleteModalContent,
        $deleteModalDelete,
        $deleteSpinner
    }
}