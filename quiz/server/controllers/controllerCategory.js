import Category from '../modules/categorySchema.js'; 


export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Basic validation
    if (!name) {
      return res.status(400).json({ message: 'Category name is required.' });
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category with this name already exists.' });
    }

    const newCategory = new Category({
      name,
      description,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      message: 'Category added successfully!',
      category: savedCategory,
    });
  } catch (error) {
    console.error('Error adding category:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal Server Error while adding category.' });
  }
};


export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}); // Find all categories

    res.status(200).json({
      message: 'Categories retrieved successfully!',
      count: categories.length,
      categories: categories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal Server Error while fetching categories.' });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params; // Get category ID from URL parameters

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    res.status(200).json({
      message: 'Category deleted successfully!',
      category: deletedCategory,
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid category ID format.' });
    }
    res.status(500).json({ message: 'Internal Server Error while deleting category.' });
  }
};

// Add a subcategory to a category
export const addSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { subcategory } = req.body;
    if (!subcategory) {
      return res.status(400).json({ message: 'Subcategory name is required.' });
    }
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }
    if (category.subcategories.includes(subcategory)) {
      return res.status(400).json({ message: 'Subcategory already exists.' });
    }
    category.subcategories.push(subcategory);
    await category.save();
    res.status(201).json({ message: 'Subcategory added!', subcategories: category.subcategories });
  } catch (error) {
    res.status(500).json({ message: 'Error adding subcategory.', error: error.message });
  }
};