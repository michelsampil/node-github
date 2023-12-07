// src/controllers/searchReposController.ts

import { Request, Response } from "express";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function searchRepos(req: Request, res: Response) {
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
}
