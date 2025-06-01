let modal = null;

function createModal(selectedText) {
  if (modal) {
    modal.remove();
  }

  modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.backgroundColor = 'white';
  modal.style.padding = '20px';
  modal.style.border = '1px solid #ccc';
  modal.style.zIndex = '10000';
  modal.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';

  const pageUrl = window.location.href; // Get the current page URL

  const urlLabel = document.createElement('p');
  urlLabel.textContent = `Page URL: ${pageUrl}`;
  modal.appendChild(urlLabel);

  const selectedTextLabel = document.createElement('p');
  selectedTextLabel.textContent = `Selected Text: "${selectedText}"`;
  modal.appendChild(selectedTextLabel);

  const tagsLabel = document.createElement('label');
  tagsLabel.textContent = 'Tags: ';
  const tagsInput = document.createElement('input');
  tagsInput.type = 'text';
  tagsInput.id = 'charome-tags';
  modal.appendChild(tagsLabel);
  modal.appendChild(tagsInput);

  const routeLabel = document.createElement('label');
  routeLabel.textContent = 'Route: ';
  const routeSelect = document.createElement('select');
  routeSelect.id = 'charome-route';
  const option1 = document.createElement('option');
  option1.value = 'route1';
  option1.textContent = 'Route 1';
  const option2 = document.createElement('option');
  option2.value = 'route2';
  option2.textContent = 'Route 2';
  routeSelect.appendChild(option1);
  routeSelect.appendChild(option2);
  modal.appendChild(routeLabel);
  modal.appendChild(routeSelect);

  const sendButton = document.createElement('button');
  sendButton.textContent = 'Send to Server';
  sendButton.addEventListener('click', () => {
    const tags = document.getElementById('charome-tags').value;
    const route = document.getElementById('charome-route').value;
    sendDataToServer(selectedText, tags, route, pageUrl); // Pass the URL
    modal.remove();
    modal = null;
  });
  modal.appendChild(sendButton);

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.addEventListener('click', () => {
    modal.remove();
    modal = null;
  });
  modal.appendChild(closeButton);

  document.body.appendChild(modal);
}

function sendDataToServer(text, tags, route, url) { // Accept the URL
  // Replace with your server endpoint
  const serverUrl = 'YOUR_SERVER_URL';

  fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      selectedText: text,
      tags: tags,
      route: route,
      pageUrl: url // Send the URL to the server
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    // Optionally display a success message to the user
  })
  .catch((error) => {
    console.error('Error:', error);
    // Optionally display an error message to the user
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
