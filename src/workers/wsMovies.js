
export let wsMovies = {
    templateMovie (img, title, id) {
        return `
        <div id="movie" data-name=${id}>
            <img src=${img}>
            <p>${title}</p>
        </div>
        `
    },
    renderStats(div, state,...inf) {
         for(let t = 0; t < div.length; ++t) div[t].innerHTML = inf[t]
         return !state
    },

    viewContentForMovie(div, key, info, img, url) {
        let state = false 
        return new Promise((resolve, reject) => {
            div.forEach(cap => {
                 cap.addEventListener('click', async e => {
                     let id = !e.target.dataset.name ? e.target.parentNode.dataset.name : e.target.dataset.name; 
                     let ms = await this.getInfoForId(id, key)
                     img.src =`${url}${ms.poster_path}`
                     let res = this.renderStats(info, state, ms.overview,ms.popularity, ms.tagline, ms.release_date) 
                     res ? resolve(res) : reject('No se ejecuto la funcion')   
                })
             })
        })
},

    async render_movie(value, key, url) {
         let constructionHTML = '';
         let movies = await this.getInfoForName(value, key)
         for(let movie = 0; movie < movies.length; movie++){
             if(!movies[movie].poster_path) continue
             else { 
                constructionHTML += this.templateMovie(`${url}${movies[movie].poster_path}`, movies[movie].title, movies[movie].id)
            }
         }
         return constructionHTML
},

    async getInfoForId(id ,KEY) {
        let send = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}`);
        let movie_specific = await send.json()
        return movie_specific
    },

    async getInfoForName(NAME, KEY) {
        let send = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${NAME}`);
        let res = await send.json()
        return [...res.results]
    }
}

self.addEventListener('message', async e => {
    let res = await wsMovies.render_movie(e.data.input, e.data.KEY, e.data.url)
    postMessage(res)
})