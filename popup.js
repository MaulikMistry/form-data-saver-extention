
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
