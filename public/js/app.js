// node_modules/winnetoujs/modules/translations.js
var updateTranslations = async (args) => {
  const get = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "GET"
      }).then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          return reject("Translation file not found. Code error kj438dj.");
        }
      }).then(function(data) {
        return resolve(data);
      }).catch(function(error) {
        return reject("Translation file not found. Code error kj438dssj.");
      });
    });
  };
  return new Promise(async (resolve, reject) => {
    if (!window.localStorage.getItem("lang")) return resolve(true);
    const localLang = window.localStorage.getItem("lang");
    const file = `${args.translationsPublicPath}/${localLang}.json`;
    let data;
    try {
      data = await get(file);
    } catch (e) {
      console.warn(
        `WinnetouJs translations error. Reloading... The file '${file}' was not found.`
      );
      window.localStorage.removeItem("lang");
      setTimeout(() => {
        location.reload();
      }, 200);
    }
    Object.keys(data).map((key) => {
      let value = data[key];
      args.stringsClass[key] = value;
    });
    return resolve(true);
  });
};

// node_modules/winnetoujs/src/winnetou.js
var Winnetou_ = class {
  constructor() {
    this.constructoId = 0;
    this.mutable = [];
    this.usingMutable = [];
    this.storedEvents = [];
    this.strings = {};
    this.observer;
  }
  setMutable(mutable, value, localStorage) {
    if (localStorage !== false && localStorage !== "notPersistent") {
      window.localStorage.setItem(`mutable_${mutable}`, value);
    }
    if (localStorage === false || localStorage === "notPersistent") {
      this.mutable[mutable] = value;
    }
    if (this.usingMutable[mutable]) {
      let tmpArr = this.usingMutable[mutable];
      this.usingMutable[mutable] = [];
      tmpArr.forEach((item) => {
        let old_ = document.getElementById(item.pureId);
        if (old_ == null) return;
        let new_ = document.createRange().createContextualFragment(
          new item.method(item.elements, item.options).constructoString()
        );
        this.replace(new_, old_);
      });
    }
  }
  initMutable(value) {
    let name = ((/* @__PURE__ */ new Date()).getMilliseconds() * Math.random() * 1e4).toFixed(
      0
    );
    this.setMutable(name, value, "notPersistent");
    return name;
  }
  setMutableNotPersistent(mutable, value) {
    this.setMutable(mutable, value, "notPersistent");
  }
  getMutable(mutable) {
    if (window.localStorage.getItem(`mutable_${mutable}`) || window.localStorage.getItem(`mutable_${mutable}`) === "") {
      return window.localStorage.getItem(`mutable_${mutable}`);
    } else if (this.mutable[mutable] || this.mutable[mutable] === "") {
      return this.mutable[mutable];
    } else {
      return null;
    }
  }
  mutations = {
    /**
     * Starts the entire app constructos removal watch events. This method is only called once, even if you instantiate it several times. Only works if your main app element is 'app'.
     * @returns {boolean}
     */
    start: () => {
      if (this.observer) return;
      this.observer = new MutationObserver((mutationsArray) => {
        try {
          mutationsArray.forEach((MutationRecord) => {
            MutationRecord.removedNodes.forEach((removedNode) => {
              let removedId = removedNode instanceof Element ? removedNode.id : null;
              document.getElementById("app").dispatchEvent(
                new CustomEvent("constructoRemoved", {
                  detail: { removedId }
                })
              );
            });
          });
        } catch (e) {
        }
      });
      this.observer.disconnect();
      this.observer.observe(document.getElementById("app"), {
        childList: true,
        subtree: true
      });
      return true;
    },
    /**
     * Add a remove event binding to constructo
     * @param {string} id constructo id that will be watched
     * @param {function} callback the function that will be called when constructo is removed
     * @returns {boolean}
     */
    onRemove: (id, callback) => {
      const controller = new AbortController();
      const signal = controller.signal;
      document.getElementById("app").addEventListener(
        "constructoRemoved",
        /**
         *
         * @param {CustomEvent} data
         */
        (data) => {
          if (id === data.detail.removedId) {
            callback();
            controller.abort();
          }
        },
        {
          signal
        }
      );
      return true;
    },
    /**
     * Remove the main listener from app.
     * Using this method is discouraged as
     * it may break your app elsewhere in the code.
     * Use it at your own risk.
     */
    destroy: () => {
      setTimeout(() => {
        this.observer.disconnect();
        this.observer = null;
      }, 100);
    }
  };
  replace(new_, old_) {
    if (old_ && old_.parentNode) {
      let ele_ = old_.parentNode;
      ele_.replaceChild(new_, old_);
    }
  }
  fx(function_, ...args) {
    let name = "winnetouFx" + ((/* @__PURE__ */ new Date()).getMilliseconds() * Math.random() * 1e4).toFixed(0);
    window[name] = function_;
    return `${name}(${args.map((x) => x === "this" ? `this` : `'${x}'`).join(",")})`;
  }
};
var Winnetou = new Winnetou_();
var W = Winnetou;

// src/strings.js
var strings_default = W.strings = {
  // Common UI elements
  save: "Save",
  cancel: "Cancel",
  delete: "Delete",
  edit: "Edit",
  create: "Create",
  update: "Update",
  close: "Close",
  open: "Open",
  // Navigation
  home: "Home",
  back: "Back",
  next: "Next",
  previous: "Previous",
  menu: "Menu",
  // Form elements
  name: "Name",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm Password",
  username: "Username",
  search: "Search",
  submit: "Submit",
  reset: "Reset",
  // Messages
  welcome: "Welcome",
  loading: "Loading...",
  error: "An error occurred",
  success: "Operation completed successfully",
  noData: "No data available",
  confirmDelete: "Are you sure you want to delete this item?",
  // Validation messages
  required: "This field is required",
  invalidEmail: "Please enter a valid email address",
  passwordMismatch: "Passwords do not match",
  minLength: "Minimum length required",
  // Date and time
  today: "Today",
  yesterday: "Yesterday",
  tomorrow: "Tomorrow",
  date: "Date",
  time: "Time",
  // Status messages
  online: "Online",
  offline: "Offline",
  connecting: "Connecting...",
  connected: "Connected",
  disconnected: "Disconnected"
};

// node_modules/winnetoujs/src/constructos.js
var Constructos = class {
  /**
   *
   * Digest all constructo props to find
   * {mutable:"string"} pattern in order to
   * change it to W.getMutable("string") value
   * @param {object} constructoProps
   * @protected
   */
  _mutableToString(constructoProps) {
    if (constructoProps) {
      let jsonElements = JSON.parse(JSON.stringify(constructoProps));
      Object.keys(constructoProps).forEach((item) => {
        if (typeof constructoProps[item] === "object" && constructoProps[item] !== null) {
          let mutable = constructoProps[item].mutable;
          let val;
          Winnetou.getMutable(mutable) || Winnetou.getMutable(mutable) === "" ? val = Winnetou.getMutable(mutable) : val = `Mutable "${mutable}" not initialized yet.`;
          jsonElements[item] = val;
        }
      });
      return jsonElements;
    } else {
      return constructoProps;
    }
  }
  /**
   * Store constructos that using mutables
   * in Winnetou.usingMutable var in order to
   * update constructo when W.setMutable
   * if triggered.
   * @param {*} pureId
   * @param {*} elements
   * @param {*} options
   * @param {*} method
   * @protected
   */
  _saveUsingMutable(pureId, elements, options, method) {
    if (elements) {
      Object.keys(elements).forEach((item) => {
        if (typeof elements[item] === "object" && elements[item] !== null) {
          if (!Winnetou.usingMutable[elements[item].mutable])
            Winnetou.usingMutable[elements[item].mutable] = [];
          let obj = {
            pureId,
            elements,
            options,
            method
          };
          if (Winnetou.usingMutable[elements[item].mutable].filter(
            (x) => x.pureId == pureId
          ).length > 0) {
          } else {
            Winnetou.usingMutable[elements[item].mutable].push(obj);
          }
        }
      });
    }
    if (options) {
      Object.keys(options).forEach((item) => {
        if (typeof options[item] === "object" && options[item] !== null) {
          if (!Winnetou.usingMutable[options[item].mutable])
            Winnetou.usingMutable[options[item].mutable] = [];
          let obj = {
            pureId,
            elements,
            options,
            method
          };
          if (Winnetou.usingMutable[options[item].mutable].filter(
            (x) => x.pureId == pureId
          ).length > 0) {
          } else {
            Winnetou.usingMutable[options[item].mutable].push(obj);
          }
        }
      });
    }
  }
  /**
   * Generates a random identifier
   * @protected
   * @param  {string=} identifier
   */
  _getIdentifier(identifier) {
    if (identifier != "notSet") return identifier;
    else return ++Winnetou.constructoId;
  }
  /**
   * Utility to attach an HTML string into the DOM.
   * Supports special cases for table elements, replacement, clearing, and reverse insertion.
   * @protected
   */
  attachToDOM(component, output, options = {}) {
    const isTableElement = component.match(
      /^\s*?<tr|^\s*?<td|^\s*?<table|^\s*?<th|^\s*?<tbody|^\s*?<thead|^\s*?<tfoot/
    );
    function handleTableElements() {
      let el = document.querySelectorAll(output);
      if (el.length === 0) {
        el = document.querySelectorAll("#" + output);
      }
      el.forEach((item) => {
        if (options.clear) item.innerHTML = "";
        if (options.reverse) {
          item.innerHTML = component + item.innerHTML;
        } else {
          item.innerHTML += component;
        }
      });
    }
    function handleNormalElements() {
      const frag = document.createRange().createContextualFragment(component);
      if (typeof output !== "object") {
        let el = document.querySelectorAll(output);
        if (el.length === 0) el = document.querySelectorAll("#" + output);
        el.forEach((item) => {
          if (options.clear) item.innerHTML = "";
          if (options.reverse) {
            item.prepend(frag);
          } else {
            item.appendChild(frag);
          }
        });
      } else {
        if (options.clear) output.innerHTML = "";
        if (options.reverse) {
          output.prepend(frag);
        } else {
          output.appendChild(frag);
        }
      }
    }
    if (isTableElement) {
      handleTableElements();
    } else {
      handleNormalElements();
    }
  }
};

// src/common/common.wcto.js
var $div = class _$div extends Constructos {
  // ========================================
  /**
   * 
   * @param {object} [elements]
   * @param {string} [elements.class]  
   * @param {any} [elements.content]  
   * @param {object} [options]
   * @param {string} [options.identifier]
   */
  constructor(elements, options) {
    super();
    this.identifier = this._getIdentifier(options ? options.identifier || "notSet" : "notSet");
    const digestedPropsToString = this._mutableToString(elements);
    this.component = this.code(
      digestedPropsToString
    );
    this._saveUsingMutable(
      `div-win-${this.identifier}`,
      elements,
      options,
      _$div
    );
  }
  /**
   * Generate the HTML code for this constructo
   * @param {*} props - The properties object containing all prop values
   * @returns {string} The HTML template string with interpolated values
   * @protected
   */
  code(props) {
    return `
  <div id="div-win-${this.identifier}" class="${(props == null ? void 0 : props.class) || ""}">${(props == null ? void 0 : props.content) || ""}</div>
`;
  }
  /**
   * Create Winnetou Constructo
   * @param  {object|string} output The node or list of nodes where the component will be created
   * @param  {object} [options] Options to control how the construct is inserted. Optional.
   * @param  {boolean} [options.clear] Clean the node before inserting the construct
   * @param  {boolean} [options.reverse] Place the construct in front of other constructs
   */
  create(output, options) {
    this.attachToDOM(
      this.component,
      output,
      options
    );
    return {
      ids: {
        div: `div-win-${this.identifier}`
      }
    };
  }
  /**
   * Get the constructo as a string
   * @returns {string} The component HTML string
   */
  constructoString() {
    return this.component;
  }
};

// src/fileExplorer/fileExplorer.ts
var FileExplorer = class {
  output;
  constructor(args) {
    this.output = args.output;
  }
};

// src/app.ts
updateTranslations({
  stringsClass: strings_default,
  translationsPublicPath: "/translations"
}).then(() => {
  new app();
});
var app = class {
  constructor() {
    this.render();
  }
  render() {
    const mainDiv = new $div({ class: "mainDiv" }).create("#app").ids.div;
    const projectsDiv = new $div({
      class: "projectsDiv"
    }).create(mainDiv);
    const fileExplorerDiv = new $div({
      class: "fileExplorerDiv"
    }).create(mainDiv).ids.div;
    new FileExplorer({
      output: fileExplorerDiv
    });
  }
};
//# sourceMappingURL=app.js.map
