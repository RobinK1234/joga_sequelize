const con = require('../models/article.model')

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
    let query = `select a.*,
                        au.name as author,
                        au.id   as author_id
                 from article a,
                      author au
                 where slug = "${req.params.slug}"
                   and a.author_id = au.id`
    let article
    con.query(query, (err, result) => {
        if (err) throw err
        article = result
        res.render('article', {
            article: article
        })
    })
}

module.exports = {
    getAllArticles,
    getArticlesBySlug
}