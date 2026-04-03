const form = document.querySelector('form')
const f = document.querySelector('input[name=firstname]')
const l = document.querySelector('input[name=lastname]')
let res = document.getElementById('target')

form.addEventListener('submit', function(evt) {
    evt.preventDefault()

    if (f.value && l.value) {
        res.innerHTML = `Your name is ${f.value} ${l.value}`
    }
    else {
        res.innerHTML = "Please fill both fields"
    }
})