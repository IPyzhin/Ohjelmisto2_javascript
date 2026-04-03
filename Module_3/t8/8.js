const button = document.getElementById("start")
let select = document.getElementById("operation");
function calculate() {
    let operation = select.value
    let num1 = parseInt(document.getElementById("num1").value)
    let num2 = parseInt(document.getElementById("num2").value)
    let result = 0
    if (operation === "add") {
         result = num1 + num2
    }
    else if (operation === "sub"){
        result = num1 - num2
    }
    else if (operation === "multi"){
        result = num1 * num2
    }
    else if (operation === "div"){
        result = num1 / num2
    }
    document.getElementById("result").innerHTML = result.toString()
}
button.addEventListener("click", calculate)