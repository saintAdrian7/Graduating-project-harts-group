import express from 'express'
import { getAllModules, getOneModule, CreateModule, UpdateModule, DeleteModule} from '../Controllers/Course'
import { authenticateToken } from '../middleware/Auth'
const router = express.Router()

router.get('/', authenticateToken, getAllModules)
router.get('/:id', authenticateToken, getOneModule)
router.post('/', authenticateToken, CreateModule)
router.patch('/:id', authenticateToken, UpdateModule)
router.delete('/:id', authenticateToken, DeleteModule)

export default router