const table = "users";
module.exports = (knex) => {
  module.getProfile = (payload) => {
    return knex
      .select("users.id as id", "email", "name", "phone", "profilePicture")
      .where("users.id", payload.id)
      .first()
      .table(table)
      .innerJoin("customers", "customers.user_id", "=", "users.id");
  };
  module.getUser = (id) => {
    return knex.select().where("id", id).first().table(table);
  };
  module.updatePassword = (id, body) => {
    return knex.table(table).where("id", id).update(body);
  };
  module.updateCustomerProfile = (id, body) => {
    return knex.table("customers").where("id", id).update(body);
  };
  module.updateCustomerProfilePicture = (id, body) => {
    return knex.table("customers").where("id", id).update(body);
  };
  return module;
};
