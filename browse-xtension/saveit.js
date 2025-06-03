if (typeof brwsr === 'undefined') {
  const brwsr = typeof browser !== 'undefined' ? browser : chrome;
}

let serverBase;
brwsr.storage.sync.get(['serverAddress'], (items) => {
  serverBase = items.serverAddress || 'https://localhost:1337';
});


function sendDataToServer(text, tags, route, url) { // Accept the URL
  // Replace with your server endpoint
  const serverUrl = `${serverBase}/saveit`;

  fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      selectedText: text,
      tags: tags,
      route: route,
      pageUrl: url // Save current URL too
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
    // Optionally display an error message to the user
  });
}

brwsr.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openModal" && request.selectedText) {
    createModal(request.selectedText);
  }
});

document.addEventListener('keydown', (event) => {
  // Example hotkey: Ctrl + Shift + S
  if (event.ctrlKey && event.shiftKey && event.key === 'S') {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      createModal(selectedText);
    }
  }
});
