module.exports = (repository) => {
  module.getAllProducts = (pagination) => {
    return repository.getAllProducts(pagination);
  };
  module.getProductsById = (id) => {
    return repository.getProductsById(id);
  };
  module.createProducts = (body) => {
    return repository.createProducts(body);
  };
  module.updateProducts = (id, body) => {
    return repository.updateProducts(id, body);
  };
  module.deleteProducts = (id) => {
    return repository.deleteProducts(id);
  };
  return module;
};
