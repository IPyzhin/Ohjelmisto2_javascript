'use strict'
const students = [
  {
    name: 'John',
    id: '2345768',
  },
  {
    name: 'Paul',
    id: '2134657',
  },
  {
    name: 'Jones',
    id: '5423679',
  },
]
const target = document.querySelector('#target')
for (let i = 0;i < students.length; i++) {
  let option = document.createElement('option')
  option.value = students[i].id
  let name = document.createTextNode(students[i].name)
  option.appendChild(name)
  target.appendChild(option)
  }