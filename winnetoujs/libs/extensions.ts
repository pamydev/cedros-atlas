/**
 * Extracts the file extension from a filename or file path
 * @param filename - The filename or file path
 * @returns The file extension without the dot, or "File" if no extension or dotfile
 */
export function getFileExtension(filename: string): string {
  if (!filename || typeof filename !== "string") {
    return "File";
  }

  const lastDotIndex = filename.lastIndexOf(".");
  const lastSlashIndex = Math.max(
    filename.lastIndexOf("/"),
    filename.lastIndexOf("\\")
  );

  // If there's no dot, or the dot is before the last slash (part of directory name)
  if (lastDotIndex === -1 || lastDotIndex < lastSlashIndex) {
    return "File";
  }

  // Get the filename part (after the last slash)
  const filenameOnly = filename.substring(lastSlashIndex + 1);

  // If the dot is at the beginning of the filename (dotfile like .bashrc)
  if (filenameOnly.indexOf(".") === 0) {
    return "File";
  }

  return filename.substring(lastDotIndex + 1).toLowerCase();
}
