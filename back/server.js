import express from "express";
import cors from "cors";
import dotenv from "dotenv";



dotenv.config();
//midleware
app.use(cors());
app.use(express.json());