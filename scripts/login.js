import { SellerController } from "../Control/sellerController.js";
import { AdminController } from "../Control/adminController.js";

window.onload = async ()=>{
  const userType = document.querySelector('body').getAttribute('id');
  if(userType === 'sellerLogin'){
    const sellerController = new SellerController();
    await sellerController.handleLogin();

  } else if (userType === 'adminLogin'){
    const adminController = new AdminController();
    await adminController.handleLogin();
  }
}