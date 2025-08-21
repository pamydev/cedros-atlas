import {
 Constructos
} from "winnetoujs/src/constructos.js";
export class $fileExplorer extends Constructos {
 // ========================================
 /**
  * 
  * @param {object} elements
  * @param {any} elements.title  
  * @param {object} [options]
  * @param {string} [options.identifier]
  */
 constructor (elements, options) {
  super();
  /**@protected */
  this.identifier = this._getIdentifier(options ?
   options.identifier || "notSet" : "notSet");
  const digestedPropsToString = this
   ._mutableToString(elements);
  /**@protected */
  this.component = this.code(
   digestedPropsToString);
  this._saveUsingMutable(
   `fileExplorer-win-${this.identifier}`,
   elements, options, $fileExplorer);
 }
 /**
  * Generate the HTML code for this constructo
  * @param {*} props - The properties object containing all prop values
  * @returns {string} The HTML template string with interpolated values
  * @protected
  */
 code (props) {
  return `
  <div id="fileExplorer-win-${this.identifier}" class="fileExplorer">
    <div class="__title">${props?.title || ""}</div>
    <div id="output-win-${this.identifier}" class="__output"></div>
  </div>
`;
 }
 /**
  * Create Winnetou Constructo
  * @param  {object|string} output The node or list of nodes where the component will be created
  * @param  {object} [options] Options to control how the construct is inserted. Optional.
  * @param  {boolean} [options.clear] Clean the node before inserting the construct
  * @param  {boolean} [options.reverse] Place the construct in front of other constructs
  */
 create (output, options) {
  this.attachToDOM(this.component, output,
   options);
  return {
   ids: {
    fileExplorer: `fileExplorer-win-${this.identifier}`,
    output: `output-win-${this.identifier}`,
   },
  };
 }
 /**
  * Get the constructo as a string
  * @returns {string} The component HTML string
  */
 constructoString () {
  return this.component;
 }
}
export class $fileExplorerItem extends Constructos {
 // ========================================
 /**
  * item
  * @param {object} elements
  * @param {'striped'|''} [elements.stripe]  
  * @param {any} elements.icon_src  
  * @param {any} elements.name  
  * @param {any} elements.size  
  * @param {object} [options]
  * @param {string} [options.identifier]
  */
 constructor (elements, options) {
  super();
  /**@protected */
  this.identifier = this._getIdentifier(options ?
   options.identifier || "notSet" : "notSet");
  const digestedPropsToString = this
   ._mutableToString(elements);
  /**@protected */
  this.component = this.code(
   digestedPropsToString);
  this._saveUsingMutable(
   `fileExplorerItem-win-${this.identifier}`,
   elements, options, $fileExplorerItem);
 }
 /**
  * Generate the HTML code for this constructo
  * @param {*} props - The properties object containing all prop values
  * @returns {string} The HTML template string with interpolated values
  * @protected
  */
 code (props) {
  return `
  <div     id="fileExplorerItem-win-${this.identifier}"
    class="fileExplorerItem ${props?.stripe || ""}">
    <span class="__icon">
      <img src="${props?.icon_src || ""}" >
    </span>
    <span class="__name">${props?.name || ""}</span>
    <span class="__size">${props?.size || ""}</span>
  </div>
`;
 }
 /**
  * Create Winnetou Constructo
  * @param  {object|string} output The node or list of nodes where the component will be created
  * @param  {object} [options] Options to control how the construct is inserted. Optional.
  * @param  {boolean} [options.clear] Clean the node before inserting the construct
  * @param  {boolean} [options.reverse] Place the construct in front of other constructs
  */
 create (output, options) {
  this.attachToDOM(this.component, output,
   options);
  return {
   ids: {
    fileExplorerItem: `fileExplorerItem-win-${this.identifier}`,
   },
  };
 }
 /**
  * Get the constructo as a string
  * @returns {string} The component HTML string
  */
 constructoString () {
  return this.component;
 }
}
