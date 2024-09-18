import { SellerController } from "../Control/sellerController.js";

document.addEventListener('DOMContentLoaded', async() => {
  const userToken = sessionStorage.getItem('userToken');

  if(userToken){
    console.log(userToken)
    const sellerController = new SellerController(userToken);
    await sellerController.listSeller();
    sellerController.handleBtnSearch();
    sellerController.handleBtnCloseSearch();
    sellerController.handleLogout();
  } else {
    window.location.href="../index.html";
  }
})