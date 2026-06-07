function resetForm() {
    location.reload();
}

import { christianMinecraftServer } from '../js/profanity.js';

//takes functions from firebaseDB.js to be used here. 
import {
  addMessage,
  getMessage,
  deleteMessage,
} from "../js/firebaseDB.js"

//----------------------------------------------
// I made Claude write this cause I don't know much cyber security lol. It hashes the passwords.
async function hashPassword(codeInput) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeInput);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
//----------------------------------------------
//----------------------------------------------
async function composeMessage() {
 
  const date = new Date();

  const isConfirmed = confirm("Are you sure you want to submit?");
  if (isConfirmed) {

    const codeInput = document.getElementById("codeInput").value;
    const codeHashed = await hashPassword(codeInput)

    const nameInput = document.getElementById("nameInput").value;
    const messageInput = document.getElementById("messageInput").value;

    const messageData = {
      codeInput: codeHashed,
      nameInput: nameInput,
      messageInput: messageInput,
      createdAt : date
    }

    if (!codeInput || !nameInput || !messageInput) {
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
//----------------------------------------------
async function confirmDelete(postID, postCode) {
  
  const compareCode = window.prompt('Enter post password to delete.');
  const comparedCodeHashed = await hashPassword(compareCode);

  if (comparedCodeHashed !== postCode) {
    alert('Incorrect password.');
    return;
  }

  await deleteMessage(postID); // Calls the delete function in FirebaseDB.js
}
//----------------------------------------------
// Load messages from Firebase and Display in UI
async function getMessageData() {
  const messages = await getMessage();
  console.log(messages); //test to see if getting data

  const messageList = document.getElementById("message-list");
  messageList.innerHTML = ""; // Clears previous items

  messages.forEach(message => {
    const postID = `${message.id}`
    const postCode = `${message.codeInput}`

    const listDelete = document.createElement("button");
    listDelete.textContent = 'Remove';
    listDelete.addEventListener("click", async () => {
      await confirmDelete(postID, postCode); // Moves to confirm code.

      window.location.replace("../pages/guestbook.html"); // Reload after confirmation.
    })

    const listName = document.createElement("li");
    listName.innerHTML = `<span><b>${message.nameInput}</b></span>`;
    const listMessage = document.createElement("li");
    listMessage.innerHTML = `${message.messageInput}`;
    const br = document.createElement("br");

    messageList.appendChild(listDelete);
    messageList.appendChild(listName);
    messageList.appendChild(listMessage);
    messageList.appendChild(br);
    
  });
}

getMessageData();

window.resetForm = resetForm;
window.composeMessage = composeMessage;
