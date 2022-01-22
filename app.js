const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const router = express.Router();

app.set('view-engine', 'ejs')
app.use(express.static('public'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

const user = require('./controllers/userController');
const course = require('./controllers/courseController');

app.use(session({
  secret: 'secretvalue',
  resave: false,
  saveUninitialized: false
}))

function isAuth(req, res, next) {
  if(req.session.userId){
    next()
  }
  else{
    res.redirect('/user/signin')
  }
}

app.use('/', router);
app.use('/user', user);
app.use('/course',isAuth, course);

router.get("/guest", async (req, res) => {
  res.render("guest-signin.ejs", { message: "" });
});

router.get('/', (req, res) => {
  res.redirect('/user/signin')
});

module.exports = app;