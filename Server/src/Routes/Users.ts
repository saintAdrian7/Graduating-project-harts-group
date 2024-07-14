import express from 'express'
import { getUserById, handleLogin, handleRegister } from '../Controllers/Users'
const router = express.Router()
import { Schemas, validateSchema } from '../middleware/Validation'


router.post('/register',  validateSchema(Schemas.user.create, 'body'), handleRegister)
router.post('/login', validateSchema(Schemas.user.login, 'body'), handleLogin)
router.get('/:userId', getUserById)
export default router