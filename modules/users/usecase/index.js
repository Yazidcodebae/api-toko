module.exports = (repository) => {
  module.getAllUsers = () => {
    return repository.getAllUsers();
  };
  module.getUsersById = (id) => {
    return repository.getUsersById(id);
  };
  module.createUsers = (body) => {
    return repository.createUsers(body);
  };
  module.updateUsers = (id, body) => {
    return repository.updateUsers(id, body);
  };
  module.deleteUsers = (id) => {
    return repository.deleteUsers(id);
  };
  return module;
};
