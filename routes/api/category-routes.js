const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    //findbyPk, and that primary key will be an integer specified by client
    const singleCategory = await Category.findByPk(req.params.id,
      {
        include: [{
          model: Product
         
        }]
      });
    if (!singleCategory) {
      res.status(404).json({ message: 'No category exists for this id.' });
      return;
    }
    res.status(200).json(singleCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    //in this case, which would be better, findbypk through join table or update+where?
    const updateCategory = await Category.update(req.body,
      {
        where: {
          id: req.params.id
        }
      }
    )

    if(!updateCategory[0]) {
      res.status(404).json(
        {
          message: 'No category exists with this id.'
        });
        return;
    }

    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy(
      {
        where: {
          id: req.params.id
        }
      })

      if(!deleteCategory){
        res.status(404).json(
          {
            message: 'No category exists with this id.'
          });
          return;
      }

      res.status(200).json(deleteCategory);

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
