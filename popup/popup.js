
'use strict';

function setAlarm(event) {
  let minutes = parseFloat(event.target.value);
  chrome.action.setBadgeText({text: 'ON'});
  chrome.alarms.create({delayInMinutes: minutes});
  chrome.storage.sync.set({minutes: minutes});
  window.close();
}

function clearAlarm() {
  chrome.action.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  window.close();
}


document.getElementById('sampleMinute').addEventListener('click', setAlarm);
document.getElementById('min15').addEventListener('click', setAlarm);
document.getElementById('min30').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);