num_rolls = parseInt(prompt("Enter number of rolls"))
roll_sum = parseInt(prompt("Enter desired sum"))
if (isNaN(num_rolls) || isNaN(roll_sum) || num_rolls <0 || roll_sum <=0) {
  document.querySelector('#prnt').innerHTML = "Invalid input values"
}
else{
  sum = 0
  counter = 0
  for (i=1;i<=10000;i++){
    sum = 0
    for (j=1;j<num_rolls + 1;j++){
      let roll = Math.floor(Math.random() * 6) + 1
      sum += roll
    if (sum == roll_sum) {
      counter += 1
    }
    }
  }
  if (isNaN(counter)){
    document.querySelector('#prnt').innerHTML = `Probability to get sum ${roll_sum} with ${num_rolls} dice is 0%`
  }
  else{
    let res = ((counter / 10000) * 100).toFixed(2)
    document.querySelector('#prnt').innerHTML = `Probability to get sum ${roll_sum} with ${num_rolls} dices is ${res}%`;
  }
}