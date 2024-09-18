import { AdminController } from "../Control/adminController.js";

document.addEventListener('DOMContentLoaded', async() => {
  const userToken = sessionStorage.getItem('userToken');

  if(userToken){
    console.log(userToken)
    const adminController = new AdminController(userToken);
    await adminController.listAdmin();
    adminController.handleBtnSearch();
    adminController.handleBtnCloseSearch();
    adminController.handleLogout();
  } else {
    window.location.href="../index.html";
  }
})