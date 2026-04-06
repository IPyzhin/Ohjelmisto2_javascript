const form = document.querySelector('#form')
const status = document.querySelector('#status')
const target = document.getElementById('results')
form.addEventListener('submit', async function(evt) {
    evt.preventDefault()
    const query = document.querySelector('input[name=q]').value.trim()
    try {
        status.textContent = `Start searching for: "${query}"`
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
        const jsonData = await response.json()
        console.log(jsonData)
        status.textContent = `Search is done. ${jsonData.length} results found.`
        //to show results to html page
        document.getElementById("results").innerHTML = ''
        for (let i = 0; i <jsonData.length; i++) {
            //article
            let article = document.createElement("article")
            let title = document.createElement("h2")
            title.textContent = jsonData[i].show.name
            article.appendChild(title)
            //img
            let img = document.createElement('img')
            img.alt = jsonData[i].show.name
            img.src = jsonData[i].show.image
                ? jsonData[i].show.image.medium
                : 'https://placehold.co/210x295?text=Not%20Found'
            img.style.display = 'block'
               //url
            let link = document.createElement("a")
            link.href = `${jsonData[i].show.url}`
            link.target = "_blank"
            link.innerText = jsonData[i].show.url
            link.style.display = 'block'
            link.style.marginTop = '8px'
            //summary
            let summary = document.createElement('div')
            summary.innerHTML = jsonData[i].show.summary || "Summary not available."
            article.appendChild(img)
            article.appendChild(link)
            article.appendChild(summary)
            target.appendChild(article)
        }

    } catch (error) {
        console.log(error.message)
    }
})