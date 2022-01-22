/**
 * This comment is required for the VS Code Jest Plugin to work.
 * @jest-environment jsdom
 */

const app = require("../server");
const db = require("../db/db-config");
const testBase = require("./testBase");

var testSession = null;

/**
 * Create a super test session and initiate the database before running tests.
 */
beforeAll(async () => {
  testSession = testBase.createSuperTestSession(app);
  await testBase.resetDatabase(db);
});

/**
 * Reset the database after every test case
 */
afterEach(async () => {
  await testBase.resetDatabase(db);
});

/**
 * Take down the app once test execution is done
 */
afterAll((done) => {
  app.close(done);
});

describe("Pre authentication tasks", () => {
  test("Challenge 0.a - Wrong password do not expose too much information", async () => {
    const res = await testSession
      .post("/user/signin")
      .send({ email: "abby@hacktitude.io", password: "wrong_password" })
      .expect(200);
    expect(res.text.includes("Password Mismatch")).toBe(false);
    expect(res.text.includes("User authentication failed")).toBe(true);
  });

  test("Challenge 0.a - User not found do not expose too much information", async () => {
    const res = await testSession
      .post("/user/signin")
      .send({ email: "notexisting@user.com", password: "some_password" })
      .expect(200);
    expect(res.text.includes("User Not Found")).toBe(false);
    expect(res.text.includes("User authentication failed")).toBe(true);
  });
});

describe("Post authentication tasks", () => {
  var authenticatedSession = null;
  beforeAll(() =>
    testBase.authenticateTestSession(testSession).then((session) => {
      authenticatedSession = session;
    })
  );

  test("Challenge 0.b - Homepage should show only 4 popular courses", async () => {
    const res = await authenticatedSession.get("/user/home");
    expect(res.status).toBe(200);
    document.documentElement.innerHTML = res.text;
    expect(document.getElementById("home_recent").children.length).toBe(4);
  });

  test("Challenge 0.c - New duration column added to courses table", async () => {
    let hasColumn = await db.schema.hasColumn("courses", "duration");
    expect(hasColumn).toBe(true);
  });

  test("Challenge 0.c - Course dashboard shows course duration", async () => {
    let hasColumn = await db.schema.hasColumn("courses", "duration");
    expect(hasColumn).toBe(true);
    // change DB duration
    let courseDuration = "50 mins";
    await db("courses").update({ duration: courseDuration }).where("id", "1");

    //check if duration appears
    const res = await authenticatedSession.get(
      "/course/dashboard?courseId=1"
    );
    expect(res.status).toBe(200);
    document.documentElement.innerHTML = res.text;
    expect(document.getElementById("course-duration").innerHTML).toBe(
      courseDuration
    );
  });
});
