import express from "express";
import {upload} from "../Config/multer.js"
import { authUser } from "../Middleware/auth.js";
import {
  BlogTitles,
  GenerateIamge,
  objectRemoval,
  removeBackgronud,
  resumeAnalyzer,
  writeArticle,
} from "../Controllers/aiControllers.js";
const aiRoutes = express.Router();

aiRoutes.post("/generate-article", authUser, writeArticle);
aiRoutes.post("/generate-blog-titles", authUser, BlogTitles);
aiRoutes.post("/generate-image", authUser, GenerateIamge);
aiRoutes.post("/remove-background",upload.single('image'), authUser, removeBackgronud );
aiRoutes.post("/remove-object",upload.single('image'), authUser, objectRemoval);
aiRoutes.post("/resume-analyzer",upload.single('resume'), authUser, resumeAnalyzer);



export default aiRoutes;
