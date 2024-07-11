import express from 'express'
import {updateCourseWithAssessments } from '../Controllers/Course'
const router = express.Router()


router.get('/:id', updateCourseWithAssessments)

export default router