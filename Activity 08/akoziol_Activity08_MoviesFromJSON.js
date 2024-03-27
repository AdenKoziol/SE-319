/*
Author: Aden Koziol
ISU Netid : akoziol@iastate.edu
Date : February 15th, 2024
*/
fetch("./akoziol_Activity08_MoviesFromJSON.json")
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies));

function loadMovies(myMovies) {
    var mainContainer = document.getElementById("goodmovies");
    for(var i = 0; i < myMovies.movies.length; i++)
    {
        let div = document.createElement("div");
        div.innerHTML = `<br>
        <h1>${myMovies.movies[i].title}</h1>
        <p>${myMovies.movies[i].year}</p>
        <img src="${myMovies.movies[i].url}"></img>`;
        mainContainer.appendChild(div);
    }
}

