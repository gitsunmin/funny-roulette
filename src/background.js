import chrome from "webextension-polyfill";

chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === "install") {
        alert('Thank You For Download!');
    }
});
