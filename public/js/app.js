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
  }
};
//# sourceMappingURL=app.js.map
