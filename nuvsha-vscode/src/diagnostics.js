const vscode = require('vscode');

/**
 * Registers compiler diagnostics for Nuvsha.
 * @param {vscode.ExtensionContext} context
 */
function registerDiagnostics(context) {
    // TODO: Implement Nuvsha compiler diagnostics
    // Will connect Nuvsha compiler errors (e.g., NV1001, NV1002) to VS Code diagnostics
}

module.exports = {
    registerDiagnostics
};
