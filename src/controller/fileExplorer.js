import express from "express";
const fs = require("fs").promises;
const path = require("path");
const os = require("os");

/**
 *
 * @param {express.Express} app
 */
export const fileExplorerRoutes = app => {
  app.get("/fileExplorer/get/home", async (request, response) => {
    try {
      const homeDir = os.homedir();
      const items = await fs.readdir(homeDir, { withFileTypes: true });

      const result = await Promise.all(
        items.map(async item => {
          const itemPath = path.join(homeDir, item.name);
          const stats = await fs.stat(itemPath);
          return {
            name: item.name,
            type: item.isDirectory() ? "folder" : "file",
            path: itemPath,
            size: stats.size, // Add file size
          };
        })
      );

      response.json({ success: true, data: result });
    } catch (error) {
      response.status(500).json({ success: false, error: error.message });
    }
  });
};
