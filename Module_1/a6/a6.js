const answer = confirm('Should I calculate the square root?');
if (answer) {
  let num = parseInt(prompt("Enter a number"))
    if (num >= 0){
      let sqr = Math.sqrt(num)
      document.querySelector('#sqr').innerHTML = "Square of " + num + " is " +sqr;
  }
    else {
      document.querySelector('#sqr').innerHTML = "You entered a negative number"
  }
}
else {
  document.querySelector('#sqr').innerHTML = "You decide not to calculate";
}