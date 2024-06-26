const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;
// id name email phoneNo
class User {
  constructor(name, email, phoneNo, cart, id) {
    this.name = name;
    this.email = email;
    this.phoneNo = phoneNo;
    this.cart = cart;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      return (dbOp = db
        .collection("users")
        .updateOne({ _id: this._id }, { $set: this }));
    } else {
      return (dbOp = db.collection("users").insertOne(this));
    }
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex] = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updateCart = { items: updatedCartItems };
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      return (dbOp = db.collection("users").updateOne(
        { _id: this._id },
        {
          $set: {
            cart: updateCart,
          },
        }
      ));
    } else {
      return (dbOp = db.collection("users").insertOne(this));
    }
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("users")
      .find({})
      .toArray()
      .then((users) => {
        // console.log(users);
        return users;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findUserById(prodId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({
        _id: new mongodb.ObjectId(prodId),
      })
      .then((users) => {
        console.log(users);
        return users;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
