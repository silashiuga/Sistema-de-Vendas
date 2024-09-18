import { SaleController } from "../Control/saleController.js";

document.addEventListener('DOMContentLoaded', async () => {
  const userToken = sessionStorage.getItem('userToken');
  const id = sessionStorage.getItem('id');
  console.log(id)
  if(userToken){
    const saleController = new SaleController(userToken);

    console.log(id)
    await saleController.findSeller(id);
    saleController.handleDate();
    saleController.handleBtnCloseClientSearch();
    saleController.handleBtnClientSearch();
    saleController.handleBtnSearchProduct();
    saleController.handleBtnCancelProductSearch();
    saleController.handleBtnAddProductInList();
    saleController.handleEventContainerTable();
    saleController.handleTotalValue();
    saleController.handleBtnFinalize();
    saleController.handleAccount(id);
    saleController.handleLogout();
  } else {
    window.location.href='../index.html';
  }
})