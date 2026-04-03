const button = document.querySelector('button')
function A(evt){
    alert(`Button ${evt.currentTarget.textContent} was clicked`);
}
button.addEventListener("click", A)