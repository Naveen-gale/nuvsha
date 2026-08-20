const watchers = new Set();

/**
 * Registers an expression to be watched for changes.
 * @param {Function} getter - A function that returns the current value of the expression
 * @param {Function} callback - A function that updates the DOM with the new value
 */
export function $watch(getter, callback) {
  let currentValue = getter();
  
  const watcher = {
    getter,
    callback,
    lastValue: currentValue
  };
  
  watchers.add(watcher);
}

/**
 * Evaluates all watched expressions. If any have changed, their callback is fired.
 */
export function $update() {
  for (const watcher of watchers) {
    const newValue = watcher.getter();
    if (newValue !== watcher.lastValue) {
      watcher.lastValue = newValue;
      watcher.callback(newValue);
    }
  }
}
