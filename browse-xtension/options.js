const serverAddressInput = document.getElementById('serverAddress');
const saveButton = document.getElementById('saveOptions');
const statusDiv = document.getElementById('status');
let brwsr = typeof browser !== 'undefined' ? browser : chrome;

// Saves options to chrome.storage.sync.
function saveOptions() {
  const serverAddress = serverAddressInput.value;
  brwsr.storage.sync.set({ serverAddress: serverAddress }, () => {
    statusDiv.textContent = 'Options saved.';
    setTimeout(() => {
      statusDiv.textContent = '';
    }, 750);
  });
}

// Restores select box state using the preferences stored in chrome.storage.
function restoreOptions() {
  brwsr.storage.sync.get(['serverAddress'], (items) => {
    serverAddressInput.value = items.serverAddress || 'http://localhost:1337'; // Default value
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
saveButton.addEventListener('click', saveOptions);
