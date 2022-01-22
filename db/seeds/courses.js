exports.seed = function (knex) {
  return knex("courses")
    .del()
    .then(function () {
      return knex("courses").insert([
        {
          id: 1,
          title: "Javascript",
          level: "Beginner",
          description:
            "This is a sample description for the Course. This will have everything about the course for people to read and get to know more about the courses that they would like to follow",
          duration: "20 hours",
        },
        {
          id: 2,
          title: "DotNET Basics",
          level: "Beginner",
          description:
            "This is a sample description for the Course. This will have everything about the course for people to read and get to know more about the courses that they would like to follow",
          duration: "20 hours",
        },
        {
          id: 3,
          title: "OOP Concepts",
          level: "Intermediate",
          description:
            "This is a sample description for the Course. This will have everything about the course for people to read and get to know more about the courses that they would like to follow",
          duration: "20 hours",
        },
        {
          id: 4,
          title: "AWS Lambda",
          level: "Advanced",
          description:
            "This is a sample description for the Course. This will have everything about the course for people to read and get to know more about the courses that they would like to follow",
          duration: "3 weeks",
        },
        {
          id: 5,
          title: "NodeJS",
          level: "Intermediate",
          description:
            "This is a sample description for the Course. This will have everything about the course for people to read and get to know more about the courses that they would like to follow",
          duration: "20 hours",
        },
        {
          id: 6,
          title: "MongoDB",
          level: "Beginner",
          description:
            "This is a sample description for the Course. This will have everything about the course for people to read and get to know more about the courses that they would like to follow",
          duration: "20 hours",
        },
      ]);
    });
};
