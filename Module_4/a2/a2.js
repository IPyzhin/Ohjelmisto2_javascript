const form = document.querySelector('#form')
const status = document.querySelector('#status')
form.addEventListener('submit', async function(evt) {
    evt.preventDefault()
    const query = document.querySelector('input[name=q]').value.trim()
    try {
        status.textContent = `Start searching for: "${query}"`
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
        const jsonData = await response.json()
        //just json dump to console
        console.log(jsonData)
        //to show results to html page
        document.querySelector('#result').textContent = JSON.stringify(jsonData,null,1)
        status.textContent = `Search is done. ${jsonData.length} results found.`
    } catch (error) {
        console.log(error.message)
    }
})