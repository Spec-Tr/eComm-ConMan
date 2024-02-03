const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [Product]
  }).then((dbTag) => {
    res.json(dbTag);
  }).catch((err) => {
    res.status(500).json({msg: "Error", err});
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [Product]
  }).then(dbTag => {
    if (!dbTag) {
    res.status(404).json({msg: "Tag not found"})
    } else {
    res.json(dbTag)
    }
  }).catch(err => {
    res.status(500).json({msg: "Error", err})
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  }).then(newTag => {
    res.json(newTag)
  }).catch(err => {
    res.status(500).json({msg: "Error", err})
  })  
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name,
  }, {
    where: {
      id: req.params.id
    }
  }).then(editTag =>{
    res.json(editTag)
  }).catch(err => {
    res.status(500).json({msg: "Error", err})
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(delTag => {
    if (!delTag) {
      res.status(404).json({msg: "Tag not found"})
    } else {
      res.json('Tag deleted successfully')
    }
    res.status(404).json({msg: "Error", err})
  })
});

module.exports = router;
