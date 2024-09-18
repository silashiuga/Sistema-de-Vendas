import { SaleController } from "../Control/saleController.js";

document.addEventListener('DOMContentLoaded', async () => {
  const userToken = sessionStorage.getItem('userToken');

  if(userToken){
    const saleController = new SaleController(userToken);
    
    saleController.handleFilterAction();
    
    saleController.handleEventListSales();
    saleController.handleBtnSearch();
    saleController.handleBtnCloseSearch();
    saleController.handleCloseModal();
    saleController.handleContainerModal();
    saleController.handleLogout();

    const id = sessionStorage.getItem('id');
    saleController.handleAccount(id);
  } else {
    window.location.href='../index.html';
  }
});