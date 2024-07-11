import express from 'express'
import { getUserById, handleLogin, handleRegister } from '../Controllers/Users'
const router = express.Router()


router.post('/register', handleRegister)
router.post('/login', handleLogin)
router.get('/:userId', getUserById )


export default router