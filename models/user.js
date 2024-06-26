const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
// id name email phoneNo
class User {
  constructor(name, email, phoneNo, id) {
    this.name = name;
    this.email = email;
    this.phoneNo = phoneNo;
    this._id = id ? new mongodb.ObjectId(id) : null ;
  }

  save () {
    const db = getDb();
    let dbOp;
    if(this._id){
      // Update the product
      return dbOp = db.collection('users').updateOne({_id: this._id}, {$set: this});
    } else {
      return dbOp = db.collection('users').insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('users').find({

    }).toArray()
    .then(users => {
      // console.log(users);
      return users;
    })
    .catch(err => {
      console.log(err);
    });
  }

  static findUserById(prodId) {
    const db = getDb();
    return db.collection('users').findOne({
        _id: new mongodb.ObjectId(prodId)
    })
    .then(users => {
      console.log(users);
      return users;
    })
    .catch(err => {
      console.log(err);
    });
  }
}

module.exports = User;
