var router = require("express").Router();
const db = require("./db");

router.get("/us", function (req, res) {
  return res.send({ error: false, message: "api is working" });
});

router
  .route("/user")
  .get((req, res) => {
    db.query("SELECT * FROM users", (error, result) => {
      if (result == null) {
        msg = "Users are failed to fetch the data.";
      } else {
        msg = "Users are successfully fetched from the database.";
      }

      return res.send({
        error: result == null ? true : false,
        data: result,
        message: msg,
      });
    });
  })
  .put((req, res) => {
    db.query(
      "INSERT INTO users set ?",
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
      function (error) {
        if (error) throw error;

        if (error) {
          msg = "User is failed to insert the data.";
        } else {
          msg = "User is created successfully.";
        }

        return res.send({
          error: error ? true : false,
          message: msg,
        });
      }
    );
  });

router
  .route("/user/:id")
  .get((req, res) => {
    db.query(
      "SELECT * FROM users where id = ?",
      [req.params.id],
      function (error, result) {
        if (error) {
          msg = "User is failed to fetch the data.";
        } else if (result != Array) {
          msg = "No user is founded.";
        } else {
          msg = "User is successfully fetched from the database.";
        }

        return res.send({
          error: error ? true : false,
          data: result ?? [],
          message: msg,
        });
      }
    );
  })
  .post((req, res) => {
    db.query(
      `UPDATE users 
      SET 
        firstName = ?, 
        lastName = ?, 
        username = ?, 
        email = ?, 
        password = ? 
      WHERE (id = ?)`,
      [
        req.body.firstName,
        req.body.lastName,
        req.body.username,
        req.body.email,
        req.body.password,
        req.params.id,
      ],
      function (error, result) {
        if (error) throw error;

        if (error) {
          msg = "User is failed to update the data.";
        } else if (result != Array) {
          msg = `No user is founded with id '${req.params.id}'.`;
        } else {
          msg = "User is successfully updated from the database.";
        }

        return res.send({
          error: error ? true : false,
          data: {
            fieldCount: result.fieldCount,
            affectedRows: result.affectedRows,
            insertId: result.insertId,
            changedRows: result.changedRows,
          },
          message: msg,
        });
      }
    );
  })
  .delete((req, res) => {
    db.query(
      `DELETE FROM users WHERE (id = ?)`,
      [req.params.id],
      function (error, result) {
        // if (error) throw error;

        if (error) {
          msg = "User is failed to delete the data.";
        } else if ((result.affectedRows ?? 0) == 0) {
          msg = `No user is founded with id '${req.params.id}'.`;
        } else {
          msg = "User is successfully deleted from the database.";
        }

        return res.send({
          error: error ? true : false,
          data: {
            fieldCount: result.fieldCount,
            affectedRows: result.affectedRows,
            insertId: result.insertId,
            changedRows: result.changedRows,
          },
          message: msg,
        });
      }
    );
  });

module.exports = router;
