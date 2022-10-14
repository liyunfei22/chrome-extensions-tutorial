
var button = document.createElement('button')
button.innerHTML = 'send message';
button.addEventListener("click",
  () => {
    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
      console.log(response.farewell);
    });
  },
false);
document.body.appendChild(button);