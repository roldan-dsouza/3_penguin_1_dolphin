import express from "express";
import { simplifyContent } from "../controller/simplify.controller.mjs";

const router = express.Router();

router.post("/", simplifyContent);

export default router;
