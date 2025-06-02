# Browser extension (Scotty)

* select page text with a mouse
* using a Ctrl-Alt-S combination or right-mouse click open a modal dialog
* fill in a couple of elements (Tags input field, and a drop-down Route selection)
* review the current page URL, edit as needed
* send it for processing on my [server](b-end/server.js)


## `browse-xtension/`

* [manifest.json](browse-xtension/manifest.json) - See [content_scripts](https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts)
* [background.js](browse-xtension/background.js)
* [saveit.js](browse-xtension/saveit.js)
* [about.html](browse-xtension/about.html)
* icons in `images/` [by Hilmy Abiyyu A. - Flaticon](https://www.flaticon.com/free-icon/cloud-storage_10446173)


### Install the Extension
* **Chrome**
  * go to `chrome://extensions/` and enable "Developer mode" in the top right corner
  * click "Load unpacked" in the top left corner and select this `browse-extension` folder

* **Firefox**
  * go `about:debugging#/runtime/this-firefox`
  * *Temorary Extensitons* section is the 1st, **Load Temporary Add-on...** button

Keep in mind: after Firefox restart it will be gone.


### Run the *server*
```
b-end$ npm start

> net.x320.saveit@0.0.1 start
> node server.js

Server listening at http://localhost:3000
Received data:
```
(the received data is below)
```js
// Beamed with Chrome
{
  selectedText: 'Modifier key strings Ctrl, Alt, Shift, MacCtrl (macOS only), Command (macOS only), Search (ChromeOS only)',
  tags: 'KB, Chrome',
  route: 'route1',
  pageUrl: 'https://developer.chrome.com/docs/extensions/reference/api/commands#supported_keys'
}

{
  selectedText: 'I Am Done With Graph QL After 6 Years; ThePrimeTime; 166K views; 11 months ago; Recorded live on twitch',
  tags: 'API',
  route: 'route2',
  pageUrl: 'https://www.youtube.com/watch?v=XBUsRVepF-8'
}

{
  selectedText: '"Beam me up, Scotty" is a catchphrase and misquotation ..from the science fiction television series Star Trek: The Original Series. It comes from the command Captain Kirk gives his chief engineer, Montgomery "Scotty" Scott, when he needs to be "transported" back to the Starship Enterprise.',
  tags: 'Good2Know',
  route: 'route1',
  pageUrl: 'https://en.wikipedia.org/wiki/Beam_me_up,_Scotty'
}

// Beamed with Firefox
{
  selectedText: "Let's reproduce GPT-2 (124M); Andrej Karpathy; 811K views;" +
 '11 months ago; We reproduce the GPT-2 (124M) from scratch.',
  tags: 'yt, long',
  route: 'route2',
  pageUrl: 'https://www.youtube.com/watch?v=l8pRSuU81PU'
}
```

### Note

Downsize and add PNG background using GIMP `convert`:
```
convert icons-cache/cloud-store64.png \
  -resize 48x48 \
  -background white -flatten \
 browse-xtension/images/icon48.png
```
