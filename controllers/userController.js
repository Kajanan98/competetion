const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const homeService = require("../services/homeService");
const userService = require("../services/userService");

router.get("/signin",redirectHome, async (req, res) => {
  res.render("signin.ejs", { message: "" });
});

router.post("/signin",redirectHome, async (req, res) => {
  homeService
    .signInUser(req.body.email, req.body.password)
    .then((user) => {
        req.session.userId = user.id;
        res.redirect("/user/home");
    })
    .catch((error) => {
      console.log(error);
      res.render("signin.ejs", { message: error });
    });
});

router.get("/signup",redirectHome, async (req, res) => {
  res.render("signup.ejs", { message: "" });
});

router.post("/signup",redirectHome, async (req, res) => {
  userService
    .signUpUser(
      req.body.name,
      req.body.email,
      req.body.passwordOne,
      req.body.passwordTwo
    )
    .then((data) => {
      res.redirect("/");
    })
    .catch((data) => {
      res.render("signup.ejs", { message: data.error });
    });
});

/*****************************/
function isAuth(req, res, next) {
  if(req.session.userId){
    next()
  }
  else{
    res.redirect('/user/signin')
  }
}

function redirectHome(req, res, next) {
  if(req.session.userId){
    res.redirect('/user/home')
  }
  else{
    next()
  }
}

router.get("/guest", async (req, res) => {
  res.render("guest-signin.ejs", { message: "" });
});

/************************************/

router.get("/home",isAuth, async (req, res) => {
  const userId = req.session.userId;
  if (userId == null) {
    res.redirect("/");
  } else {
    homeService
      .getUserSpecificDetailsWithId(userId)
      .then((data) => {
        res.render("home.ejs", {
          userName: data.user.name,
          userId: data.user.id,
          courses: data.userCourses,
          recentCourses: data.recentCourses, //TODO
        });
      })
      .catch((error) => {
        res.render("error.ejs", { message: error });
      });
  }
});



router.post("/signout", async (req, res) => {
  // req.session.userId = null;
  // res.status(200).clearCookie('connect.sid');
  req.session.destroy((error)=>{
    if (error) throw error;
    res.redirect("/");
  });
});

module.exports = router;
