import Question from '../modules/questionSchema.js';

// CREATE a new question
export const createQuestion = async (req, res) => {
  try {
    const question = new Question({
      ...req.body,
      createdBy: req.user?.id || null, // optional: if using auth
    });

    await question.save();
    res.status(201).json({ message: 'Question created successfully', question });
  } catch (err) {
    res.status(500).json({ message: 'Error creating question', error: err.message });
  }
};

// GET all questions (with optional filters)
export const getAllQuestions = async (req, res) => {
  try {
    const { category, subcategory, difficulty } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await Question.find(filter);
    res.status(200).json({questions});
  } catch (err) {
    res.status(500).json({ message: 'Error fetching questions', error: err.message });
  }
};
  
// GET single question by ID
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching question', error: err.message });
  }
};

// UPDATE a question by ID
export const updateQuestion = async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question updated', question: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating question', error: err.message });
  }
};

// DELETE a question by ID
export const deleteQuestion = async (req, res) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting question', error: err.message });
  }
};

export const getQuestionsByCategoryAndSubcategory = async (req, res) => {
  try {
    const { categoryId, subCategoryName } = req.params;
    const questions = await Question.find({
      category: categoryId,
      subcategory: subCategoryName
    });
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions.', error: error.message });
  }
};

export const addQuestionToSubcategory = async (req, res) => {
  try {
    const { categoryId, subCategoryName } = req.params;
    const { questionText, options, correctAnswer } = req.body;
    const question = new Question({
      questionText,
      options,
      correctAnswer,
      category: categoryId,
      subcategory: subCategoryName
    });
    await question.save();
    res.status(201).json({ message: 'Question added!', question });
  } catch (error) {
    res.status(500).json({ message: 'Error adding question.', error: error.message });
  }
};
