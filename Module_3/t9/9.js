const button = document.getElementById("start")
function calculate() {
    let input_string = document.getElementById("calculation").value
    let num1 = 0, num2 = 0, result = 0
    if (input_string.includes("+")) {
        num1 = parseInt(input_string.split("+")[0])
        num2 = parseInt(input_string.split("+")[1])
        result = num1 + num2
    }
    else if  (input_string.includes("-")) {
        num1 = parseInt(input_string.split("-")[0])
        num2 = parseInt(input_string.split("-")[1])
        result = num1 - num2
    }
    else if  (input_string.includes("/")) {
        num1 = parseInt(input_string.split("/")[0])
        num2 = parseInt(input_string.split("/")[1])
        result = num1 / num2
    }
    else if  (input_string.includes("*")) {
        num1 = parseInt(input_string.split("*")[0])
        num2 = parseInt(input_string.split("*")[1])
        result = num1 * num2
    }
    else {
        result = "This operator doesnt exist"
   }
    document.getElementById("result").innerHTML = result.toString()
    }

button.addEventListener("click", calculate)