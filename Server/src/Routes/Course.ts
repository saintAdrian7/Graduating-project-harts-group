import express from 'express'
import { getCourses, getCourse,UpdateCourse, DeleteCourse, CreateCourse, getAllModules, getOneModule, CreateModule, UpdateModule, DeleteModule, searchCourse, handleSearch} from '../Controllers/Course'
const router = express.Router()

router.get('/', getCourses)
router.get('/:id', getCourse)
router.patch('/:id', UpdateCourse)
router.delete('/:id', DeleteCourse)
router.post('/', CreateCourse)
router.get('/search?', searchCourse)
router.get('/courses/search', handleSearch)

export default router