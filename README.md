# Chrome Extension: Form Data Persistence

## Overview

This Chrome extension enables the persistence of form data across sessions. It allows users to fill out forms on web pages, save their input locally, and automatically load it when they revisit the page.

### Features

- **Automatic Data Storage**: Input values from `<input>`, `<textarea>`, and `<select>` elements are saved locally using Chrome's `chrome.storage.local`.
- **Dynamic Input Detection**: Changes in input values (typing, checkbox/radio selection, select option change) are detected in real-time and stored.
- **Data Loading**: Stored input data is automatically loaded into form fields when the page is revisited.
- **Selective Input Handling**: Different input types (`text`, `checkbox`, `radio`, `select`) are handled appropriately for accurate data storage and retrieval.

## Usage

1. **Installation**: 
   - Clone this repository to your local machine.
   - Open Chrome browser and navigate to `chrome://extensions/`.
   - Enable **Developer mode**.
   - Click on **Load unpacked** and select the cloned directory.

2. **Functionality**:
   - Navigate to any web page containing forms.
   - Fill out form fields (`<input>`, `<textarea>`, `<select>`).
   - Input data is automatically saved as you type or make selections.
   - Close the tab or browser and revisit the page to see saved data automatically loaded into form fields.

3. **Customization**:
   - Modify the code to handle specific form structures or additional input types as per your requirements.
   - Explore and extend functionality such as syncing data across devices using Chrome's `sync` storage.

## Development

### Technologies Used

- **JavaScript**: Language used for Chrome extension development.
- **HTML/CSS**: Basic structure and styling of the extension's options or popup pages.
- **Chrome Storage API**: Utilized for storing and retrieving input data locally.
- **Event Listeners**: Implemented to detect input changes (`input` events) and page unloading (`beforeunload` event).