import express from 'express'
import { getAllModules, getOneModule, CreateModule, UpdateModule, DeleteModule} from '../Controllers/Course'
const router = express.Router()

router.get('/', getAllModules)
router.get('/:id', getOneModule)
router.post('/', CreateModule)
router.patch('/:id', UpdateModule)
router.delete('/:id', DeleteModule)

export default router