import test from 'node:test';
import assert from 'node:assert';
import { compile } from '../src/compiler/index.js';
import { NuvshaError } from '../src/compiler/error.js';

test('Lexer throws NV1004 for unclosed expression', () => {
  const code = `<p>{name</p>`;
  assert.throws(
    () => compile(code, 'src/App.nuv'),
    (err) => {
      assert.strictEqual(err.name, 'NuvshaError');
      assert.strictEqual(err.code, 'NV1004');
      assert.strictEqual(err.line, 1);
      assert.strictEqual(err.column, 4);
      return true;
    }
  );
});

test('Lexer throws NV1009 for invalid attribute syntax', () => {
  const code = `<button onclick=>`;
  assert.throws(
    () => compile(code, 'src/App.nuv'),
    (err) => {
      assert.strictEqual(err.name, 'NuvshaError');
      assert.strictEqual(err.code, 'NV1009');
      return true;
    }
  );
});

test('Parser throws NV1003 for missing closing tag', () => {
  const code = `<div>
  <h1>Hello</div>`;
  assert.throws(
    () => compile(code, 'src/App.nuv'),
    (err) => {
      assert.strictEqual(err.name, 'NuvshaError');
      assert.strictEqual(err.code, 'NV1003');
      assert.strictEqual(err.line, 2);
      assert.strictEqual(err.column, 12);
      assert.match(err.hint, /Expected <\/h1> but found <\/div>/);
      return true;
    }
  );
});

test('Parser throws NV1003 for unclosed {if}', () => {
  const code = `{if show}
  <p>Hello</p>`;
  assert.throws(
    () => compile(code, 'src/App.nuv'),
    (err) => {
      assert.strictEqual(err.name, 'NuvshaError');
      assert.strictEqual(err.code, 'NV1003');
      assert.match(err.hint, /Expected to find {\/if} to close the block/);
      return true;
    }
  );
});

test('Parser throws NV1007 for unexpected {else}', () => {
  const code = `{else}`;
  assert.throws(
    () => compile(code, 'src/App.nuv'),
    (err) => {
      assert.strictEqual(err.name, 'NuvshaError');
      assert.strictEqual(err.code, 'NV1007');
      assert.match(err.hint, /Ensure {else} is placed inside an {if} block/);
      return true;
    }
  );
});

test('Parser throws NV1008 for invalid {for}', () => {
  const code = `{for item items}
  <p>{item}</p>
{/for}`;
  assert.throws(
    () => compile(code, 'src/App.nuv'),
    (err) => {
      assert.strictEqual(err.name, 'NuvshaError');
      assert.strictEqual(err.code, 'NV1008');
      assert.match(err.hint, /Expected syntax: {for item of items}/);
      return true;
    }
  );
});

test('Parser throws NV1002 for unexpected closing tag', () => {
  const code = `</div>`;
  assert.throws(
    () => compile(code, 'src/App.nuv'),
    (err) => {
      assert.strictEqual(err.name, 'NuvshaError');
      assert.strictEqual(err.code, 'NV1002');
      assert.match(err.hint, /There are no open tags to close/);
      return true;
    }
  );
});
