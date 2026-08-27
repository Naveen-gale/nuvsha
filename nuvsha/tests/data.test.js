import test from 'node:test';
import assert from 'node:assert';
import { data, createComponent, setContext, clearContext } from '../src/runtime/index.js';

test('data() initializes with loading state and executes immediately', async () => {
  let resolvePromise;
  const promiseFn = () => new Promise(resolve => {
    resolvePromise = resolve;
  });

  const state = data(promiseFn);

  assert.strictEqual(state.loading, true);
  assert.strictEqual(state.data, null);
  assert.strictEqual(state.error, null);
  assert.strictEqual(typeof state.reload, 'function');

  resolvePromise('hello');
  
  // Wait for microtasks
  await new Promise(r => setTimeout(r, 0));

  assert.strictEqual(state.loading, false);
  assert.strictEqual(state.data, 'hello');
  assert.strictEqual(state.error, null);
});

test('data() calls component $update upon resolution', async () => {
  let updateCount = 0;
  const mockUpdate = () => { updateCount++; };

  setContext(mockUpdate);

  let resolvePromise;
  const promiseFn = () => new Promise(resolve => {
    resolvePromise = resolve;
  });

  const state = data(promiseFn);
  clearContext();

  // Initial call triggers an update? No, $update inside reload() is called, wait, is it?
  // Let's see: `data()` calls `state.reload()` synchronously which sets loading=true and calls $update.
  assert.strictEqual(updateCount, 1);

  resolvePromise('world');
  await new Promise(r => setTimeout(r, 0));

  // Resolved, loading=false, should call $update again
  assert.strictEqual(updateCount, 2);
  assert.strictEqual(state.data, 'world');
});

test('data() handles errors and calls $update', async () => {
  let updateCount = 0;
  setContext(() => { updateCount++; });

  let rejectPromise;
  const promiseFn = () => new Promise((resolve, reject) => {
    rejectPromise = reject;
  });

  const state = data(promiseFn);
  clearContext();

  assert.strictEqual(updateCount, 1);

  rejectPromise(new Error('fail'));
  await new Promise(r => setTimeout(r, 0));

  assert.strictEqual(updateCount, 2);
  assert.strictEqual(state.loading, false);
  assert.strictEqual(state.error.message, 'fail');
});
