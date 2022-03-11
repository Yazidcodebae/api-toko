const express = require("express");
const app = express();
const port = 4000;
const knex = require("./knex");
const cors = require("cors");
const delivery = require("./modules/delivery");
const repository = require("./modules/repository");
const usecase = require("./modules/usecase");
const { attachPaginate } = require("knex-paginate");
const bodyParser = require("body-parser");
const morgan = require("morgan");

attachPaginate();
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send({
    version: "0.0.1",
    author: "danilrafiqi",
  });
});
// app.use(authMiddleware)

//#region AUTH
const authRepo = repository.newAuthRepository(knex);
const authUseCase = usecase.newAuthUseCase(authRepo);
delivery.newAuthController(app, authUseCase);
//#region

//#region PROFILE
const profileRepo = repository.newProfileRepository(knex);
const profileUseCase = usecase.newProfileUseCase(profileRepo);
delivery.newProfileController(app, profileUseCase);
//#endregion

//#region CATEGORIES
const categoriesRepo = repository.newCategoriesRepository(knex);
const categoriesUseCase = usecase.newCategoriesUseCase(categoriesRepo);
delivery.newCategoriesController(app, categoriesUseCase);
//#region

//#region PRODUCTS
const productsRepo = repository.newProductsRepository(knex);
const productsUseCase = usecase.newProductsUseCase(productsRepo);
delivery.newProductsController(app, productsUseCase);
//#region

//#region COUPONS
const couponsRepo = repository.newCouponsRepository(knex);
const couponsUseCase = usecase.newCouponsUseCase(couponsRepo);
delivery.newCouponsController(app, couponsUseCase);
//#region

//#region USERS
const usersRepo = repository.newUsersRepository(knex);
const usersUseCase = usecase.newUsersUseCase(usersRepo);
delivery.newUsersController(app, usersUseCase);
//#region

//#region CARTS
const cartsRepo = repository.newCartsRepository(knex);
const cartsUseCase = usecase.newCartsUseCase(cartsRepo);
delivery.newCartsController(app, cartsUseCase);
//#region

//#region ADDRESSS
const addressRepo = repository.newAddressRepository(knex);
const addressUseCase = usecase.newAddressUseCase(addressRepo);
delivery.newAddressController(app, addressUseCase);
//#region

//#region ORDERS
const ordersRepo = repository.newOrdersRepository(knex);
const ordersUseCase = usecase.newOrdersUseCase(ordersRepo);
delivery.newOrdersController(app, ordersUseCase);
//#region

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
