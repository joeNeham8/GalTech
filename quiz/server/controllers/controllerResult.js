import Question from '../modules/questionSchema.js';
import Result from '../modules/resultSchema.js';

export const submitQuiz = async (req, res) => {
  try {
    const { userId, answers } = req.body;
    // answers = [{ questionId, selectedOption }]

    if (!answers || answers.length === 0) {
      return res.status(400).json({ message: 'No answers submitted' });
    }

    let correctCount = 0;
    let category = '';
    let subcategory = '';

    for (const ans of answers) {
      const question = await Question.findById(ans.questionId);
      if (question) {
        // Store category info from the first valid question
        if (!category) category = question.category;
        if (!subcategory) subcategory = question.subcategory;

        if (question.answers === ans.selectedOption) {
          correctCount++;
        }
      }
    }

    const result = new Result({
      user: userId,
      category,
      subcategory,
      score: correctCount,
      totalQuestions: answers.length,
      correctAnswers: correctCount,
    });

    await result.save();

    res.status(201).json({
      message: 'Quiz submitted successfully',
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error submitting quiz',
      error: err.message,
    });
  }
};

// ...existing imports and code...

export const getUserResults = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await Result.find({ user: userId }).sort({ date: -1 });
    res.json({ results });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching results',
      error: err.message,
    });
  }
};