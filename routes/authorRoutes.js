import express from 'express';
import { authorController } from '../controllers/authorControllers.js';
const router = express.Router();

router.get('/', authorController.getAuthors).post('/', authorController.createAuthors);

router.get('/:id', authorController.getSingleAuthor).put('/:id', authorController.updateAuthor);

export default router;