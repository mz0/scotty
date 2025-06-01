const brwsr = typeof browser !== 'undefined' ? browser : chrome;

brwsr.runtime.onInstalled.addListener(() => {
  brwsr.contextMenus.create({
    id: "beam-it-up",
    title: "Beam it Up",
    contexts: ["selection"]
  });
});

brwsr.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "beam-it-up" && info.selectionText) {
    brwsr.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['saveit.js'],
    }, () => {
      brwsr.tabs.sendMessage(tab.id, {
        action: "openModal",
        selectedText: info.selectionText
      });
    });
  }
});

brwsr.commands.onCommand.addListener((command, tab) => {
  if (command === "open-saveIt-modal") {
    brwsr.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['saveit.js'],
    }, () => {
      brwsr.tabs.sendMessage(tab.id, {
        action: "openModal",
        // Might need adjustment in saveit.js
        selectedText: window.getSelection().toString()
      });
    });
  }
});
