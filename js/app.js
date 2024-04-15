const modalMistakes = document.querySelector('.modal-mistakes');
const closeModalButton = document.querySelector('.modal-mistakes__close');
const formMistakes = document.querySelector('.form-mistakes');
const formMessage = document.querySelector('.form-mistakes__textarea');
const formName = document.querySelector('.form-mistakes__name');
const formSubmitButton = document.querySelector('.js-form-send');
const formCancelButton = document.querySelector('.js-form-cancel');
const selectedTextContainer = document.querySelector('.form-mistakes__selected-text');

const MAX_MESSAGE_LENGTH = 5000;
const MAX_NAME_LENGTH = 50;
const MAX_SELECTED_TEXT_LENGTH = 1000;


// Показать модалку с формой
const showModal = (evt) => {

    if (evt.ctrlKey && evt.keyCode === 13) {
        evt.preventDefault();
        let selectedText = window.getSelection().toString().trim();
        let sourceText = document.getElementById('source-text');
        (selectedText.length > 0) ? sourceText.setAttribute('value', selectedText) : null;

        if (modalMistakes.style.display === 'none' && selectedText === '') {
            alert('Выделите нужный текст для отправки формы!');
        } else if (modalMistakes.style.display === 'none') {
            if (selectedText.length > MAX_SELECTED_TEXT_LENGTH) {
                alert('Можно выделить не более 1000 символов!');
            } else {
                modalMistakes.style.display = 'flex';
                formMessage.focus();
                selectedTextContainer.textContent = selectedText;
                selectedTextContainer.style.cssText = 'color:red';
            }
        }
    }
}

// Отправка формы
const sendForm = () => {
    if (formMessage.value.trim() !== '') {
        formMistakes.submit();
        modalMistakes.style.display = 'none';
    } else {
        formMessage.style.borderColor = 'red';
    }
}

// Закрытие формы
const closeForm = () => {
    modalMistakes.style.display = 'none';
    formMessage.style.cssText = 'height:108px';
    formMessage.value = '';
    formName.value = '';

}

// Закрытие формы кликом вне формы
const closeFormOutside = (evt) => {
    if (evt.target === modalMistakes) {
        closeForm();
    }
}

// Закрытие модалки при нажатии esc
const closeFormWhenEsc = (evt) => {
    if (evt.key === 'Escape') {
        closeForm();
    }
}

// При нажатии на ctrl+enter - показ формы, при клике на esp - закрытие формы.
const onDocumentKeydown = (evt) => {
    showModal(evt);
    closeFormWhenEsc(evt);
}

// При клике на отправить - отправка формы.
const onSubmitFormButtonClick = (evt) => {
    evt.preventDefault();
    sendForm();
}

// При клике на отмену - закрытие формы.
const onCancelFormButtonClick = () => {
    closeForm();
}

// Закрытие формы при клике на крестик.
const onCloseModalButtonClick = () => {
    closeForm();
}

// При клике вне модалки - закрытие формы.
const onWindowClick = (evt) => {
    closeFormOutside(evt);
}

// Обработчик события фокусировки на поле имени.
const onFocusFormMessage = () => {
    formMessage.style.borderColor = ''; // Снимаем подсветку границы
}

// Обработчик события потери фокуса на поле имени.
const onBlurFormMessage = () => {
    if (formMessage.value.trim() === '') {
        formMessage.style.borderColor = 'red'; // Устанавливаем красную подсветку границы
    }
}

// В textarea если длина вводимых символов больше MAX_MESSAGE_LENGTH - обрезка символов.
const onMessageInput = () => {
    if (formMessage.value.length > MAX_MESSAGE_LENGTH) {
        formMessage.value = formMessage.value.slice(0, MAX_MESSAGE_LENGTH);
    }
}

// В input если длина вводимых символов больше MAX_NAME_LENGTH - обрезка символов.
const onNameInput = () => {
    if (formName.value.length > MAX_NAME_LENGTH) {
        formName.value = formName.value.slice(0, MAX_NAME_LENGTH);
    }
}

document.addEventListener('keydown', onDocumentKeydown);

formSubmitButton.addEventListener('click', onSubmitFormButtonClick);

formCancelButton.addEventListener('click', onCancelFormButtonClick);

closeModalButton.addEventListener('click', onCloseModalButtonClick);

window.addEventListener('click', onWindowClick);

formMessage.addEventListener('focus', onFocusFormMessage);

formMessage.addEventListener('blur', onBlurFormMessage);

formMessage.addEventListener('input', onMessageInput);

formName.addEventListener('input', onNameInput);

