function resetForm() {
    location.reload();
}

import { christianMinecraftServer } from '../js/profanity.js';

//takes functions from firebaseDB.js to be used here. 
import {
  addMessage,
  getMessage,
  //getMessage,
  //deleteMessage,
  //updateMessage
} from "../js/firebaseDB.js"

async function composeMessage() {
    const nameInput = document.getElementById("nameInput").value;
    const messageInput = document.getElementById("messageInput").value;

    const messageData = {
      nameInput: nameInput,
      messageInput: messageInput,
    }

    if (!nameInput || !messageInput) {
      alert('Please fill out all required fields!');
      return;
    }

    if (
      christianMinecraftServer.some(word =>
      nameInput.toLowerCase().includes(word.toLowerCase()) ||
      messageInput.toLowerCase().includes(word.toLowerCase())
      )
    ) {
      alert("Not on my Christian Minecraft Server!");
      } else {
        console.log(messageData);
        const savedMessage = await addMessage(messageData)
      }

      window.location.replace("../pages/guestbook.html");
    }

// Load messages from Firebase and Display in UI
async function getMessageData() {
  const messages = await getMessage();
  console.log(messages); //test to see if getting data

  const messageList = document.getElementById("message-list");
  messageList.innerHTML = ""; // Clears previous items

  messages.forEach(message => {

    const li = document.createElement("li");
    li.textContent = `${message.nameInput}: ${message.messageInput}`;

    messageList.appendChild(li);
    
  });
}

getMessageData();

window.resetForm = resetForm;
window.composeMessage = composeMessage;
