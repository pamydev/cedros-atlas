import express from "express";
import { getHome } from "../model/fileExplorerCore.js";
import { promises as fs } from "fs";
import path from "path";
import os from "os";

/**
 *
 * @param {express.Express} app
 */
export const fileExplorerRoutes = app => {
  app.get("/fileExplorer/get/home", async (request, response) => {
    const res = await getHome();
    return response.json(res);
  });
};
