const assert = require('assert');
const path = require('path');
const fs = require('fs');

describe('Nuvsha Phase 17.4: VS Code Snippets', () => {
    let snippets;

    before(() => {
        const snippetsPath = path.join(__dirname, '..', 'snippets', 'nuvsha.json');
        assert.ok(fs.existsSync(snippetsPath), 'Snippets file must exist');
        snippets = JSON.parse(fs.readFileSync(snippetsPath, 'utf8'));
    });

    it('should be valid JSON containing snippet objects', () => {
        assert.ok(typeof snippets === 'object' && snippets !== null);
        const keys = Object.keys(snippets);
        assert.ok(keys.length >= 35, `Expected at least 35 snippets, found ${keys.length}`);
    });

    it('every snippet must have a valid prefix, body, and description', () => {
        for (const [name, snip] of Object.entries(snippets)) {
            assert.ok(snip.prefix, `Snippet "${name}" must have a prefix`);
            if (Array.isArray(snip.prefix)) {
                assert.ok(snip.prefix.length > 0, `Snippet "${name}" prefix array cannot be empty`);
                snip.prefix.forEach(p => assert.strictEqual(typeof p, 'string'));
            } else {
                assert.strictEqual(typeof snip.prefix, 'string');
            }

            assert.ok(snip.body, `Snippet "${name}" must have a body`);
            if (Array.isArray(snip.body)) {
                assert.ok(snip.body.length > 0, `Snippet "${name}" body array cannot be empty`);
            } else {
                assert.strictEqual(typeof snip.body, 'string');
            }

            assert.strictEqual(typeof snip.description, 'string', `Snippet "${name}" must have a description string`);
            assert.ok(snip.description.length > 5, `Snippet "${name}" description is too short`);
        }
    });

    it('should contain all required Nuvsha categories', () => {
        const snippetNames = Object.keys(snippets);
        
        // Component starter
        assert.ok(snippets['Nuvsha Component Starter'], 'Component starter must exist');
        assert.ok(snippets['Nuvsha Script Block'], 'Script block must exist');

        // Conditions
        assert.ok(snippets['Nuvsha If Block'], 'If block must exist');
        assert.ok(snippets['Nuvsha If-Else Block'], 'If-else block must exist');
        assert.ok(snippets['Nuvsha Else-If Branch'], 'Else-if branch must exist');
        assert.ok(snippets['Nuvsha Else Branch'], 'Else branch must exist');

        // Loops
        assert.ok(snippets['Nuvsha For Loop'], 'For loop must exist');

        // Expressions & slots
        assert.ok(snippets['Nuvsha Expression'], 'Expression snippet must exist');
        assert.ok(snippets['Nuvsha Children Slot'], 'Children slot snippet must exist');

        // Components
        assert.ok(snippets['Nuvsha Component (Self-Closing)'], 'Self-closing component must exist');
        assert.ok(snippets['Nuvsha Component with Children'], 'Component with children must exist');

        // Events
        assert.ok(snippets['Nuvsha Click Event (Inline)'], 'Click event must exist');
        assert.ok(snippets['Nuvsha Button with Click Event'], 'Button snippet must exist');

        // Forms & Binds
        assert.ok(snippets['Nuvsha Two-Way Binding'], 'Two-way binding must exist');
        assert.ok(snippets['Nuvsha Input with Binding'], 'Input with binding must exist');
        assert.ok(snippets['Nuvsha Checkbox with Binding'], 'Checkbox with binding must exist');
        assert.ok(snippets['Nuvsha Select with Binding'], 'Select with binding must exist');
        assert.ok(snippets['Nuvsha Form with Submit'], 'Form with submit must exist');

        // Async & Data & Forms
        assert.ok(snippets['Nuvsha Async Template Block'], 'Async template block must exist');
        assert.ok(snippets['Nuvsha Data Fetch Primitive'], 'Data fetch primitive must exist');
        assert.ok(snippets['Nuvsha Form Primitive'], 'Form primitive must exist');

        // Routing
        assert.ok(snippets['Nuvsha Router Component'], 'Router component must exist');
        assert.ok(snippets['Nuvsha Route Definitions'], 'Route definitions must exist');

        // Basic HTML
        assert.ok(snippets['Nuvsha Div Element'], 'Div must exist');
        assert.ok(snippets['Nuvsha Section Element'], 'Section must exist');
        assert.ok(snippets['Nuvsha Heading 1'], 'H1 must exist');
        assert.ok(snippets['Nuvsha Paragraph'], 'Paragraph must exist');
        assert.ok(snippets['Nuvsha Image Element'], 'Image must exist');
    });

    it('should NOT contain unsupported or invented syntax', () => {
        const raw = JSON.stringify(snippets);
        assert.strictEqual(raw.includes('@click'), false, 'Should not use @click');
        assert.strictEqual(raw.includes('{then data}'), false, 'Should not use {then data}');
        assert.strictEqual(raw.includes('{catch error}'), false, 'Should not use {catch error}');
        assert.strictEqual(raw.includes('bind:value='), false, 'Should use bind={...} instead of bind:value=');
    });
});
