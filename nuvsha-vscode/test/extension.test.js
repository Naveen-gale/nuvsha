const assert = require('assert');
const path = require('path');
const fs = require('fs');
const module_ = require('module');

// Mock 'vscode' module so requiring src files doesn't throw
const originalRequire = module_.prototype.require;
module_.prototype.require = function(id) {
    if (id === 'vscode') {
        return {
            window: {},
            workspace: {},
            languages: {}
        };
    }
    return originalRequire.apply(this, arguments);
};

describe('Nuvsha VS Code Extension Foundation', () => {
    it('should have a valid package.json', () => {
        const packagePath = path.join(__dirname, '..', 'package.json');
        assert.ok(fs.existsSync(packagePath));
        const pkg = require(packagePath);
        assert.strictEqual(pkg.name, 'nuvsha');
        assert.ok(pkg.contributes.languages.some(lang => lang.id === 'nuvsha'));
    });

    it('should have the syntax grammar file', () => {
        const syntaxPath = path.join(__dirname, '..', 'syntaxes', 'nuvsha.tmLanguage.json');
        assert.ok(fs.existsSync(syntaxPath));
        const syntax = require(syntaxPath);
        assert.strictEqual(syntax.name, 'Nuvsha');
    });

    it('should have the snippets file', () => {
        const snippetsPath = path.join(__dirname, '..', 'snippets', 'nuvsha.json');
        assert.ok(fs.existsSync(snippetsPath));
    });

    it('should have the entry point module', () => {
        const ext = require('../src/extension.js');
        assert.ok(typeof ext.activate === 'function');
    });

    it('should clearly distinguish between implemented and planned features', () => {
        // Basic structure is implemented.
        // Diagnostics, completion, definition, hover are PLANNED.
        const completion = require('../src/completion.js');
        assert.ok(typeof completion.registerCompletion === 'function', 'Completion architecture is planned and exists');
        
        const diagnostics = require('../src/diagnostics.js');
        assert.ok(typeof diagnostics.registerDiagnostics === 'function', 'Diagnostics architecture is planned and exists');
    });
});
