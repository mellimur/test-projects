const input = document.getElementById("inp");
const button = document.getElementById("btn");
const parent = document.getElementById("parent");
const answers = [
    "Привет!",
    "Всё хорошо, а как твои дела?",
    "Замечательно",
];
let index = 0;

let typingTextClassNames = ["typing", "message--text", "fc", "bot"];
let replyMessageClassNames = ["message--innercontainer--reply", "message--text", "fc"];
let sendMessageClassNames = ["message--innercontainer--main", "message--text", "fc"];

const rightMessageTail = "messagetailright.svg";
const leftMessageTail = "messagetailleft.svg";


// Измение прозрачности сообщений в зависимости от их возраста
function fadeOldMessages() {
  const messages = [...document.querySelectorAll("#parent .message--container")].reverse();

  messages.forEach((msg, index) => {
    const opacity = Math.max(1 - index * 0.1, 0.2);
    msg.style.opacity = opacity.toFixed(2);
  });
}


// Добавление скроллбара
function scrollToBottom() {
    parent.scrollTop = parent.scrollHeight;
}


// Функция-конструктор для создания текстового контейнера
function createContainer(classNames, text) {
    const div = document.createElement("div");
    div.classList.add(...classNames);
    div.innerText = text;
    
    parent.appendChild(div);

    return div;
}

// Функция-конструктор для создания сообщений
function createMessage(user, innerContainerClassnames, tailSrc, txt) {
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("message--container", user);

    const msgContainer = document.createElement("div");
    msgContainer.classList.add(...innerContainerClassnames);
    msgContainer.innerHTML = txt;

    const msgTail = document.createElement("img");
    msgTail.src = tailSrc;

    if (user === "user") {
        mainContainer.append(msgContainer, msgTail);
    } else if (user === "bot") {
        mainContainer.append(msgTail, msgContainer);
    }

    parent.appendChild(mainContainer);
}


// Функция отправки заготовленных ответов
function replyMessage() {
    const typingExists = document.querySelector(".typing");

    if (typingExists) return;

    const element = createContainer(typingTextClassNames, "Печатает...");
    scrollToBottom();

    setTimeout(() => {
        element.remove();

        const replyText = index < answers.length ? answers[index++] : "Не знаю, что и сказать...";
        createMessage("bot", replyMessageClassNames, leftMessageTail, replyText);

        fadeOldMessages();
        scrollToBottom();
    }, 3500);
}


// Функция отправки сообщений пользователя
function sendMessage() {
    if (input.value.trim()) {
        createMessage("user", sendMessageClassNames, rightMessageTail, input.value);
        input.value = "";

        fadeOldMessages();
        replyMessage();
    }
}


//Отправка сообщения при клике на кнопку
button.addEventListener("click", sendMessage);