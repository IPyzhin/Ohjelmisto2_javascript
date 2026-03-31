function dice(){
    return Math.floor(Math.random() * 6) + 1
}
let r = dice()
result = ''
while (r !== 6) {
    result +=`<li>Roll: ${r}</li>`
    r = dice()
}
if (r === 6) result +=`<li>Roll: ${r}</li>`
document.querySelector('#roll').innerHTML = result
