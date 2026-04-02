const target = document.querySelector('#target')
const items = ["First item", "Second item", "Third item"]
items.forEach(function(text) {
  const li = document.createElement("li")
  const t = document.createTextNode(text)
  li.appendChild(t)
  target.appendChild(li)
})