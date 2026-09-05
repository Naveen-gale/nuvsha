const assert = require('assert');
const path = require('path');
const fs = require('fs');

describe('Nuvsha Phase 17.3: TextMate Syntax Grammar', () => {
    let grammar;

    before(() => {
        const grammarPath = path.join(__dirname, '..', 'syntaxes', 'nuvsha.tmLanguage.json');
        assert.ok(fs.existsSync(grammarPath), 'Grammar file must exist');
        grammar = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));
    });

    it('should have valid top-level schema and scopeName', () => {
        assert.strictEqual(grammar.name, 'Nuvsha');
        assert.strictEqual(grammar.scopeName, 'source.nuvsha');
        assert.ok(Array.isArray(grammar.patterns), 'patterns must be an array');
        assert.ok(typeof grammar.repository === 'object', 'repository must be an object');
    });

    it('should compile all regexes in grammar without syntax errors', () => {
        function validateRegexes(obj, currentPath = 'root') {
            if (!obj || typeof obj !== 'object') return;

            if (typeof obj.match === 'string') {
                assert.doesNotThrow(() => {
                    new RegExp(obj.match);
                }, `Invalid regex at ${currentPath}.match: ${obj.match}`);
            }
            if (typeof obj.begin === 'string') {
                assert.doesNotThrow(() => {
                    new RegExp(obj.begin);
                }, `Invalid regex at ${currentPath}.begin: ${obj.begin}`);
            }
            if (typeof obj.end === 'string') {
                assert.doesNotThrow(() => {
                    new RegExp(obj.end);
                }, `Invalid regex at ${currentPath}.end: ${obj.end}`);
            }

            for (const key of Object.keys(obj)) {
                validateRegexes(obj[key], `${currentPath}.${key}`);
            }
        }

        validateRegexes(grammar);
    });

    it('should include all required syntax features in repository', () => {
        const requiredRules = [
            'comments',
            'script',
            'blocks',
            'block-if',
            'block-else-if',
            'block-else',
            'block-if-close',
            'block-for',
            'block-for-close',
            'block-async',
            'block-async-loading',
            'block-async-error',
            'block-async-close',
            'expressions',
            'nested-braces',
            'closing-tag',
            'component-tag',
            'html-tag',
            'tag-attributes',
            'attribute-bind',
            'attribute-event-quoted',
            'attribute-event-name',
            'attribute-name',
            'attribute-equals',
            'string-double',
            'string-single',
            'entities'
        ];

        for (const rule of requiredRules) {
            assert.ok(grammar.repository[rule], `Grammar repository missing rule: ${rule}`);
        }
    });

    it('should correctly match Nuvsha conditional blocks', () => {
        const ifRegex = new RegExp(grammar.repository['block-if'].begin);
        assert.ok(ifRegex.test('{if count > 0}'));
        assert.ok(ifRegex.test('{if requestStatus === "request"}'));
        assert.ok(ifRegex.test('{if show}'));

        const elseIfRegex = new RegExp(grammar.repository['block-else-if'].begin);
        assert.ok(elseIfRegex.test('{else if requestStatus === "loading"}'));
        assert.ok(elseIfRegex.test('{else if count > 5}'));

        const elseRegex = new RegExp(grammar.repository['block-else'].match);
        assert.ok(elseRegex.test('{else}'));
        assert.ok(elseRegex.test('{ else }'));

        const ifCloseRegex = new RegExp(grammar.repository['block-if-close'].match);
        assert.ok(ifCloseRegex.test('{/if}'));
        assert.ok(ifCloseRegex.test('{ /if }'));
    });

    it('should correctly match Nuvsha loop blocks', () => {
        const forRegex = new RegExp(grammar.repository['block-for'].begin);
        assert.ok(forRegex.test('{for item of items}'));
        assert.ok(forRegex.test('{for feature of features}'));

        const forCloseRegex = new RegExp(grammar.repository['block-for-close'].match);
        assert.ok(forCloseRegex.test('{/for}'));
        assert.ok(forCloseRegex.test('{ /for }'));
    });

    it('should correctly match Nuvsha async blocks', () => {
        const asyncRegex = new RegExp(grammar.repository['block-async'].begin);
        assert.ok(asyncRegex.test('{async user = fetchUser()}'));
        assert.ok(asyncRegex.test('{async fetchPosts()}'));

        const loadingRegex = new RegExp(grammar.repository['block-async-loading'].match);
        assert.ok(loadingRegex.test('{loading}'));

        const errorRegex = new RegExp(grammar.repository['block-async-error'].match);
        assert.ok(errorRegex.test('{error}'));

        const asyncCloseRegex = new RegExp(grammar.repository['block-async-close'].match);
        assert.ok(asyncCloseRegex.test('{/async}'));
    });

    it('should distinguish component tags from HTML elements', () => {
        const compRegex = new RegExp(grammar.repository['component-tag'].begin);
        assert.ok(compRegex.test('<Card'));
        assert.ok(compRegex.test('<Button'));
        assert.ok(compRegex.test('<Navbar'));
        assert.strictEqual(compRegex.test('<div'), false);
        assert.strictEqual(compRegex.test('<button'), false);

        const htmlRegex = new RegExp(grammar.repository['html-tag'].begin);
        assert.ok(htmlRegex.test('<div'));
        assert.ok(htmlRegex.test('<button'));
        assert.ok(htmlRegex.test('<section'));
        assert.ok(htmlRegex.test('<input'));
        assert.strictEqual(htmlRegex.test('<Card'), false);
    });

    it('should match Nuvsha event and bind attributes', () => {
        const bindRegex = new RegExp(grammar.repository['attribute-bind'].match);
        assert.ok(bindRegex.test('bind'));
        assert.ok(bindRegex.test('bind:value'));

        const eventQuotedRegex = new RegExp(grammar.repository['attribute-event-quoted'].begin);
        assert.ok(eventQuotedRegex.test('onclick="'));
        assert.ok(eventQuotedRegex.test('onsubmit="'));
        assert.ok(eventQuotedRegex.test('onchange="'));

        const eventNameRegex = new RegExp(grammar.repository['attribute-event-name'].match);
        assert.ok(eventNameRegex.test('onclick'));
        assert.ok(eventNameRegex.test('onsubmit'));
        assert.ok(eventNameRegex.test('@click'));
    });

    it('should match script tags and comments', () => {
        const scriptRegex = new RegExp(grammar.repository['script'].begin);
        assert.ok(scriptRegex.test('<script>'));
        assert.ok(scriptRegex.test('<script type="module">'));

        const scriptEndRegex = new RegExp(grammar.repository['script'].end);
        assert.ok(scriptEndRegex.test('</script>'));

        const commentRegex = new RegExp(grammar.repository['comments'].begin);
        assert.ok(commentRegex.test('<!--'));
        const commentEndRegex = new RegExp(grammar.repository['comments'].end);
        assert.ok(commentEndRegex.test('-->'));
    });

    it('should have a realistic syntax-showcase fixture file', () => {
        const showcasePath = path.join(__dirname, 'fixtures', 'syntax-showcase.nuv');
        assert.ok(fs.existsSync(showcasePath), 'syntax-showcase.nuv fixture must exist');
        const content = fs.readFileSync(showcasePath, 'utf8');

        // Check for all 14 syntax features in the fixture
        assert.ok(content.includes('<script>'), 'script tag');
        assert.ok(content.includes('</script>'), 'script closing tag');
        assert.ok(content.includes('<Card'), 'component tag');
        assert.ok(content.includes('</Card>'), 'component closing tag');
        assert.ok(content.includes('<div'), 'html element');
        assert.ok(content.includes('</div>'), 'html closing tag');
        assert.ok(content.includes('class="app-container"'), 'html attribute');
        assert.ok(content.includes('{name}'), 'expression {name}');
        assert.ok(content.includes('{count + 1}'), 'expression {count + 1}');
        assert.ok(content.includes('{if show}'), 'conditional {if}');
        assert.ok(content.includes('{else if count > 5}'), 'conditional {else if}');
        assert.ok(content.includes('{else}'), 'conditional {else}');
        assert.ok(content.includes('{/if}'), 'conditional {/if}');
        assert.ok(content.includes('{for item of items}'), 'loop {for}');
        assert.ok(content.includes('{/for}'), 'loop {/for}');
        assert.ok(content.includes('{async data = fetch("/api/data")}'), 'async block');
        assert.ok(content.includes('{loading}'), 'async loading');
        assert.ok(content.includes('{error}'), 'async error');
        assert.ok(content.includes('{/async}'), 'async /async');
        assert.ok(content.includes('bind={accepted}'), 'bind syntax');
        assert.ok(content.includes('onclick="count++"'), 'event syntax');
        assert.ok(content.includes('<!--'), 'comment block');
    });
});
