module.exports = (repository) => {
  module.getAllCategories = (pagination) => {
    return repository.getAllCategories(pagination);
  };
  module.getCategoriesById = (id) => {
    return repository.getCategoriesById(id);
  };
  module.createCategories = (body) => {
    return repository.createCategories(body);
  };
  module.updateCategories = (id, body) => {
    return repository.updateCategories(id, body);
  };
  module.deleteCategories = (id) => {
    return repository.deleteCategories(id);
  };
  return module;
};
