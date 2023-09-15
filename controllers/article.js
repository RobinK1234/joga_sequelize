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

const createNewArticle = (req, res) => {
    // new article from POST data (example from form)
    console.log('new article')

    const newArticle = new Article({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        body: req.body.body,
        published: new Date().toISOString().slice(0, 19).replace('T', ' '),
        author_id: req.body.author_id
    })


    Article.createNew(newArticle, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occured sending article data'
            })
        } else {
            console.log(data)
            res.send(data)
        }
    })
}
// export controller functions
module.exports = {
    getAllArticles,
    getArticlesBySlug,
    createNewArticle,
};