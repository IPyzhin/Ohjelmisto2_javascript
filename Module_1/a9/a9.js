num = parseInt(prompt("Enter number"))
if (isNaN(num)) {
  document.querySelector('#prnt').innerHTML = "Wrong number entered"
}
else{
  let checker = []
  for (i = 1; i <= num; i++) {
    if ((num % i) == 0){
      checker.push(i)
    }
  }
  if ((checker.length) == 2){
    document.querySelector('#prnt').innerHTML = `${num} is a prime number`
  }
  else {
    document.querySelector('#prnt').innerHTML = `${num} is not a prime number`
  }
}
