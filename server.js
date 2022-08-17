const express = require('express');
const mongoose = require('mongoose');
const Articles = require('./models/article');
const articlesRouter = require('./routes/articles');
const app = express();

mongoose
    .connect("mongodb://127.0.0.1:27017/blog", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log("Error", err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded());
app.use('/articles', articlesRouter);

app.get('/', async (req, res) => {
    const articles = await Articles.find({});
    res.render('index', { articles: articles });
})

app.listen(8000);

