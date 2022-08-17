const express = require('express');
const Article = require('../models/article');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Articles List')
})

router.get('/new', (req, res) => {
    res.render('articles/new')
})
router.post('/new', async (req, res) => {
    console.log(req.body.title);
    const article = new Article({
        title: req.body.title,
        text: req.body.content,
        author: req.body.author,
    })
    await article.save();
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', { article });
})
router.post('/edit/:id', async (req, res) => {
    console.log(req.params.id);
    const article = await Article.updateOne({ _id: req.params.id },{ $set: { title : req.body.title, text: req.body.content,author: req.body.author,} });
    res.redirect('/');
});

router.get("/:id", async (req, res) => {
    // console.log(req.params.id);
    const article = await Article.findById(req.params.id);
    res.render("articles/detail", { article });
})
router.get("/delete/:id", async (req, res) => {
    // console.log(req.params.id);
    const article = await Article.deleteOne({ _id: req.params.id });
    res.redirect('/');
})

module.exports = router;