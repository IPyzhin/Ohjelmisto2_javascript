let numbers = []
while (true) {
    let num = parseInt(prompt("Enter number. If you enter the same number you entered before, program stops"))
    if (numbers.includes(num)){
        break
    }
    else {
        numbers.push(num)
    }
}
console.log(numbers.sort((a,b) => a - b))
