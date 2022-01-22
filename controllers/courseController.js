const express = require("express");
const router = express.Router();
const courseService = require("../services/courseService");



router.get("/allcourses", async (req, res) => {
  const userId = req.query.userId;
  req.session.userId = userId;
  const courses = await courseService.allCourses(userId);
  res.render(
    "all-courses.ejs",
    { allcourses: courses, userId: userId },
    (error, ejs) => {
      if (error) {
        console.log(error);
        res.render("error.ejs", { message: "EJS" });
      } else {
        res.send(ejs);
      }
    }
  );
});

router.get("/enrolled", async (req, res) => {
  const userId = req.query.userId;
  const userCourses = await courseService.userCourses(userId);
  res.render(
    "enrolled.ejs",
    { courses: userCourses, userId: userId },
    (error, ejs) => {
      if (error) {
        console.log(error);
        res.render("error.ejs", { message: "EJS" });
      } else {
        res.send(ejs);
      }
    }
  );
});

router.post("/search", async (req, res) => {
  const userId = req.session.userId;
  const searchVal = req.body.searchVal;
  courseService
    .searchedCourses(userId, searchVal)
    .then((data) => {
      res.render(
        "all-courses.ejs",
        { allcourses: data, userId: userId },
        (error, ejs) => {
          if (error) {
            console.log(error);
            res.render("error.ejs", { message: "EJS" });
          } else {
            res.send(ejs);
          }
        }
      );
    })
    .catch((error) => {
      console.log(error);
      res.render("error.ejs", { message: "Server" });
    });
});

router.get("/sort", async (req, res) => {
  const userId = req.session.userId;
  const Criteria = req.query.criteria;
  courseService
    .sortedCourses(userId, Criteria)
    .then((data) => {
      res.render(
        "all-courses.ejs",
        { allcourses: data, userId: userId },
        (error, ejs) => {
          if (error) {
            console.log(error);
            res.render("error.ejs", { message: "EJS" });
          } else {
            res.send(ejs);
          }
        }
      );
    })
    .catch((error) => {
      console.log(error);
      res.render("error.ejs", { message: "Server" });
    });
});

router.get("/dashboard", async (req, res) => {
  const userId = req.session.userId;
  const courseId = req.query.courseId;
  const courseDetails = await courseService.courseDetails(userId, courseId);
  // const books = await courseService.suggestedCourseBooks(courseDetails.row.title);
  const books = await courseService.suggestedCourseBooks(courseDetails.course.title);
  console.log(books);
  res.render(
    "course-dashboard.ejs",
    {
      title: courseDetails.course.title,
      level: courseDetails.course.level,
      description: courseDetails.course.description,
      duration: courseDetails.course.duration,
      id: courseDetails.course.id,
      back: "req.query.paramB",
      registered: courseDetails.registered,
      // books: "books",
      books: books,
    },
    (error, ejs) => {
      if (error) {
        console.log(error);
        res.render("error.ejs", { message: "EJS" });
      } else {
        res.send(ejs);
      }
    }
  );
});

router.get("/dashboard", async (req, res) => {
  const userId = req.session.userId;
  const courseId = req.query.courseId;
  const courseDetails = await courseService.courseDetails(userId, courseId);
  console.log(courseDetails);
  // const books = await courseService.suggestedCourseBooks(courseDetails.row.title);
  res.render(
    "course-dashboard.ejs",
    {
      title: courseDetails.course.title,
      level: courseDetails.course.level,
      description: courseDetails.course.description,
      id: courseDetails.course.id,
      back: "req.query.paramB",
      duration: courseDetails.course.duration,
      registered: courseDetails.registered,
      books: "books",
    },
    (error, ejs) => {
      if (error) {
        console.log(error);
        res.render("error.ejs", { message: "EJS" });
      } else {
        res.send(ejs);
      }
    }
  );
});

router.get("/enroll", async (req, res) => {
  const userId = req.session.userId;
  const courseId = req.query.courseId;
  await courseService.courseEnroll(userId, courseId);
  const userCourses = await courseService.userCourses(userId);
  res.render(
    "enrolled.ejs",
    { courses: userCourses, userId: userId },
    (error, ejs) => {
      if (error) {
        console.log(error);
        res.render("error.ejs", { message: "EJS" });
      } else {
        res.send(ejs);
      }
    }
  );
});

router.get("/coursePage", async (req, res) => {
  const courseId = req.query.courseId;
  const courseContent = await courseService.courseContentDetails(courseId);
  res.render(
    "course-page.ejs",
    {
      chapters: courseContent.chapters,
      title: courseContent.course.title,
      level: courseContent.course.level,
      description: courseContent.course.description,
      id: courseContent.course.id,
      back: "req.query.paramB",
    },
    (error, ejs) => {
      if (error) {
        console.log(error);
        res.render("error.ejs", { message: "EJS" });
      } else {
        res.send(ejs);
      }
    }
  );
});

router.get("/reset", async (req, res) => {
  const userId = req.session.userId;
  await courseService.resetCourses(userId);
  const userCourses = await courseService.userCourses(userId);
  res.render(
    "enrolled.ejs",
    { courses: userCourses, userId: userId },
    (error, ejs) => {
      if (error) {
        console.log(error);
        res.render("error.ejs", { message: "EJS" });
      } else {
        res.send(ejs);
      }
    }
  );
});

router.get("/mcq/:id", async (req, res) => {
  const courseId = req.params.id;
  const courseMcq = await courseService.courseMcq(courseId);
  res.render(
    "MCQ.ejs",
    { que: courseMcq.questions, answer: courseMcq.answers, id: courseId },
    (error, ejs) => {
      if (error) {
        console.log(error);
        res.render("error.ejs", { message: "EJS" });
      } else {
        res.send(ejs);
      }
    }
  );
});

router.post("/scores/:id", async (req, res) => {
  const courseId = req.params.id;
  const userId = req.session.userId;
  const ans1 = req.body.q0_answer;
  const ans2 = req.body.q1_answer;
  const ans3 = req.body.q2_answer;
  const courseScore = await courseService.courseScore(
    courseId,
    userId,
    ans1,
    ans2,
    ans3
  );
  console.log(courseScore);
  res.render("Scores.ejs", { score: courseScore }, (error, ejs) => {
    if (error) {
      console.log(error);
      res.render("error.ejs", { message: "EJS" });
    } else {
      res.send(ejs);
    }
  });
});

module.exports = router;
