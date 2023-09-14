const Article = require('../models/article.model')

//show all articles using models
const getAllArticles = (req, res) => {
    Article.getAll((err,data) => {
        if (err) {
            res.status(500).send({
                message : err.message || 'Big error go boom'
            })
        } else {
            console.log(data)
            res.render('index', {
                articles:data
            })
        }
    })
}

//show article by slug
const getArticlesBySlug = (req, res) => {
    Article.getBySlug(req.params.slug, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || 'Big error whilst retrieving article data'
            })
        } else {
            console.log(data)
            res.render('article', {
                article: data
            })
        }
    })
};

module.exports = {
    getAllArticles,
    getArticlesBySlug
}