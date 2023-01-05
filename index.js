const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const path = require('path')
const hbs = require('express-handlebars');
app.set('views', path.join(__dirname,'views'))
app.set('view engine','hbs')
app.engine('hbs', hbs.engine({
    extname:'hbs',
    defaultlayout: 'main',
    layoutsDir: __dirname +'/views/layouts'
}))

app.use(express.static(path.join(__dirname,'/public/')))

app.listen(3003, () => {
    console.log('web server is started')
})

const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

});

app.get('/',(req, res) => {
    let sql = "SELECT * FROM article"
    con.query(sql, (err,result)=> {
        if(err) throw err;
        console.log(result)
        res.render('index', {
            articles: result
        })
    })

})

app.get('/article/:slug', (req, res) => {
    const slug = req.params.slug;

    const sql = `SELECT * FROM article WHERE slug = ${mysql.escape(slug)}`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        const article = result[0];

        res.render('article', { article });
    });
});


