export class SaleView {

  saleTable(list, action){

    let sectionTable;
    let id = '';
    
    if(action == 'list'){
      sectionTable = document.getElementById('table-container');
     
     if(sectionTable.childNodes.length > 0){
       let tableRemoved = sectionTable.childNodes[0];
       tableRemoved.parentNode.removeChild(tableRemoved);
       tableRemoved = null;
     }
     id = "saleFound";

    } else if(action == 'search'){
      sectionTable = document.getElementById('search-result');
      console.log(sectionTable.childNodes)
      if(sectionTable.childNodes.length > 3){
        let tableRemoved = sectionTable.childNodes[3];
        tableRemoved.parentNode.removeChild(tableRemoved);
        tableRemoved = null;
        console.log('removeu')
      }
      id = "saleSearched";
    }

    const table = `
      <table id='${id}'> 
        <thead>
          <tr>
            <th>Código</th>
            <th>Vendedor</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Valor Total</th>
            <th>Produtos</th>
          </tr>
        </thead>
        <tbody>
          ${list.map((sale) => {
            return `
              <tr> 
                <td>${sale.codigo}</td>
                <td>${sale.Vendedor}</td>
                <td>${sale.Cliente}</td>
                <td>${sale.data_compra.substring(0,10)}</td>
                <td>${sale.valor_Total}</td>
                <td><div class='saleItems' data-id='${sale.codigo}' data-total='${sale.valor_Total}'>Informações</div></td>
              </tr>
            `
          }).join('')}
        </tbody>
      </table>
    `;
    let doc = new DOMParser().parseFromString(table, "text/html");
    sectionTable.appendChild(doc.getElementById(id));

    if(action == 'search'){
      sectionTable.classList.add('ativo')
    }

    doc = null;
    sectionTable = null;
  }

  itemsTable(items){

    let modal = document.querySelector('.items-modal');
    let modalContainer = document.querySelector('.modal-items-container');
    if(modal.childNodes.length > 5){
      const tableRemoved = modal.childNodes[4];
        tableRemoved.parentNode.removeChild(tableRemoved);
    }
    
    const table = `
    <table id="itemFound"> 
      <thead>
        <tr>
          <th>Nome</th>
          <th>Quantidade</th>
          <th>Valor untário</th>
          <th>Valor Total</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item) => {
          return `
            <tr> 
              <td>${item.nome}</td>
              <td>${item.valor_unitario}</td>
              <td>${item.quantidade}</td>
              <td>${item.quantidade * item.valor_unitario}</td>
            </tr>
          `
        }).join('')}
      </tbody>
    </table>
  `;

  let doc = new DOMParser().parseFromString(table, "text/html");
  modal.appendChild(doc.getElementById('itemFound'));

  modalContainer.classList.add('active');
  
  doc = null;
  modal = null;
  modalContainer = null;
  }

  inputSaleSearch(saleModel){
    const saleValue = document.querySelector('.search-input').value.trim();

    saleModel.setCpf(saleValue);

    document.querySelector('.search-input').value = "";
  }

  setNameSeller(seller){
    const containerName = document.querySelector('.seller-name');
    const name = seller.getSeller().nome
    containerName.innerHTML = `Vendedor ${name}`;
  }

  setDate(objDate, dateElement, model){
    const date = `${objDate.getFullYear()}-${objDate.getMonth() + 1  < 10? '0'+(objDate.getMonth()+1): objDate.getMonth()+1}-${objDate.getDate() + 1 < 10 ? '0'+objDate.getDate() : objDate.getDate()}`;
    dateElement.innerHTML = date;
    model.setDatePurchase(date);
  }

  getClientCpf(model){
    let valueCpf = document.querySelector('.search-input-client').value;
    console.log(valueCpf)
    model.setCpf(valueCpf);

    const input = document.querySelector('.search-input-client');
    input.value = "";
  }

  setInfoClient(model){
    let client = model.getClient();

    const containerName = document.querySelector('#info-client-name');
    const containerCpf = document.querySelector('#info-client-cpf');

    containerName.innerText = client.nome;
    containerCpf.innerText = client.cpf;
    console.log(containerName.innerText)
  }

  getProductInput(model){
    const productName = document.querySelector('.search-input-product').value;
    model.setProductName(productName);

    const clearInput = document.querySelector('.search-input-product');
    clearInput.value = "";
  }

  setInputSearchProduct(model){
    let product = model.getProduct();
    console.log(product)
    const form = document.forms.searchProduct.elements;

    form[2].value = product.nome;
    form[3].value = product.estoque;
    form[5].value = product.valor;

  }

  resetInputProduct(){
    const form = document.forms.searchProduct.elements;

    form[2].value = '';
    form[3].value = '';
    form[4].value = '';
    form[5].value = '';
  }

  getFormProduct(){
    const form = document.forms.searchProduct.elements;
    return form;
  }
  setProductInList(model){
    const list = model.getListProduct();

    let containerList = document.querySelector('.container-list-product')
   
    if(containerList.childNodes.length > 3){
      const tableRemoved = containerList.childNodes[3];
      tableRemoved.parentNode.removeChild(tableRemoved);
    }

    const table = `
     <table id="productFound"> 
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Preço por UNID.</th>
              <th>Quantidade</th>
              <th>Valor</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            ${list.map((item) => {
          return `
            <tr> 
              <td>${item.codigo_produto}</td>
              <td>${item.nome}</td>
              <td>${item.valor_unitario}</td>
              <td>${item.quantidade}</td>
              <td>${(item.quantidade * item.valor_unitario).toFixed(2)}</td>
              <td><div class="btn-remove-item" data-id=${item.codigo_produto}><img src="../assets/icons/remove.svg"></div></td>
            </tr>
          `
        }).join('')}
          </tbody>
        </table>
    `;
    let doc = new DOMParser().parseFromString(table, "text/html");
    containerList.appendChild(doc.getElementById('productFound'));

    doc = null;
    containerList = null;
  }

  setTotalValue(modal){

    const containerTotal = document.querySelector('.container-total');

    if(containerTotal.childNodes.length>1){
      const textRemoved = containerTotal.childNodes[1];
      textRemoved.parentNode.removeChild(textRemoved);
    }
    const value = modal.getTotalValue();
    
    const displayTotalValue = `<p id="total">Valor Total: ${value}</p>`;

    const doc = new DOMParser().parseFromString(displayTotalValue, "text/html");
    containerTotal.appendChild(doc.getElementById('total'));
  }

}