export class ClientFormView {
  _form;

  constructor(){
    this._form = document.forms[0].elements;
  }

  getInputValue(formModel){
    formModel.setInputValues(this._form);

    this._form[0].value = "";
    this._form[1].value = "";
    this._form[2].value = "";
    this._form[3].value = "";
    this._form[4].value = "";
  }

  setInputValue(clientFound){
    const {nome, cpf, email, rua, telefone, } = clientFound[0]
    this._form[0].value = nome;
    this._form[1].value = cpf;
    this._form[2].value = email;
    this._form[3].value = rua;
    this._form[4].value = telefone;
  }
}