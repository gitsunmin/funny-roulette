import chrome from "webextension-polyfill";
// app's serviceWorker
console.log('background.js');

let color = '#3aa757';
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    console.log('chrome:', chrome);
    console.log('chrome.runtime:', chrome.runtime);
  }
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});