class InternalDataStore {
  constructor() {
    this._subscribers = {};
    this._dataStore = {};
  }

  subscribe(key, callback) {
    if (!callback) return;
    let localKey;
    if (!key || typeof key !== "string") {
      localKey = "__global";
    } else {
      localKey = key;
    }
    if (!this._subscribers[localKey]) {
      this._subscribers[localKey] = [];
    }
    this._subscribers[localKey] = [...this._subscribers[localKey], callback];
  }

  set(key, value) {
    if (!key || typeof key !== "string") {
      return;
    }
    this._dataStore[key] = value;
  }

  get(key) {
    if (!key || typeof key !== "string") {
      return;
    }
    return this._dataStore[key];
  }
}

function proxySet(target, key, value)  {
  target.set(key, value);
  if (target._subscribers[key]) {
    target._subscribers[key].forEach((callback) => callback(value));
  }
  if (target._subscribers.__global) {
    target._subscribers.__global.forEach((callback) => callback(value));
  }
  return true;
};

export const store = new Proxy(new InternalDataStore(), {
  get: (target, key) => {
    if (key === "_subscribers") {
      return target._subscribers;
    }
    if (key === "_dataStore") {
      return target._dataStore;
    }
    if (key === "subscribe") {
      return target.subscribe;
    }
    if (key === "get") {
      return target.get;
    }
    if (key === "set") {
      return proxySet.bind(null, target);
    }
  },
  set: proxySet,  
});