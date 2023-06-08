const express = require('express');

const app = express();
const port = 1500;

// parse JSON using express
app.use(express.json());
app.use(express.urlencoded({extended: false}))

let movies = [
    {
        id: "1",
        title: "Alchemy of Soul",
        release_date: "20-8-3"
    }, {
        id: "2",
        title: "Prince of parser",
        release_date: "20-5-16"
    },
    {
        id: "3",
        title: "Queen of Lagos",
        release_date: "20-5-23"
    }
]

// get all movies list in the form of json
app.get('/', (req,res) => {
    res.json(movies)
})


// add movie to the list
app.post('/movie', (req,res) => {
    const movie = req.body;

    console.log(movie);
    movies.push(movie);
    res.send("Movie is added to the list")
});

// search for a movie in the list
app.get('/movie/:id', (req,res) => {
    const id = req.params.id

    for(let movie of movies){
        if(movie.id === id){
            res.json(movie)
            console.log(movie);
            return;
        }
    }
    res.status(404).send("movie not found")
})

// Remove movie from the list
app.delete('/movie/:id', (req,res) => {
    const id = req.params.id

    movies = movies.filter((movie) => {
        if(movie.id !== id) {
            return true;
        }
        return false;
    })
    res.send("Movie is deleted")
})
// set the server to listen at a port
app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})