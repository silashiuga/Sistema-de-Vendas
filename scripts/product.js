import { ProductController } from "../Control/productController.js";
import { CategoryController } from "../Control/categoryController.js";

document.addEventListener('DOMContentLoaded', async () => {

  const userToken = sessionStorage.getItem('userToken');

  if(userToken){
    const productController = new ProductController(userToken);
    const categoryController = new CategoryController(userToken);
    await categoryController.selectCategory(2, 'list');
    
    productController.handleFilterAction();
    const selectAmount = document.getElementById('filter-amount').value;
    const selectStatus = document.getElementById('filter-status').value;
    const selectCategory = document.getElementById('listCategory').value;
    await productController.listProducts(selectCategory, selectAmount, selectStatus);
    productController.handleBtnSearch();
    productController.handleBtnCloseSearch();

    const id = sessionStorage.getItem('id');
    productController.handleAccount(id);

    productController.handleLogout();
  } else {
    window.location.href='../index.html';
  }
})