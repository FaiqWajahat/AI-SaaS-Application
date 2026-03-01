// Here we define all the Ai cotrollers

import { clerkClient } from "@clerk/express";
import sqlDatabase from "../Database/db.js";
import OpenAI from "openai";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

// setting up the openAI

const AI = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Write Article controller is defined here
export const writeArticle = async (req, res) => {
  try {
    const { userId } = await req.auth();
    console.log(userId);
    const { prompt, length } =  req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan === "free" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. upgrade to continue",
      });
    }

    const response = await AI.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
      max_tokens: parseInt(length, 10),
    });

    const content = response.choices[0].message.content;

    await sqlDatabase`INSERT INTO creations(user_id, prompt,content, type)
VALUES(${userId},${prompt},${content},'article')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message:error.message});
  }
};

// Blog titles controller is defined here
export const BlogTitles = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { prompt } = await req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan === "free" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. upgrade to continue",
      });
    }

    const response = await AI.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sqlDatabase`INSERT INTO creations(user_id, prompt,content, type)
VALUES(${userId},${prompt},${content},'blog-title')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message:error.message });
  }
};

// generate image controller is defined here
export const GenerateIamge = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { prompt, publish } = await req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Unlock this feature by upgrading to Premium.",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: { "x-api-key": process.env.CLIP_DROP_API },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;
    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sqlDatabase`INSERT INTO creations(user_id, prompt,content, type,publish)
VALUES(${userId},${prompt},${secure_url},'image',${publish ?? false})`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    res.json({ success: false, error });
  }
};

//  remove backgound image controller is defined here
export const removeBackgronud = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const image = req.file;
    const plan = req.plan;

    if (plan === "free") {
      return res.json({
        success: false,
        message: "Unlock this feature by upgrading to Premium.",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
  background_removal: "cloudinary_ai",
  transformation: [
    { width: 500, crop: "scale" } // Optional resizing
  ],
});

    await sqlDatabase`INSERT INTO creations(user_id, prompt,content, type)
VALUES(${userId},'Remove background from the image ',${secure_url},'image')`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    res.json({ success: false, error });
  }
};

//  remove object from the image controller is defined here
export const objectRemoval = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const image = req.file;
    const { object } = req.body;
    const plan = req.plan;

    if (plan === "free") {
      return res.json({
        success: false,
        message: "Unlock this feature by upgrading to Premium.",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: `gen_remove:${object}`,
        },
      ],
      resource_type: "image",
    });

    await sqlDatabase`INSERT INTO creations(user_id, prompt,content, type)
    VALUES(${userId}, ${`Remove ${object} from the image`} ,${secure_url},'image')`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const resumeAnalyzer = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (plan === "free") {
      return res.json({
        success: false,
        message: "Unlock this feature by upgrading to Premium.",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceed with the limit (5MB)",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const resumeData = await pdf(dataBuffer);

    const prompt = `
  Read the following resume carefully and provide constructive feedback 
  on its strengths, weaknesses, and areas of improvement.

  Resume Content:

  ${resumeData.text}
`;

    const response = await AI.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sqlDatabase`INSERT INTO creations(user_id, prompt,content, type)
    VALUES(${userId}, ${`Review the resume`} ,${content},'resume')`;

    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, error });
  }
};
