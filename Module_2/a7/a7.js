function dice(maxside){
    return Math.floor(Math.random() * maxside) + 1
}
let side = parseInt(prompt("Enter the number sides of the dice"))
document.querySelector('#side').innerHTML = `Dice is ${side} sided.`
let r = dice(side)
result = ''
while (r !== side) {
    result +=`<li>Roll: ${r}</li>`
    r = dice(side)
}
if (r === side) result +=`<li>Roll: ${r}</li>`
document.querySelector('#res').innerHTML = result
