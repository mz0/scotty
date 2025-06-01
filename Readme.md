# Chrome browser extension

* select page text with a mouse
* using a Ctrl-Alt-S combination or right-mouse click open a modal dialog
* fill in a couple of elements (Tags input field, and a drop-down Route selection)
* review the current page URL, edit as needed
* send it for processing on my [server](b-end/server.js)


## `chrome-extension/`

* [manifest.json](chrome-extension/manifest.json) - See [content_scripts](https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts)
* [background.js](chrome-extension/background.js)
* [saveit.js](chrome-extension/saveit.js)
* [about.html](chrome-extension/about.html)
* icons in `images/` [by Hilmy Abiyyu A. - Flaticon](https://www.flaticon.com/free-icons/storage)


### Install the Extension

* in Chrome go to `chrome://extensions/`
* enable "Developer mode" in the top right corner
* click "Load unpacked" in the top left corner and select this `chrome-extension` folder
