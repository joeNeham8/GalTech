import { Router } from "express";

const router = Router();

import * as controller from "../controllers/controller.js";

// Questoions api

router.route("/questions")
    .get(controller.getQuestions) // GET request
    .post(controller.insertQuestions) // POST request
    .delete(controller.deleteQuestions) // DELETE request

router.route("/result")
    .get(controller.getResults) // GET request
    .post(controller.insertResults) // POST request
    .delete(controller.deleteResults) // DELETE request


export default router;