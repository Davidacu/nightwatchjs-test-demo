const knexFactory = require("knex");
const { join } = require("path");

module.exports = function cleanDatabase() {
  console.log("cleaning db...");

  const filename = join(
    __dirname,
    "..",
    "app-server",
    "conduit-backend-submodule",
    ".tmp.db"
  );
  const knex = knexFactory({
    client: "sqlite3",
    connection: {
      filename,
    },
    useNullAsDefault: true,
  });

  const onError = (err) =>
    err.toString().includes("no such table") ? null : Promise.reject(err);
  /*
  let query = "SELECT name AS table_name FROM sqlite_master WHERE type='table'";
  knex
    .raw(query)
    .then(function (results) {
      console.log(results.map((row) => row.table_name));
    })
    .catch(function (error) {
      console.log(error);
    });
*/
  return Promise.all([
    knex
      .truncate("Users")
      .catch((err) =>
        err.toString().includes("no such table")
          ? undefined
          : Promise.reject(err)
      ),
    knex
      .truncate("Articles")
      .catch((err) =>
        err.toString().includes("no such table")
          ? undefined
          : Promise.reject(err)
      ),
    knex
      .truncate("ArticleTags")
      .catch((err) =>
        err.toString().includes("no such table")
          ? undefined
          : Promise.reject(err)
      ),
    knex
      .truncate("Tags")
      .catch((err) =>
        err.toString().includes("no such table")
          ? undefined
          : Promise.reject(err)
      ),
    knex
      .truncate("Comments")
      .catch((err) =>
        err.toString().includes("no such table")
          ? undefined
          : Promise.reject(err)
      ),
    knex
      .truncate("Followers")
      .catch((err) =>
        err.toString().includes("no such table")
          ? undefined
          : Promise.reject(err)
      ),
    knex
      .truncate("ArticleFavorites")
      .catch((err) =>
        err.toString().includes("no such table")
          ? undefined
          : Promise.reject(err)
      ),
  ]);
};
