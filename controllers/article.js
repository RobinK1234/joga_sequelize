const con = require('../utils/db')

const getAllArticles = (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', {
            articles: articles
        })
    })
}
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