import { wsMovies } from "../workers/wsMovies.js";

const KEY = '46fc9348b3355084d1313b0676ab21d5';
const urlPosts = 'https://image.tmdb.org/t/p/w500/'
let input = document.querySelector('input');
let btnSearch = document.querySelector('button')
let img = document.querySelector('img')
let container_movies = document.querySelector('.movies')
let texting = document.querySelectorAll('#text')

export default {
    data: {btnSearch},

    clearCamps (div, content)  {div.innerHTML = content},

    render_movie() {
        let ws = new Worker('src/workers/wsMovies.js', {type:'module'})
        ws.postMessage({input: input.value, KEY, url: urlPosts})
        ws.addEventListener('message', async r => {
            let movies =  r.data;
            this.clearCamps(container_movies, '')
            this.clearCamps(container_movies, movies)
            let res = await wsMovies.viewContentForMovie(document.querySelectorAll('#movie'),KEY ,texting, img, urlPosts)
            res ? this.clearCamps(container_movies, '') : res
            ws.terminate()
        })
    },

    startApp(btn) {
        btn.addEventListener('click' , () => this.render_movie())
    }
}