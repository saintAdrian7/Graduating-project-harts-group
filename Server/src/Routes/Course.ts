import express from 'express'
import { getCourses, getCourse,UpdateCourse, DeleteCourse, CreateCourse, getAllModules, getOneModule, CreateModule, UpdateModule, DeleteModule} from '../Controllers/Course'
const router = express.Router()

router.get('/', getCourses)
router.get('/:id', getCourse)
router.patch('/:id', UpdateCourse)
router.delete('/:id', DeleteCourse)
router.post('/', CreateCourse)

export default router