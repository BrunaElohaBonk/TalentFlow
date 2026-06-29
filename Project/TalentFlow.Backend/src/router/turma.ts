import express from 'express'
const router = express.Router();

 router.get('/turmas');
 router.get('/turmas/:id');
 router.put('/update/:id');

 export default router;