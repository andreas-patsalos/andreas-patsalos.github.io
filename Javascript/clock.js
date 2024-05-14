"use strict"

runClock();
setInterval(runClock, 1000);
function runClock() {
   let thisDay = new Date();
   let thisDate = thisDay.toLocaleDateString();
   let thisDayNum = thisDay.getDay();
   let thisWeekday = getWeekday(thisDayNum);
   let thisTime = thisDay.toLocaleTimeString();
   document.getElementById("date").textContent = thisDate;
   document.getElementById("wday").textContent = thisWeekday;
   document.getElementById("time").textContent = thisTime;
}

function getWeekday(dayNum) {
   var wDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   return wDays[dayNum];
}
