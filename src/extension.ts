import * as vscode from 'vscode';
import "typescript";

var statusBar : vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

	const prettierConfigCommand = vscode.commands.registerCommand('prettier-config.prettierConfig', () => {
		
	});

	context.subscriptions.push(prettierConfigCommand);
}

function updateStatusBar() : void {
	statusBar.text = `$(edit) Prettier Config`;
	statusBar.show();
}

function deactivate() {
	statusBar.dispose();
}