// Detecting the client's browser when visiting the website using the feature detection method
// Code borrowed from StackOverflow

var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
var isFirefox = typeof InstallTrigger !== 'undefined';
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var isOpera = navigator.userAgent.indexOf("OPR") > -1 || navigator.userAgent.indexOf("Opera") > -1;
var isEdge = navigator.userAgent.indexOf("Edge") > -1;

if (isChrome) {
    alert("You are using Chrome or a Chromium-based browser");
} else if (isFirefox) {
    alert("You are using Firefox");
} else if (isSafari) {
    alert("You are using Safari");
} else if (isOpera) {
    alert("You are using Opera");
} else if (isEdge) {
    alert("You are using Microsoft Edge");
} else {
    alert("You are using a different browser");
}