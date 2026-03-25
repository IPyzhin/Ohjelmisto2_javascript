function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);}
name = prompt("Enter your name")
a = getRandomInt(1,4)
if (a == 1) {
  document.querySelector('#a').innerHTML = name + ", you are Gryffindor";
}
else if (a == 2) {
  document.querySelector('#a').innerHTML = name + ", you are Slytherin";
}
else if (a == 3) {
  document.querySelector('#a').innerHTML = name + ", you are Hufflepuff";
}
else {
  document.querySelector('#a').innerHTML = name + ", you are Ravenclaw";
}