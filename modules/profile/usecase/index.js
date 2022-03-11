const { comparePassword } = require("../../../utils");

module.exports = (repository) => {
  module.getProfile = (payload) => {
    return repository.getProfile(payload);
  };
  module.updatePassword = async (id, payload) => {
    const res = await repository.getUser(id);
    if (res) {
      if (comparePassword(payload.oldPassword, res.password)) {
        const updatePayload = {
          password: payload.newPassword,
        };
        return repository.updatePassword(id, updatePayload);
      } else {
        return new Promise((_, reject) => reject("password salah"));
      }
    } else {
      return new Promise((_, reject) => reject("password salah"));
    }
  };
  module.updateCustomerProfile = (id, body) => {
    return repository.updateCustomerProfile(id, body);
  };

  module.updateCustomerProfilePicture = (id, body) => {
    return repository.updateCustomerProfilePicture(id, body);
  };

  return module;
};
