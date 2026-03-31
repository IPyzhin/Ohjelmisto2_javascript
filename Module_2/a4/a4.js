let num = parseInt(prompt("Enter a number. If you enter 0, program will stop asking u for numbers"))
let numbers = []
numbers.push(num)
while (num !== 0) {
    num = parseInt(prompt("Enter a number. If you enter 0, program will stop asking u for numbers"))
    numbers.push(num)
}
console.log(numbers.sort((a, b) => b - a))