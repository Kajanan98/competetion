
exports.seed = function (knex) {
  return knex('userCourses').del()
    .then(function () {
      return knex('userCourses').insert([
        { uid: 1, cid: 1, score: 10 },
        { uid: 1, cid: 4, score: -1 },
        { uid: 5, cid: 1, score: -1 },
        { uid: 5, cid: 3, score: -1 },
        { uid: 5, cid: 4, score: -1 }
      ]);
    });
};
