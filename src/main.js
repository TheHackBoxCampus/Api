const KEY = '46fc9348b3355084d1313b0676ab21d5';
const urlPosts = 'https://image.tmdb.org/t/p/w500/'
let input = document.querySelector('input');
let btnSearch = document.querySelector('button')
let img = document.querySelector('img')

const getInfo = async ( ) => {
    let movies = []
    let send = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`);
    let res = await send.json()
    movies = [...res.results]
    return movies
}

const searchMovie = () => {
    getInfo().then(res => {
        console.log(res)
        for(let x = 0; x < res.length; x++) 
            res[x].title == input.value ? 
            img.src = `${urlPosts}${res[x].poster_path.replace('/','')}` : 
            console.log('no tiene referencia')
    })
}

btnSearch.addEventListener('click' , e => searchMovie())


    