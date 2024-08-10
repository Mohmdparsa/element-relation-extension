let isActive = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.mode === 'activate') {
    isActive = true;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['contentScript.js'],
      });
      chrome.tabs.sendMessage(tabs[0].id, { mode: 'activate' });
    });
    sendResponse({ message: 'Mode activated' });
  } else if (request.mode === 'deactivate') {
    isActive = false;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { mode: 'deactivate' });
    });
    sendResponse({ message: 'Mode deactivated' });
  }
});