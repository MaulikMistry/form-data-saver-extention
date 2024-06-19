// Function to load input field data
function loadInputData() {
  const formId = generateFormId();
  

  if (!formId) {
    
    return;
  }

  chrome.storage.local.get(formId, function (result) {
    
    const inputData = result[formId];
    if (inputData && Object.keys(inputData).length > 0) {
      Object.keys(inputData).forEach(function (selectorPath) {
        const value = inputData[selectorPath];
        try {
          const element = document.querySelector(selectorPath);
          if (element) {
            
            if (element.tagName === "SELECT") {
              selectOption(element, value);
            } else if (
              element.type === "checkbox" ||
              element.type === "radio"
            ) {
              if (element.checked !== value) {
                element.click(); // Use click to simulate user interaction
              }
            } else if (element.type === "file") {
              
            } else {
              simulateTyping(element, value);
            }
          } else {
            
          }
        } catch (error) {
          
        }
      });
      
    } else {
      
    }
  });
}

// Function to select an option in a <select> element
function selectOption(selectElement, value) {
  Array.from(selectElement.options).forEach((option) => {
    if (option.value === value) {
      option.selected = true;
      selectElement.dispatchEvent(new Event("change")); // Trigger change event
      
    }
  });
}

// Function to save input field data on change
document.addEventListener("input", function (event) {
  const target = event.target;
  if (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  ) {
    const selectorPath = generateSelectorPath(target);
    const formId = generateFormId();
    

    if (!formId) {
      
      return;
    }

    let fieldValue;
    if (target.tagName === "SELECT") {
      fieldValue = target.value; // For <select> elements, store the selected value
    } else if (target.type === "checkbox" || target.type === "radio") {
      fieldValue = target.checked;
    } else {
      fieldValue = target.value;
    }
    

    // Save data to storage
    chrome.storage.local.get(formId, function (result) {
      const inputData = result[formId] || {};
      inputData[selectorPath] = fieldValue;
      chrome.storage.local.set({ [formId]: inputData }, function () {
        
      });
    });
  }
});

// Function to generate a unique form ID based on URL
function generateFormId() {
  const url = new URL(window.location.href);
  return url.origin + url.pathname;
}

// Function to generate a unique query selector path for an element
function generateSelectorPath(element) {
  const path = [];

  while (element.parentNode) {
    let tagName = element.tagName.toLowerCase();
    let siblingIndex = 1;
    let sibling = element;
    while (sibling.previousElementSibling) {
      sibling = sibling.previousElementSibling;
      if (sibling.tagName.toLowerCase() === tagName) {
        siblingIndex++;
      }
    }
    let selectorPart = tagName;
    if (siblingIndex > 1) {
      selectorPart += `:nth-of-type(${siblingIndex})`;
    } else {
      let index = Array.from(element.parentNode.children).indexOf(element) + 1;
      selectorPart = `${element.tagName.toLowerCase()}:nth-child(${index})`;
    }

    path.unshift(selectorPart);
    element = element.parentNode;
  }

  return path.join(" > ");
}

// Function to simulate typing
function simulateTyping(element, text) {
  element.focus();
  element.value = ""; // Clear existing value
  text.split("").forEach((char) => {
    let event = new KeyboardEvent("keydown", { key: char });
    element.dispatchEvent(event);
    element.value += char;
    event = new Event("input", { bubbles: true });
    element.dispatchEvent(event);
  });
  element.blur();
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "loadInputData") {
    
    loadInputData();
    sendResponse({ status: "success" }); // Make sure to send a response if needed
  }
});

// Save data when user leaves the page
window.addEventListener("beforeunload", saveInputData);

// Function to save input field data on page unload
function saveInputData() {
  const inputs = document.querySelectorAll("input, textarea, select");
  const formData = {};

  inputs.forEach((input) => {
    const uniqueSelector = generateSelectorPath(input);
    const fieldValue =
      input.tagName === "SELECT"
        ? input.value
        : input.type === "checkbox" || input.type === "radio"
        ? input.checked
        : input.value;
    formData[uniqueSelector] = fieldValue;
  });

  const formId = generateFormId(); // Use URL path as form identifier
  chrome.storage.local.set({ [formId]: formData }, () => {
    
  });
}
