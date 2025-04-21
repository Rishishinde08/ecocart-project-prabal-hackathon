


// check box 

const accessToken = 'N7CGKY5VJSVK7MMUOGIXUFJKIH7HU2AD';  // Your Wit.ai Client Access Token

// Function to send user message to Wit.ai API and get response
async function getWitResponse(userMessage) {
    const response = await fetch(`https://api.wit.ai/message?v=20200513&q=${encodeURIComponent(userMessage)}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    });

    const data = await response.json();
    return data;
}

// Function to display messages in chat box
function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    if (sender === 'bot') {
        messageDiv.classList.add('bot-message');
    } else {
        messageDiv.classList.add('user-message');
    }

    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Function to handle user input and send to Wit.ai
async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value.trim();

    if (userMessage === '') return;  // Don't send empty messages

    displayMessage(userMessage, 'user'); // Show user's message
    userInput.value = ''; // Clear input

    try {
        const witResponse = await getWitResponse(userMessage);
        const botReply = witResponse?.text || "Sorry, I didn't understand that.";
        displayMessage(botReply, 'bot'); // Show bot's reply
    } catch (error) {
        console.error('Wit.ai error:', error);
        displayMessage("There was an error talking to the bot.", 'bot');
    }
}

// Toggle chatbox visibility
document.getElementById('chat-btn').onclick = function () {
    const chatbox = document.getElementById('chatbox');
    if (chatbox.style.display === 'none' || chatbox.style.display === '') {
        chatbox.style.display = 'flex';
    } else {
        chatbox.style.display = 'none';
    }
};
