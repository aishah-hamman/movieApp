
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9a1f47dbf70edc11e9111febfbe14a9e&page=1'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=9a1f47dbf70edc11e9111febfbe14a9e&query="'

const form= document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

//get inital movies


getMovies(API_URL)

async function getMovies(url){
    const res = await fetch(url) //going to do something else, let me know when fetch url is complete
    const data = await res.json() // Again, the await keyword is used to wait until the JSON parsing is finished.
    showMovies(data.results)
}



//In the same way, when you use await in an asynchronous function, it's like saying, "I'm going to do something else while waiting for this specific task (Promise) to finish. Let me know when it's done, so I can continue with the next steps."

//The fetch function is asynchronous and returns a Promise representing the completion or failure of the network request.

//The fetch function and the json method both return Promises. The await keyword is used to wait for these Promises to be resolved before moving on to the next line of code. 



function showMovies(movies){
    main.innerHTML = ''

    movies.forEach((movie)=>{
        const {title, poster_path, vote_average, overview} = movie
        
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        
        
        <img src=" ${IMG_PATH + poster_path} " alt="${title}">

        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
           ${overview}
        </div>
    

    `

    main.append(movieEl)

    function getClassByRate(vote){
        if(vote>=8){
            return 'green'
        } else if (vote >= 5){
            return 'orange'
        } else {
            return 'red'
        }
    }
       
        

    })
}














form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm && searchTerm!==''){
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    }

    else{
        window.location.reload()  //reload page
    }
})


