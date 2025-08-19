import { getHome } from "../model/fileExplorerCore.js";

/**
 *
 * @returns {Promise.<{pass:boolean,error:any}>}
 */
export const getHomeTest = async () => {
  let res = await getHome();
  let testPass = false;
  if (res.success && typeof res.data[0] && !res.error) {
    testPass = true;
  }
  return { pass: testPass, error: res.error };
};
