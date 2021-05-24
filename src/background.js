import chrome from "webextension-polyfill";
// app's serviceWorker
console.log('background.js');
console.log('DOM:', document);
let color = '#3aa757';
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    alert('Thank You For Download!');
  }
  chrome.storage.sync.set({ color });
  console.log('Thank You For %cDownload!', `color: ${color}`);
});