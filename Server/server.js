// Main Server 


import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRoutes from "./Routes/aiRoutes.js";
import cloudinaryConnection from "./Config/cloudinary.js";
import fs from 'fs';
import path from 'path';
import userRoutes from "./Routes/userRoutes.js";



const app = express();
const port = process.env.PORT || 8080;


app.use(express.json({ limit: '50mb' })); // Increase the limit to 50MB




app.use(
  cors({
    origin: true, // Allow all origins (Vercel domains are dynamic)
    credentials: true,
  })
);
app.use(clerkMiddleware());

await cloudinaryConnection();

// Check Route  
app.get("/", async (req, res) => {
  res.send("Server Running");
});


app.use(requireAuth()); // This will ensure that all routes after this line require authentication
// This is used to protect the routes and only authorized users can access these routes
app.use("/api/ai", aiRoutes);
app.use('/api/user', userRoutes)

app.listen(port, () => {
  console.log("Server is running on port", port);
  console.log("Visit http://localhost:" + port);
});

export default app; // Required by Vercel
