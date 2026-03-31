let num = parseInt(prompt("Enter a number of participants"))
let names = []
for (let i = 0; i < num; i++) {
    names.push(prompt("Enter participant name"))
}
names.sort()
for (let i = 0;i < names.length; i++) {
    document.querySelector('#name').innerHTML = names.join('<li>')
}