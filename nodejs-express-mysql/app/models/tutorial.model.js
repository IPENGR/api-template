require('dotenv').config();
const sql = require("./db.js");

// constructor
const Login = function(login) {
  this.Eid = login.Eid;
  this.Ename = login.Ename;
  this.Eemail = login.Eemail;
  this.Edesignation = login.Edesignation;
  this.Eaddress = login.Eaddress;
};

Login.create = (newLogin, result) => {
  sql.query("INSERT INTO login.login_details SET ?", newLogin, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created employee: ", { Eid: res.insertId, ...newLogin });
    result(null, { Eid: res.insertId, ...newLogin });
  });
};

Login.findById = (Eid, result) => {
  sql.query(`SELECT * FROM login.login_details  WHERE Eid = ${Eid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Employee with the eid
    result({ kind: "not_found" }, null);
  });
};

Login.getAll = (Ename, result) => {
  let query = "SELECT * FROM login.login_details";



  if (Ename) {
    query += ` WHERE Ename LIKE '%${Ename}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employees: ", res);
    result(null, res);
  });
};

Login.updateById = (Eid, login_details, result) => {
  console.log(Eid);
  sql.query(
    "UPDATE login_details SET Ename = ?, Eemail= ?, Edesignation = ? WHERE Eid = ?",
    [login_details.Ename, login_details.Eemail, login_details.Edesignation, login_details.Eid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Employee with the eid
      //  result({ kind: "not_found" }, null);
      console.log('error');
        return;
      }

      console.log("updated employee: ", { Eid: Eid, ...login_details });
      result(null, { Eid: Eid, ...login_details});
    }
  );
};

Login.remove = (Eid, result) => {
  sql.query("DELETE FROM login.login_details WHERE Eid = ?", Eid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Employee with the eid
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employee with eid: ", Eid);
    result(null, res);
  });
};

module.exports = Login;
