const { comparePassword, generateJwt } = require("../../../utils");

const table = "users";
module.exports = (knex) => {
  module.register = (body, type) => {
    return knex.transaction(function (trx) {
      return trx
        .insert(body)
        .into(table)
        .then((ids) => {
          if (type === "customers") {
            return trx("customers").insert({
              name: body.email,
              phone: "0",
              user_id: ids[0],
            });
          }
        });
    });
  };
  module.login = (email, password, type) => {
    return new Promise((resolve, reject) => {
      let query;
      switch (type) {
        case "customers":
          query = knex
            .select("*", "customers.id as type_id")
            .where("email", email)
            .first()
            .table(table)
            .innerJoin("customers", "customers.user_id", "=", "users.id");
          break;
        case "stores":
          query = knex
            .select("*", "stores.id as type_id")
            .where("email", email)
            .first()
            .table(table)
            .innerJoin("stores", "stores.user_id", "=", "users.id");
          break;
        case "employees":
          query = knex
            .select("*", "employees.id as type_id")
            .where("email", email)
            .first()
            .table(table)
            .innerJoin("employess", "employess.user_id", "=", "users.id");
          break;
        default:
          reject("ada error");
          break;
      }

      query
        .then((data) => {
          if (data) {
            if (comparePassword(password, data.password)) {
              resolve({
                accessToken: generateJwt({
                  id: data.id,
                  type,
                  type_id: data.type_id,
                }),
              });
            } else {
              reject({
                message: "Authentication Failed",
              });
            }
          } else {
            reject({
              message: "Authentication Failed",
            });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  return module;
};
