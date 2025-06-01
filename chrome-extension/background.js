chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sendToCharome",
    title: "Send to Charome",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendToCharome" && info.selectionText) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['saveit.js'],
    }, () => {
      chrome.tabs.sendMessage(tab.id, {
        action: "openModal",
        selectedText: info.selectionText
      });
    });
  }
});

chrome.commands.onCommand.addListener((command, tab) => {
  if (command === "open-charome-modal") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['saveit.js'],
    }, () => {
      chrome.tabs.sendMessage(tab.id, {
        action: "openModal",
        selectedText: window.getSelection().toString() // Might need adjustment in saveit.js
      });
    });
  }
});
