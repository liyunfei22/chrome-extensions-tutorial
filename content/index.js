var button = document.createElement('button')
button.innerHTML = 'hi';
button.addEventListener("click", () =>
  alert('hello')
  , false);
document.body.appendChild(button);