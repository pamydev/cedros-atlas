import express from "express";
import { getHome } from "../model/fileExplorerCore.js";
const fs = require("fs").promises;
const path = require("path");
const os = require("os");

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
