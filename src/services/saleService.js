const SaleRepository = require('../repositories/saleRepository.js');
const SaleValidations = require('../validations/saleValidations.js');
const SellerService = require('../services/sellerService.js');
const ClientService = require('../services/clientService.js');
const PurchaseItemService = require('../services/purchaseItemService.js');

class SaleService {
  constructor(){
    this.saleRepository = new SaleRepository();
  }
  
  saleRepository;

  /** 
   * {
   *    ==> codigo
   *    codigo_cliente,
   *    codigo_vendedor,
   *    data_compra,
   *    valor
   * 
   *    listaProduto = [
   *      {
   *        ==> codigo
   *        quantidade,
   *        valor_unitario,
   *        nome,
   *        codigo_produto,
   *        ==> codigo_compra,
   *      }
   *    ]
   * }
  */

  async create(data){
    const saleValidations = new SaleValidations();
    const validateSale = saleValidations.saveSaleValidation(data);
    
    if(!validateSale){
      throw new Error('Dado de entrada inválido');
    }

    const sellerService = new SellerService();
    const clientService = new ClientService();
    
    const findSeller = await sellerService.findById(data.codigo_vendedor);
    if(findSeller[0].length == 0){
      throw new Error('Vendedor não encontrado.');
    }

    const findClient = await clientService.findById(data.codigo_cliente);
    if(findClient[0].length){
      throw new Error('Cliente não encontrado.')
    }
    let messageError = ''; 
    try {
      const saleId = await this.saleRepository.create(data);
      const purchaseItemService = new PurchaseItemService();
      console.log(saleId)
      let purchaseItems;
      try {
        purchaseItems = await purchaseItemService.create(saleId, data.listaProduto);

      } catch(errorInsertProducts){
          messageError = `Falha ao inserir produtos: ${errorInsertProducts.message} `;
    
          try{
            await this.saleRepository.delete(saleId);

          } catch(errorDeleteSale){
            messageError += `Falha ao deletar venda: ${errorDeleteSale.message}`
          }
          throw new Error(messageError);
      }
      return purchaseItems;
    } catch (errorCreateSale){
      throw new Error(messageError);
    }

  }

  async findList(data){
    const saleValidations = new SaleValidations();
    const validateDateOrder = saleValidations.checkOrder(data.dateOrder);
    const validateValueOrder = saleValidations.checkOrder(data.valueOrder);

    if(!validateDateOrder || !validateValueOrder){
      throw new Error('Dado de entrada inválido.');
    }

    const findSales = await this.saleRepository.findList(data);
    return findSales;
  }

  async findPurchaseItems(data){
    const saleValidations = new SaleValidations();
    data.codigo = +data.codigo;
    const validateId = saleValidations.checkNumber(data.codigo)
    console.log(data)
    if(!validateId){
      throw new Error('Dado de entrada inválido.');
    }

    const productsOfSale = await this.saleRepository.findPurchaseItems(data.codigo);
    return productsOfSale;
  }

  async findPurchaseByCpf(data){
    const saleValidations = new SaleValidations();
    const validateCpf = saleValidations.checkCPF(data.cpf)

    if(!validateCpf){
      throw new Error('Dado de entrada inválido.');
    }

    const findPurchase = await this.saleRepository.findPurchaseByCpf(data.cpf);
    return findPurchase;
  }
}

module.exports = SaleService;