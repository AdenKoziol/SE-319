/*
Author: Aden Koziol
ISU Netid : akoziol@iastate.edu
Date : February 23, 2024
*/

let myMovies;


fetch("./akoziol_Activity08_MoviesFromJSON.json")
    .then(response => response.json())
    .then(data => {myMovies = data;});

function loadMovies(myMovies, inputMovieName) 
{
    var mainContainer = document.getElementById("goodmovies");
    mainContainer.innerHTML = "";
    for(var i = 0; i < myMovies.movies.length; i++)
    {
        if(myMovies.movies[i].title === inputMovieName)
        {
            let div = document.createElement("div");
            div.innerHTML = `<br>
            <h1>${myMovies.movies[i].title}</h1>
            <p>${myMovies.movies[i].year}</p>
            <img src="${myMovies.movies[i].url}"></img>`;
            mainContainer.appendChild(div);
        }
    }
}

function getInputValue() 
{
    let movieNameInput = document.forms["my_form"]["inputMovieName"];
    let inputMovieName = movieNameInput.value;
    loadMovies(myMovies, inputMovieName);
}