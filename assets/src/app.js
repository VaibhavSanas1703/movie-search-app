// API
const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=991b3bbe638c4e2083f71c4d4a5dacf2&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

let movieContainer = document.querySelector('.movie-container');
let searchBtn = document.querySelector('#search-btn');
let searchInput = document.querySelector('#search-input');
let navbar = document.querySelector('header');

// document.addEventListener('scroll',() => {
//      if(window.scrollY > 20){
//           navbar.classList.add('active-nav')
//      }
//      else{
//           navbar.classList.remove('active-nav')
//      }
// })

const getMovies = async (API) => {
     try {
          const res = await fetch(API);
          const data = await res.json()
          let moviedata = '';
          console.log(data);

          if(data.results.length == 0){
               setTimeout(() => {
                    alert('Movie is not found')
               }, 500);
               return getMovies(APIURL);
          }

          data.results.forEach((movie) => {
               const imagePath = movie.poster_path === null ? "img/image-missing.png" : IMGPATH + movie.poster_path;
               moviedata += `
               <div class='movie-cards'>
               <img src=${imagePath}>
               <h2>${movie.title}</h2>
                 <p><b>Release Year : </b> ${movie.release_date}</p>
               <div class='rate flex'>
                <h3>${Math.floor(movie.vote_average)}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
               </div>
               <p id='over'><b>Overview : </b> ${movie.overview.substr(0,170)}....</p>
               </div>
               `
          })
          movieContainer.innerHTML = moviedata;
     } 
     catch (error) {
          alert('Server is not Respond')
     }
}

searchBtn.addEventListener("click",() => {
     if (searchInput.value != "") {
          getMovies(SEARCHAPI + searchInput.value)
          searchInput.value = ''
      } else {
          getMovies(APIURL);
      }
})

searchInput.addEventListener('keyup',(event) => {
     if (event.target.value != "") {
          getMovies(SEARCHAPI + event.target.value)
      } else {
          getMovies(APIURL);
      }
})

document.addEventListener('keydown',(event) => {
     if(event.key == 'Enter'){
          searchBtn.click()
     }
})

document.addEventListener('DOMContentLoaded',() => {
     getMovies(APIURL)
})