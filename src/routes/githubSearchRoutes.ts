import { Octokit } from "octokit";
import express from "express";

const router = express.Router();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

// GET ALL THE REPOS FROM A SPECIFIC USER
router.get("/repos/:username", async (req, res) => {
  const username = req.params.username;

  console.log("hitted");

  try {
    const { data: repos } = await octokit.rest.repos.listForUser({ username });
    res.json(repos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET ALL THE REPOS WITH THE REQUESTED REPO NAME
router.get("/search/repos", async (req, res) => {
  const { repositoryName } = req.query;

  try {
    if (!repositoryName || repositoryName?.length === 0) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const { data: repos } = await octokit.rest.search.repos({
      q: repositoryName as any,
    });
    res.json(repos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET ALL THE USERS WITH THE REQUESTED USER NAME
router.get("/search/users", async (req, res) => {
  const { userName } = req.query;

  try {
    if (!userName || userName?.length === 0) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const { data: users } = await octokit.rest.search.users({
      q: userName as any,
    });

    res.json(users);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
