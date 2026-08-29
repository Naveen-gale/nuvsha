import test from 'node:test';
import assert from 'node:assert';
import { form } from '../src/runtime/form.js';
import { setContext, clearContext } from '../src/runtime/state.js';

test('Form primitive: initializes with correct state', (t) => {
  const login = form({ email: 'test@test.com', password: '' });
  
  assert.strictEqual(login.email, 'test@test.com');
  assert.strictEqual(login.password, '');
  assert.strictEqual(login.loading, false);
  assert.strictEqual(login.error, null);
  assert.strictEqual(login.success, false);
});

test('Form primitive: exposes values dynamically', (t) => {
  const login = form({ email: 'test@test.com' });
  
  // Developer binds to login.email
  login.email = 'new@test.com';
  
  // values should reflect the update
  assert.strictEqual(login.values.email, 'new@test.com');
  
  // values should not include form metadata
  assert.strictEqual(login.values.loading, undefined);
  assert.strictEqual(login.values.submit, undefined);
});

test('Form primitive: handles successful submission', async (t) => {
  let updateCount = 0;
  setContext(() => { updateCount++; });
  
  const login = form({ email: 'test@test.com' });
  
  const res = await login.submit(async (values) => {
    assert.strictEqual(values.email, 'test@test.com');
    assert.strictEqual(login.loading, true);
    return 'Success';
  });
  
  assert.strictEqual(res, 'Success');
  assert.strictEqual(login.loading, false);
  assert.strictEqual(login.success, true);
  assert.strictEqual(login.error, null);
  
  clearContext();
});

test('Form primitive: handles failed submission', async (t) => {
  let updateCount = 0;
  setContext(() => { updateCount++; });
  
  const login = form({ email: 'test@test.com' });
  
  await login.submit(async () => {
    throw new Error('Invalid credentials');
  });
  
  assert.strictEqual(login.loading, false);
  assert.strictEqual(login.success, false);
  assert.strictEqual(login.error, 'Invalid credentials');
  
  clearContext();
});

test('Form primitive: handles reset', (t) => {
  const login = form({ email: 'test@test.com' });
  
  login.email = 'changed@test.com';
  login.error = 'Some error';
  login.success = true;
  
  login.reset();
  
  assert.strictEqual(login.email, 'test@test.com');
  assert.strictEqual(login.error, null);
  assert.strictEqual(login.success, false);
});
