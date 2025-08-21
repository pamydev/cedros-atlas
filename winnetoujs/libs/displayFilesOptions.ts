import { FileExplorerItem } from "./sorts";

/**
 * Filter out hidden files and folders (those starting with a dot)
 * @param items Array of file explorer items
 * @returns Filtered array without hidden files/folders
 */
export function hideHiddenFiles(items: FileExplorerItem[]): FileExplorerItem[] {
  return items.filter(item => !item.name.startsWith("."));
}

/**
 * Show all files including hidden ones (those starting with a dot)
 * @param items Array of file explorer items
 * @returns Original array (no filtering)
 */
export function showAllFiles(items: FileExplorerItem[]): FileExplorerItem[] {
  return items;
}

/**
 * Filter files based on visibility preference
 * @param items Array of file explorer items
 * @param showHidden Whether to show hidden files (default: false)
 * @returns Filtered array based on visibility preference
 */
export function filterByVisibility(
  items: FileExplorerItem[],
  showHidden: boolean = false
): FileExplorerItem[] {
  return showHidden ? showAllFiles(items) : hideHiddenFiles(items);
}
