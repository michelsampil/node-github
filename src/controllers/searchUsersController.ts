// src/controllers/searchUsersController.ts

import { Request, Response } from "express";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function searchUsers(req: Request, res: Response) {
  const { userName } = req.query;

  try {
    if (!userName || userName?.length === 0) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const { data: users } = await octokit.rest.search.users({
      q: userName as any,
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
