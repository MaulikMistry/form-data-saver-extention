chrome.action.onClicked.addListener((tab) => {
  // Perform actions when extension icon is clicked
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "loadInputData" },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          } else {
            console.log(response);
          }
        }
      );
    }
  });
});
