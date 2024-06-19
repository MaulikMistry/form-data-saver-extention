chrome.browserAction.onClicked.addListener(function (tab) {
  // Perform actions when extension icon is clicked
  

  // Example: Send message to content script to load data
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "loadInputData" },
      function (response) {
        if (chrome.runtime.lastError) {
          
        } else {
          
        }
      }
    );
  });
});
