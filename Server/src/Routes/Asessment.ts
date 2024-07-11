import express from 'express'
import { getAllQuestions, CreateQuestion, UpdateQuestion, DeleteQuestion } from '../Controllers/Asessment'

const router = express.Router()

router.get('/', getAllQuestions)
router.post('/', CreateQuestion)
router.patch('/:id', UpdateQuestion)
router.delete('/:id', DeleteQuestion)

export default router