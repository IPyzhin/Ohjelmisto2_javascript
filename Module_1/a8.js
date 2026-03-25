let start_year = parseInt(prompt("Enter start year"));
let end_year = parseInt(prompt("Enter end year"));
let years = [];
if (isNaN(start_year) || isNaN(end_year) || start_year > end_year) {
  document.querySelector('#years').innerHTML = "Entered invalid range";
} else {
  for (let i = start_year; i <= end_year; i++) {
    if ((i % 4 === 0 && i % 100 !== 0) || (i % 400 === 0)) {
      years.push(i);
    }
  }
  let list = years.map(year => `<li>${year}</li>`).join('');
  document.querySelector('#prnt').innerHTML = `Leap years in a period from ${start_year} to ${end_year}`
  document.querySelector('#years').innerHTML = `<ul>${list}</ul>`;
}