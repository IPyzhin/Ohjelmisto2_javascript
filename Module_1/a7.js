let d_num = parseInt(prompt("Enter a number of dice rolls"))
if (d_num >=0) {
  let dice_sum = 0, rolls_history = document.querySelector("#rolls"), rolls = [];
  for (let i = 0; i < d_num; i++) {
    let dice = Math.floor(Math.random() * 6) + 1;
    dice_sum += dice
    rolls.push(dice);
  document.querySelector('#dice_sum').innerHTML = "Summ of " + d_num + " rolls is " + dice_sum
    rolls_history.innerHTML = `Rolls: ${rolls.join(', ')}`;
  }
}
else {
  document.querySelector('#dice_sum').innerHTML = "You entered a negative number"
}