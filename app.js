//TV Show search APP
const form = document.querySelector('#searchForm');
const mainContent = document.querySelector('#mainContent');


form.addEventListener('click', async function search(e) {
    e.preventDefault();
    //Will give us the input value typed into the form
    try {
        const searchTerm = form.elements.query.value; //Extract the input entered into the search field
        const config = { params: { q: searchTerm } }
        const result = await axios.get(`http://api.tvmaze.com/search/shows`, config); //Make API request to tvmaze with users input
        makeImages(result.data); //Pass our API response data to our function to generate content on page for user
        form.elements.query.value = '';
    } catch (err) {
        console.log(err);
    }
})

const makeImages = (shows) => {
    for (let result of shows) {
        const newDiv = document.createElement('div');
        const label = document.createElement('span');
        if (result.show.image && result.score) {
            const img = document.createElement('IMG'); //Make new img
            img.src = result.show.image.medium; //Set its src
            newDiv.appendChild(img); //Append img to our newDiv
            label.innerText = ((result.score * 100).toFixed(2) + '/100');
            newDiv.appendChild(label); //Adds the span to the newDiv
            newDiv.classList.add('movieBackground');
            mainContent.appendChild(newDiv);
            if ((result.score * 100).toFixed(2) > 70) {
                label.classList.add('goodScore');

            } else if ((result.score * 100).toFixed(2) < 50) {
                label.classList.add('badScore');
            }
        }
    }
    for (let elem of shows) {
        document.body.parentNode.removeChild(elem);
    }
}