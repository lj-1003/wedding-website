//THIS IS NOT READY, DON'T COMMIT YET.

//Guestbook
function composeMessage() {
    const nameInput = document.getElementById("nameInput").value;
    const messageInput = document.getElementById("messageInput").value;
    //DO NOT COMMIT THIS
    fetch("https://script.google.com/macros/s/AKfycbxlW6yZldZfCxfGroPvtzkUjQS4sjEe5t8xFTrL_h0GgYYHpAkEMmVt1acLP9tILTWk/exec", {
    method: "POST",
    body: JSON.stringify({ 
        name: nameInput, 
        message: messageInput
        })
    })
}

function resetForm() {
    location.reload();
}