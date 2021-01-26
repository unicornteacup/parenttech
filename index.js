const express = require('express')
const path = require('path')
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const morgan     = require('morgan');
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(morgan('dev'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use("/stylesheets", sass({
  src: __dirname + "/stylesheets",
  dest: __dirname + "/public/stylesheets",
  debug: true,
  outputStyle: 'expanded'
  }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/about', (req, res) => {
    console.log('getting about')
    res.render('pages/about');
  })
  
  .get("/directory", (req, res) => {
    console.log("getting directory")
    res.render("pages/directory");
  })
  
  .get("/joinus", (req, res) => {
    console.log("join us")
    res.render("pages/joinus");
  })
  .get('/meetus', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM companies');
      const results = { 'company': (result) ? result.rows : null};
      res.render('pages/meetus', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});