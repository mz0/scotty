const { JSDOM } = require('jsdom');
const fs = require('fs');

// Simulate a browser environment
const dom = new JSDOM(`<!DOCTYPE html><body></body>`, { url: "https://example.com" });
global.window = dom.window;
global.document = dom.window.document;

// Load your createModal.js code
const createModalCode = fs.readFileSync('./createModal.js', 'utf8');
eval(createModalCode);

// Now you can call createModal
createModal('Hamlet: Words, words, words...');

// Output the resulting HTML for inspection
console.log(dom.serialize());
