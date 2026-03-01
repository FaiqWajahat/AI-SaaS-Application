import express from 'express'
import { getPublishCreations, getUserCreations, toggleLikeCreation } from '../Controllers/userControllers.js';
import { authUser } from '../Middleware/auth.js';
const userRoutes = express.Router();


userRoutes.get('/get-user-creations',authUser,getUserCreations);
userRoutes.get('/get-publish-creations',getPublishCreations);
userRoutes.post('/toggle-like-creations',toggleLikeCreation);


export default userRoutes;