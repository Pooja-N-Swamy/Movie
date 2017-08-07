$(document).ready(function(){
    
   $('#SearchMovie').submit(function(e){
       e.preventDefault();
       var searchTitle = $('#searchTitle').val();
       searchMovie(searchTitle);
       
   });
});

function searchMovie(searchTitle){
    
    axios.get('http://www.omdbapi.com/?s='+searchTitle+'&apikey=thewdb')
        .then(function(response) {
            var movies = response.data.Search;
            var output = '';
            $.each(movies, function(index,movie){
               output +=   `
                <div class="col-md-3">
                    <div class= "well text-center">
                        <img src= "${movie.Poster}" alt="Img">
                        <h5>${movie.Title}</h5>
                        <a onclick = "movieSelected('${movie.imdbID}')" class="btn btn-primary" href='#'>Movie Deatails</a>
                    </div>
                </div>
            `;
            });
            $('#movies').html(output);
    })//then
        .catch(function(error){
            console.log(error);
    });//catch
}

function movieSelected(movieID){
    sessionStorage.setItem('Id', movieID);
    window.location ='movie.html';
    return false;
}

function getMovie(){
    var movieId = sessionStorage.getItem('Id');
        
    axios.get('http://www.omdbapi.com/?i='+movieId+'&apikey=thewdb')
        .then(function(response) {
          var movie = response.data;
        console.log(movie);
        var output =  `
        <div class="row">
            <div class= "col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class= "col-md-8">
                <h1>${movie.Title}</h1>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre</strong>: ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released</strong>: ${movie.Released}</li>
                    <li class="list-group-item"><strong>imdbRating</strong>: ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director</strong>: ${movie.Director}</li>
                    <li class="list-group-item"><strong>Actors</strong>: ${movie.Actors}</li>
                </ul>
            </div>
        </div>
        <hr>
        <div class='row'>
            <div class"well">
                <h3>Plot</h3>
                ${movie.Plot}
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View Imdb Page</a>
                <a href="index.html" class="btn btn-warning">Go Back to search</a>
            </div>
        </div>
        `;
        $('#movie').html(output);
    })//then
        .catch(function(error){
            console.log(error);
    });//catch
    
}
