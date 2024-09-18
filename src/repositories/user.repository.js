class UserRepository {

  users = [];

  findByUserName(username) {
    const userExist = this.users.find((user)=> user.username === username);
    return userExist;
  }

  save(user){
    const id = Math.random().toString();
    const userWithId = {
      ...user,
      id
    };
    this.users.push(userWithId);
    return userWithId;
  }
}

module.exports = new UserRepository()