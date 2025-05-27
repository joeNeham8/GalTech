
// get all questions
export async function getQuestions(req, res) {
    res.json("questions api get request");
}

// insert a question
export async function insertQuestions(req, res) {
    res.json("questions api post request");
}

// delete a question
export async function deleteQuestions(req, res) {
    res.json("questions api delete request");
}

// get all results
export async function getResults(req, res) {
    res.json("results api get request");
}

// insert results
export async function insertResults(req, res) {
    res.json("results api post request");
}

// delete results
export async function deleteResults(req, res) {
    res.json("results api delete request");
}