
exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex("users").insert([
        {
          id: 1,
          name: "Allie Grater",
          email: "allie@hacktitude.io",
          password:
            "$2b$10$Ix6ceI.HcuGal9MqUE6Whu4UNF.OZWo0Ix3imeTP5UhhCeeZbDf5K",
        },
        {
          id: 3,
          name: "Rose Bush",
          email: "rose@hacktitude.io",
          password:
            "$2b$10$uQURixWfKPXw4pDRR3qYyuriwSPhDg7bxY1s1OaW1YLOGZDO8kl3G",
        },
        {
          id: 4,
          name: "Art Decco",
          email: "art@hacktitude.io",
          password:
            "$2b$10$c7.LcW7fBNm4a.m2LoOd9OmjVujAN/Be24Sl6kfvEjRhLtH.9XRs.",
        },
        {
          id: 5,
          name: "Mary Krismass",
          email: "mary@hacktitude.io",
          password:
            "$2b$10$tKX4ZdbzOsiD4UEYiydsbuoF0sxHBqJu.ZYu3QTqs6gW/pQuh9d.i",
        },
        {
          id: 8,
          name: "Abby Normal",
          email: "abby@hacktitude.io",
          password:
            "$2b$10$rasDTA8GXxETrxPpaOz3Quplu/CguxF71/.gxTQ5vK3jNnYJjOEuK",
        },
      ]);
    });
};
