// src/routes/githubRoutes.ts

import express from "express";
import { getReposByUsername } from "../controllers/reposController";
import { searchRepos } from "../controllers/searchReposController";
import { searchUsers } from "../controllers/searchUsersController";

const router = express.Router();

router.get("/repos/:username", getReposByUsername);
router.get("/search/repos", searchRepos);
router.get("/search/users", searchUsers);

export default router;
