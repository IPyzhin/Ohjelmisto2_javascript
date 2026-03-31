let dogs = []
for (let i = 0; i < 6; i++) {
    dogs.push(prompt("Enter dog name"))
}
dogs.sort().reverse()
let result = ''
for (let i = 0;i < dogs.length; i++) {
    result += `<li>${dogs[i]}</li>`
}
document.querySelector('#dog').innerHTML = result