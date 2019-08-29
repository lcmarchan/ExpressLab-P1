const express = require("express");
const cartRoutes = express.Router();
const cart = require("./cart");
//*
const pool = require("../connection/pg-connection-pool");
//*

//*
function selectWholeCart(req, res) {
  pool.query("select * from hiShoppingCart").then(result => {
    res.send(result.rows);
  });
}
//*

cartRoutes.get("/cart", (req, res) => {
  res.send(cart);
  //*
  selectWholeCart(req, res);
  //*
});

cartRoutes.post("/cart", (req, res) => {
  // res.send(cart);
  //*
  pool
    .query(
      "insert into hiShoppingCart (product, id, price, quantity) values ($1::text, $2::int, $3::int, $4::int)",
      [req.body.product, req.body.id, req.body.price, req.body.quantity]
    )
    .then(() => {
      selectWholeCart(req, res);
    });
  //*
});

cartRoutes.put("/cart/:id", (req, res) => {
  // const index = cart.findIndex(person => person.id === req.params.id);
  // cart.splice(index, 1, req.body);
  // res.send(cart);
  //*
  pool
    .query(
      "update hiShoppingCart set product=$1::text, id=$2::int, price=$3::int, quantity=$4::int",
      [req.body.product, req.body.id, req.body.price, req.body.quantity]
    )
    .then(() => {
      selectWholeCart(req, res);
    });
  //*
});

cartRoutes.delete("/cart/:id", (req, res) => {
  // const index = cart.findIndex(person => person.id === req.params.id);
  // cart.splice(index, 1);
  // res.send(cart);
  //*
  pool
    .query("delete from hiShoppingCart where id=$1::int", [req.params.id])
    .then(() => {
      selectWholeCart(req, res);
    });
  //*
});

module.exports = cartRoutes;
