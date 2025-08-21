// File Explorer Sorting Functions
// All functions ensure files come first, then folders

export interface FileExplorerItem {
  name: string;
  type: "file" | "folder";
  size?: number;
}

export type SortOrder = "asc" | "desc";

/**
 * Sort by alphabetical order (files first, then folders)
 * @param items Array of file explorer items
 * @returns Sorted array with files first (A-Z), then folders (A-Z)
 */
export function sortByAlphabetic(
  items: FileExplorerItem[]
): FileExplorerItem[] {
  return items.sort((a, b) => {
    // Files first, folders after
    if (a.type === "file" && b.type === "folder") return -1;
    if (a.type === "folder" && b.type === "file") return 1;

    // If both are same type, sort alphabetically by name
    return a.name.localeCompare(b.name);
  });
}

/**
 * Sort by file type/extension (files first, then folders)
 * @param items Array of file explorer items
 * @returns Sorted array with files grouped by extension, then folders (A-Z)
 */
export function sortByFileType(items: FileExplorerItem[]): FileExplorerItem[] {
  return items.sort((a, b) => {
    // Files first, folders after
    if (a.type === "file" && b.type === "folder") return -1;
    if (a.type === "folder" && b.type === "file") return 1;

    // If both are folders, sort alphabetically
    if (a.type === "folder" && b.type === "folder") {
      return a.name.localeCompare(b.name);
    }

    // If both are files, sort by extension, then by name
    if (a.type === "file" && b.type === "file") {
      const aExt = a.name.split(".").pop()?.toLowerCase() || "";
      const bExt = b.name.split(".").pop()?.toLowerCase() || "";

      // First sort by extension
      if (aExt !== bExt) {
        return aExt.localeCompare(bExt);
      }

      // If same extension, sort by name
      return a.name.localeCompare(b.name);
    }

    return 0;
  });
}

/**
 * Sort by file size (files first, then folders)
 * @param items Array of file explorer items
 * @param order Sort order: "asc" for smallest first, "desc" for largest first (default: "desc")
 * @returns Sorted array with files by size, then folders (A-Z)
 */
export function sortBySize(
  items: FileExplorerItem[],
  order: SortOrder = "desc"
): FileExplorerItem[] {
  return items.sort((a, b) => {
    // Files first, folders after
    if (a.type === "file" && b.type === "folder") return -1;
    if (a.type === "folder" && b.type === "file") return 1;

    // If both are folders, sort alphabetically
    if (a.type === "folder" && b.type === "folder") {
      return a.name.localeCompare(b.name);
    }

    // If both are files, sort by size according to order
    if (a.type === "file" && b.type === "file") {
      const aSize = a.size || 0;
      const bSize = b.size || 0;

      // Sort by size according to order parameter
      if (aSize !== bSize) {
        return order === "desc" ? bSize - aSize : aSize - bSize;
      }

      // If same size, sort by name
      return a.name.localeCompare(b.name);
    }

    return 0;
  });
}
