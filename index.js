const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

app.set('view engine', 'njk')
app.use(express.urlencoded({extend: false}))

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
})

const checkAgeQueryParams = (req, res, next) => {
    const {age} = req.query

    if(!age) {
        return res.redirect('/')
    }

    return next()
}

app.get('/', (req, res) => {
    res.render('login')
})

app.post('/check', (req, res) => {
    const {age} = req.body
    
    if(age >= 18) {
        return res.redirect(`/major?age=${age}`)
    } else {
        return res.redirect(`/minor?age=${age}`)
    }
})

app.get('/major', checkAgeQueryParams, (req, res) => {
    res.send(`Você é maior de idade e possui ${req.query.age}`)
})

app.get('/minor', checkAgeQueryParams, (req, res) => {
    res.send(`Você é menor de idade e possui ${req.query.age}`)
})

app.listen(3000, (err) => {
    if(err) throw err
})
