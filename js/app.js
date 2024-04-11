const modalMistakes = document.querySelector('.modal-mistakes');
const closeModalButton = document.querySelector('.modal-mistakes__close');
const formMistakes = document.querySelector('.form-mistakes');
const formMessage = document.querySelector('.form-mistakes__textarea');
const formName = document.querySelector('.form-mistakes__name');
const FormSubmitButton = document.querySelector('.form-button-block__button--submit');
const FormCancelButton = document.querySelector('.form-button-block__button--cancel');
const selectedTextContainer = document.querySelector('.form-mistakes__selected-text');

// Показать модалку с формой
const showModal = (evt) => {

    if (evt.ctrlKey && evt.keyCode === 13) {
        evt.preventDefault();
        let selectedText = window.getSelection().toString().trim();
        let sourceText = document.getElementById('source-text');
        sourceText.setAttribute('value', selectedText);

        if (modalMistakes.style.display === 'none' && selectedText === '') {
            alert('Выделите нужный текст для отправки формы!');
        } else if (modalMistakes.style.display === 'none') {
            if (selectedText.length > 1000) {
                alert('Можно выделить не более 1000 символов!');
            } else {
                modalMistakes.style.display = 'block';
                formMessage.focus();
                selectedTextContainer.textContent = selectedText;
                selectedTextContainer.style.cssText = 'color:red';
            }
        }
    }
}
// Получаем значения
const getValues = (evt) => {
    evt.preventDefault();
    formMessage.value;
    formName.value;
    modalMistakes.style.display = 'none';
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

}

// Закрытие формы кликом вне формы
const closeFormOutside = (evt) => {
    if (evt.target === modalMistakes) {
        modalMistakes.style.display = 'none';
    }
}

// Закрытие модалки при нажатии esc
const closeFormWhenEsc = (evt) => {
    if (evt.key === 'Escape') {
        closeForm();
    }
}

const onDocumentKeydown = (evt) => {
    showModal(evt);
    closeFormWhenEsc(evt);
}

const onFormSubmit = (evt) => {
    getValues(evt);
}

const onSubmitFormButtonClick = (evt) => {
    evt.preventDefault();
    sendForm();
}

const onCancelFormButtonClick = () => {
    closeForm();
}
const onCloseModalButtonClick = () => {
    closeForm();
}

const onWindowClick = (evt) => {
    closeFormOutside(evt);
}

// Обработчик события фокусировки на поле имени
const onFocusFormMessage = () => {
    formMessage.style.borderColor = ''; // Снимаем подсветку границы
}

// Обработчик события потери фокуса на поле имени
const onBlurFormMessage = () => {
    if (formMessage.value.trim() === '') {
        formMessage.style.borderColor = 'red'; // Устанавливаем красную подсветку границы
    }
}

document.addEventListener('keydown', onDocumentKeydown);

FormSubmitButton.addEventListener('click', onSubmitFormButtonClick);

formMistakes.addEventListener('submit', onFormSubmit);

FormCancelButton.addEventListener('click', onCancelFormButtonClick);

closeModalButton.addEventListener('click', onCloseModalButtonClick);

window.addEventListener('click', onWindowClick);

formMessage.addEventListener('focus', onFocusFormMessage);

formMessage.addEventListener('blur', onBlurFormMessage);

