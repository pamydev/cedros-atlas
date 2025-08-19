import { promises as fs } from "fs";
import path from "path";
import os from "os";
export const getHome = async () => {
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

    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
