const session = require("supertest-session");
process.env.NODE_ENV = "test";

function authenticateTestSession(testSession) {
  return new Promise((resolve, reject) => {
    testSession
      .post("/user/signin")
      .send({ email: "abby@hacktitude.io", password: "test" })
      .expect(302)
      .end(function (err) {
        if (err) reject(err);
        resolve(testSession);
      });
  });
}

function resetDatabase(_db) {
  return new Promise(async (resolve, reject) => {
    try {
      await _db.migrate.latest().then(async () => await _db.seed.run());
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

function createSuperTestSession(app) {
    return session(app);
}


module.exports = {
  authenticateTestSession,
  resetDatabase,
  createSuperTestSession,
};
