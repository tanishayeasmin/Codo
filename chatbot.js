const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");

// Toggle Chatbot Visibility
function toggleChat() {
    const chatbot = document.querySelector(".chatbot");
    chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
}

// Function to send messages
async function sendMessage() {
    let message = chatInput.value.trim();
    if (message === "") return;

    // Display user message
    chatBody.innerHTML += `<div class="user-message"><b>You:</b> ${message}</div>`;
    chatInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to latest message

    // Send message to the backend
    try {
        let response = await fetch("http://127.0.0.1:5000/chat", { // Ensure Flask is running
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        let data = await response.json();

        // Display chatbot response
        chatBody.innerHTML += `<div class="bot-message"><b>Bot:</b> ${data.response}</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    } catch (error) {
        console.error("Error:", error);
        chatBody.innerHTML += `<div class="bot-message error"><b>Bot:</b> Error connecting to server.</div>`;
    }
}

// Send message on Enter key press
chatInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
