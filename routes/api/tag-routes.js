const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags)

  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        though: ProductTag
      }]
    });
    if (!oneTag) {
      res.status(400).json({ message: 'Tag! This ain\'t it.' });
      return;
    }
    res.status(200).json(oneTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
         //if try to update tag with an id that doesnt exist, this runs.
    if (!updateTag[0]) {
      res.status(400).json({ message: 'Can\'t update a tag that doesn\'t exist.' });
      return;
    }
    res.status(200).json(updateTag);

  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy(
      {
        where: {
          id: req.params.id
        }
      })
     //if try to delete tag with an id that doesnt exist, this runs.
      if(!deleteTag){
        res.status(404).json(
          {
            message: 'Cannot delete a tag that does not exist.'
          });
          return;
      }

      res.status(200).json(deleteTag);

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
