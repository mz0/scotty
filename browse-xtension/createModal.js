let win, docum;

if (typeof window === 'undefined') {  // Detect if running in Node.js (standalone)
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(`<!DOCTYPE html><body></body>`, { url: "http://test.us" });
    win = dom.window;
    docum = dom.window.document;
    module.exports.dom = dom;
} else {  // Browser environment
  win = window;
  docum = document;
  win.createModal = createModal; // make global in browser
}

let modal = null;

function createModal(selectedText) {
  if (modal) {
    modal.remove();
  }

  modal = docum.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.backgroundColor = 'white';
  modal.style.padding = '20px';
  modal.style.border = '1px solid #ccc';
  modal.style.zIndex = '10000';
  modal.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';

  const pageUrl = win.location.href; // Get the current page URL

  const urlLabel = docum.createElement('p');
  urlLabel.textContent = `Page URL: ${pageUrl}`;
  modal.appendChild(urlLabel);

  const selectedTextLabel = docum.createElement('p');
  selectedTextLabel.textContent = `Selected Text: "${selectedText}"`;
  modal.appendChild(selectedTextLabel);

  const tagsLabel = docum.createElement('label');
  tagsLabel.textContent = 'Tags: ';
  const tagsInput = docum.createElement('input');
  tagsInput.type = 'text';
  tagsInput.id = 'saveit-tags';
  modal.appendChild(tagsLabel);
  modal.appendChild(tagsInput);

  const routeLabel = docum.createElement('label');
  routeLabel.textContent = 'Route: ';
  const routeSelect = docum.createElement('select');
  routeSelect.id = 'saveit-route';
  const option1 = docum.createElement('option');
  option1.value = 'route1';
  option1.textContent = 'Route 1';
  const option2 = docum.createElement('option');
  option2.value = 'route2';
  option2.textContent = 'Route 2';
  routeSelect.appendChild(option1);
  routeSelect.appendChild(option2);
  modal.appendChild(routeLabel);
  modal.appendChild(routeSelect);

  const sendButton = docum.createElement('button');
  sendButton.textContent = 'Send to Server';
  sendButton.addEventListener('click', () => {
    const tags = docum.getElementById('saveit-tags').value;
    const route = docum.getElementById('saveit-route').value;
    sendDataToServer(selectedText, tags, route, pageUrl); // Pass the URL
    modal.remove();
    modal = null;
  });
  modal.appendChild(sendButton);

  const closeButton = docum.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.addEventListener('click', () => {
    modal.remove();
    modal = null;
  });
  modal.appendChild(closeButton);

  docum.body.appendChild(modal);
}

// for Node.js only
if (typeof module !== 'undefined') {
  module.exports.createModal = createModal;
}
