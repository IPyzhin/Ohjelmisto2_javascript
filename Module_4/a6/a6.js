const form = document.querySelector('#form')
const status = document.querySelector('#status')
const target = document.getElementById('results')
form.addEventListener('submit', async function(evt) {
    evt.preventDefault()
    const query = document.querySelector('input[name=q]').value.trim()
    try {
        status.textContent = `Start searching for joke containing "${query}"`
        const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`);
        const jsonData = await response.json()
        console.log(jsonData)
        status.textContent = `Search is done. ${jsonData.result.length} results found.`
        target.innerHTML = ""
        for (let i = 0; i < jsonData.result.length;i++) {
            let article = document.createElement("article")
            article.classList.add("article")
            let joke = document.createElement("p")
            joke.textContent = jsonData.result[i].value
            joke.style.marginRight = "3px"
            let image = document.createElement("img")
            image.src = "chuck.gif"
            image.alt = "chuck_norris.gif"
            let link = document.createElement("a")
            link.href = jsonData.result[i].url
            link.target = "_blank"
            link.innerText = `[${i+1}]`
            joke.append(link)
            //to show results to html page
            article.appendChild(image)
            article.appendChild(joke)
            target.appendChild(article)
        }
    } catch (error) {
        console.log(error.message)
    }
})