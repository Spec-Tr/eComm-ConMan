const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  }).then((dbCategory) => {
      res.json(dbCategory);
    })
    .catch((err) => {
      res.status(500).json ({msg: "Categories unavailable", err});
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [Product]
  }).then((dbCategory) => {
    if (!dbCategory) {
      res.status(404).json({msg: "Category not found"})
    } else {
      res.json(dbCategory)
    }
  }).catch(err => {
    res.status(500).json({msg: "Error", err})
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  }).then(newCategory => {
    res.json(newCategory)
  }).catch(err => {
    res.status(500).json({msg: "Error", err})
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name,
  },{
    where: {
      id: req.params.id
    }
  }).then(editCategory => {
    res.json(editCategory)
  }).catch(err => {
    res.status(500).json({msg: "error", err})
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(delCategory => {
    if (!delCategory) {
      res.status(404).json({msg: "Category not found"})
    } else {
      res.json('Category deleted successfully')
    }
  }).catch(err => {
    res.status(500).json ({msg: "Error", err})
  })
});

module.exports = router;
