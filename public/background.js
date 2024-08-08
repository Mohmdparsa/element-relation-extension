let isActive = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.mode === 'activate') {
    isActive = true;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['contentScript.js'],
      });
    });
    sendResponse({ message: 'Mode activated' });
  } else if (request.mode === 'deactivate') {
    isActive = false;
    // Optionally, you can remove the content script here or just stop further actions in it.
    sendResponse({ message: 'Mode deactivated' });
  }
});