import { getHome } from "../model/fileExplorerCore.js";

export const getHomeTest = async () => {
  let res = await getHome();
  console.log(res);
  return true;
};
