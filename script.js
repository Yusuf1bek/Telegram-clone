const randomMessages = [
    "Hello!", "How are you?", "What's up?", "Nice to meet you!", 
    "Good morning!", "Good night!", "What's your plan for today?",
    "Let's catch up later.", "I'm busy right now.", "See you soon!"
];

const msgContainer = document.querySelector('.msg_container');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const fileInput = document.getElementById('file');

function localStorageLoad() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach(message => {
        if (message.type === 'text') {
            createMessage(message.content, message.isMe);
        } else if (message.type === 'image') {
            createImgInMessage(message.content, message.isMe);
        }
    });
}

function messageSave(type, content, isMe) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ type, content, isMe });
    localStorage.setItem('messages', JSON.stringify(messages));
}

function createMessage(text, isMe = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg');
    if (isMe) {
        msgDiv.classList.add('me');
    }
    const p = document.createElement('p');
    p.textContent = text;

    const span = document.createElement('span');
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    span.textContent = time;

    msgDiv.appendChild(p);
    msgDiv.appendChild(span);

    msgContainer.appendChild(msgDiv);
    msgContainer.scrollTop = msgContainer.scrollHeight; 

    messageSave('text', text, isMe);
}

function createImgInMessage(imageSrc, isMe = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg');
    if (isMe) {
        msgDiv.classList.add('me');
    }
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = "Sent Image";
    img.style.maxWidth = "150px";  
    img.style.borderRadius = "8px";

    const span = document.createElement('span');
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    span.textContent = time;

    msgDiv.appendChild(img);
    msgDiv.appendChild(span);

    msgContainer.appendChild(msgDiv);
    msgContainer.scrollTop = msgContainer.scrollHeight;  

    messageSave('image', imageSrc, isMe);
}

sendButton.addEventListener('click', function () {
    const userMessage = messageInput.value.trim();
    if (userMessage) {
        createMessage(userMessage, true);  
        messageInput.value = ''; 

        setTimeout(function () {
            const randomIndex = Math.floor(Math.random() * randomMessages.length);
            const randomMessage = randomMessages[randomIndex];
            createMessage(randomMessage);  
        }, 1000); 
    }
});

messageInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            createImgInMessage(e.target.result, true);  
        };
        reader.readAsDataURL(file);  

        setTimeout(function () {
            const randomIndex = Math.floor(Math.random() * randomMessages.length);
            const randomMessage = randomMessages[randomIndex];
            createMessage(randomMessage);  
        }, 2500); 
    }
});

window.addEventListener('load', function () {
    localStorageLoad();
});
