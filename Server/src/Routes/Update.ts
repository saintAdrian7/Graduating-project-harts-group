import express from 'express'
import { updateCourseWithModules } from '../Controllers/Course'
const router = express.Router()


router.get('/:id', updateCourseWithModules)

export default router