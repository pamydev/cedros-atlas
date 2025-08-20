import { BrowserWindow } from "electron";

/**
 *
 * @param {BrowserWindow} __window
 * @returns []
 */
export const template = __window => [
  {
    label: "Custom",
    submenu: [
      {
        label: "Say Hello",
        click: () => {
          console.log("Hello from main process!");
        },
      },
    ],
  },
];
