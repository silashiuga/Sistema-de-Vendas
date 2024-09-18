export class MessageModel {

  _message;

  getMessage(){
    return this._message;
  }

  setMessage(message){
    this._message = message;
  }

}