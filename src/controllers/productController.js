const { promiseImpl } = require('ejs');
const fs = require('fs');
// let fileOperations = require('../models/fileOperations'); // NICO DEBERIA ELIMINAR YA NO SE USA
let db = require('../database/models');
const Op = db.Sequelize.Op;
// const { Op } = require("sequelize");


module.exports = {
  list: (req, res) => {
    db.Product.findAll({
      include: ["categories","images"],
    })
      .then((products) => {
        res.render("products/productList.ejs", { products });
      })
      .catch((error) => res.send(error));
  },

  productCart: (req, res) => {
    res.render("products/productCart");
  },

  productDetail: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: ["categories", "images"],
    })
      .then((product) => {
        res.render("products/productDetail.ejs", { product });
      })
      .catch((error) => res.send(error));
  },

  productSearch: (req, res) => {
    let search = req.query.search;

    db.Product.findAll({
      where: {
        name: { [Op.like]: `%${search}%` },
      },
      include: ["categories", "images"]
    })
    .then((products) => {
        if (products.length > 0) {
            return res.render('products/productSearch.ejs', { products });
            // return res.json(products);
        }
        return res.render('products/productSearch.ejs', { products });
    })
    .catch(function (e) {
        console.log(e);
    });
  },

  productSaveNew: async (req, res) => {
    db.Product.create({
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        stock_min: req.body.stock_min,
        stock_max: req.body.stock_max,
        categories_id: req.body.category,
        description: req.body.description,
        week: 10,
        facts: req.body.facts,
      })
      .then((data)=>{
        db.Image.create ({
          name       :  req.file.filename,
          products_id:  data.id } )
          res.redirect('/products');
      }
      )
      .catch((err)=>{
        res.send(err);
      })

   
  },

  productCreate: (req, res) => {
    db.Category.findAll()
      .then((categories)=>{
        res.render("products/productCreate",{categories});
      })
      .catch((error)=>{
        res.send(error)
      })
  },

  productEdit: async function(req, res) {
        let listProduct    = await db.Product.findByPk(req.params.id);
        let listCategories = await db.Category.findAll();

        Promise.all([listProduct,listCategories])
          .then(([product,categories])=>{
            return res.render('products/productEdit', { product , categories});
          })
          .catch((error)=>{
            res.send(error);
          });

        
        

    // //let product = fileOperations.findById(req.params.id)
    // //res.render('products/productEdit', { product })
    // let pedidoProduct = db.Product.findByPK(req.params.id);
    // // let pedidoCategory = db.category.findAll();

    // Promise.all([pedidoProduct])
    //     .then(function(products) {

    //         res.render("products/productEdit.ejs", {product:product, category:category})
    //     });

    // res.redirect("/products");

    // console.log(pedidoProduct);

    // // async y await tienen que estar juntos
    // let products = db.Product.findAll({
    //     include:[{association:"categories"}]
    // });

    // res.json(products);
  },
  productSave: async (req, res) => {
    try {
        await db.Product.update({
          name: req.body.name,
          price: req.body.price,
          stock: req.body.stock,
          stock_min: req.body.stock_min,
          stock_max: req.body.stock_max,
          categories_id: req.body.category,
          description: req.body.description,
          week: 10,
          facts: req.body.facts,
        },
        { where: { id: req.params.id }});
    } catch(err){
      res.send(err);
    }
    
    res.redirect("/products/" + req.params.id); },

  productDelete:  (req, res) => {
    
      db.Image.destroy({where: {products_id: req.params.id,}})
      .then(()=>{
        db.Product.destroy({
          where: {
            id: req.params.id,
          },
        });
      })
      .catch((error)=>{
        res.send(error);
      }); 
    }
};
