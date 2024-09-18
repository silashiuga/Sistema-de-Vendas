export class ProductFormView {

  _form;

  constructor(){
    this._form = document.forms[0].elements;
  }

  getInputValue(formModel){

    // Chama o Model com o formulario, para atribuir os valores do input
    formModel.getInputValues(this._form);

    // Limpar campos
    this._form[0].value = "";    
    this._form[1]    
    this._form[2].value = "";    
    this._form[3].value = "";    
    this._form[4].value = "";    
  }

  setInputValue(productFound){  

    const {ativo, codigo_categoria, descricao, estoque, nome, valor} = productFound[0];
    console.log(codigo_categoria)
    this._form[0].value = nome;    
    this._form[1].value = codigo_categoria;    
    this._form[2].value = descricao;    
    this._form[3].value = valor;    
    this._form[4].value = estoque;  
  
    if(ativo == 1){
      this._form[5].checked = true;
    }else {
      this._form[6].checked = true;
    }
  }
}
