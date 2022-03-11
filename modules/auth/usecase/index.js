module.exports = (repository) => {
  module.register = (body, type) => {
    return repository.register(body, type);
  };
  module.login = (email, password, type) => {
    return repository.login(email, password, type);
  };
  return module;
};
