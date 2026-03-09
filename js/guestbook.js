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
 
  const isConfirmed = confirm("Are you sure you want to submit? Once posted, it can only be removed by contacting Levi.");
  if (isConfirmed) {

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
      alert("Ruh Roh Raggy! You entered something innappropriate, so no Scooby Snacks for you! ");
      } else {
        console.log(messageData);
        const savedMessage = await addMessage(messageData)
      }

      window.location.replace("../pages/guestbook.html");

    } else {
      alert("Message cancelled.");
    }
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
