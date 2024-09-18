const PurchaseItemRepository = require('../repositories/purchaseItemRepository.js');
const ProductService = require('../services/productService.js');

class PurchaseItemService {
  constructor(){
    this.purchaseItemRepository = new PurchaseItemRepository();
  }

  purchaseItemRepository;

  async create(saleId, list){
    let productsUpdate = [];
    const productService = new ProductService();
    try{
      /** Adicionar os produtos da compra
       */

      let queryProducts="";
      let i = 0;
  
      for(let product of list){

        // Cria uma string para inserir todos os produtos de uma venda
        if(i < (list.length -1)){
          queryProducts += `(${product.quantidade}, ${product.valor_unitario}, '${product.nome}', ${product.codigo_produto}, ${saleId}),`;
        }
        else {
          queryProducts += `(${product.quantidade}, ${product.valor_unitario}, '${product.nome}', ${product.codigo_produto}, ${saleId})`;
        }
       
        //Verifica a existencia do produto
        const productExist = await productService.findById(product.codigo_produto);
        if(productExist.length == 0){
          throw new Error('Produto não encontrado.');
        }
        // Verifica se a quantidade vendida é maior que o do estoque
        if(productExist[0].estoque < product.quantidade){
          throw new Error(`Quantidade de compra do produto ${productExist[0].nome} é maior que o disponível.`)
        }

        // Adiciona o valor da quantidade restante e o codigo do produto ao array 
        let objetProductUpdate = new Object({amount:0, productId:0})
        objetProductUpdate.amount = productExist[0].estoque - product.quantidade;
        objetProductUpdate.productId = product.codigo_produto;
        productsUpdate.push(objetProductUpdate);
        i += 1;
      }
      
      const itemsCreate = await this.purchaseItemRepository.create(queryProducts);

      for(let productAmount of productsUpdate){
        const amount = productAmount.amount;
        const productId = productAmount.productId;
        await productService.amountUpdate(productId, amount);
      }

      return itemsCreate;
    }
    catch(error){
       throw new Error(`Erro no processo de adicionar itens da venda: ${error.message}`);
    }
  }

}

module.exports = PurchaseItemService;