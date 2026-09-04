const vscode = require('vscode');

// Future imports for language features
// const { registerCompletion } = require('./completion');
// const { registerDiagnostics } = require('./diagnostics');
// const { registerDefinition } = require('./definition');
// const { registerHover } = require('./hover');
// const { registerSymbols } = require('./symbols');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Nuvsha extension is now active!');

    // The .nuv language is registered automatically via package.json.
    // In future phases, we will register language providers here:

    // registerCompletion(context);
    // registerDiagnostics(context);
    // registerDefinition(context);
    // registerHover(context);
    // registerSymbols(context);
}

function deactivate() {
    // Clean up if necessary
}

module.exports = {
    activate,
    deactivate
};
