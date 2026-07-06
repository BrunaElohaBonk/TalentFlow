import express from 'express';


const route = express.Router();

route
    .post('/createProfileInstrutor')
    .put('/editProfileInstrutor/:id')
    .delete('/deleteInstrutor/:id')


export default route;