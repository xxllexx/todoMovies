const express = require('express');
const app = express();
const tmdbKey = '';
const MovieDB = require('moviedb')(tmdbKey);

app.get('/movielist', (req, res) => {
    MovieDB.discoverMovie({page: parseInt(req.query.page)}, (err, result) => {
        if (!err) {
            res.json(result);
        } else {
            res.json({
                success: false,
                error: err
            })
        }
    });
});

app.get('/search', (req, res) => {
    MovieDB.searchMovie({
        query: req.query.searchText,
        page: parseInt(req.query.page)
    }, (err, result) => {
        if (!err) {
            res.json(result);
        } else {
            res.json({
                success: false,
                error: err
            })
        }
    });
});

app.get('/movie/:id', (req, res) => {
    Promise.all([
        new Promise((resolve, reject) => {
            MovieDB.movieImages({ id: req.params.id}, (err, result) => {
                if (!err) {
                    resolve({images: result});
                } else {
                    reject(err);
                }
            });
        }),
        new Promise((resolve, reject) => {
            MovieDB.movieInfo({ id: req.params.id}, (err, result) => {
                if (!err) {
                    resolve({info: result});
                } else {
                    reject(err);
                }
            });
        })
    ]).then(([first, second]) => {
        res.json({
            ...first,
            ...second
        });    
    }).catch((err) => {
        res.json({
            success: false,
            error: err
        })
    })
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))