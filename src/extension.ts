import * as vscode from 'vscode';
import "typescript";
import { prettierConfigCommand } from "constants";

var statusBar : vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

	vscode.commands.registerCommand(prettierConfigCommand, () => {

	});
}

function updateStatusBar() : void {
	statusBar.text = `$(edit) Prettier Config`;
	statusBar.show();
}

function deactivate() {
	statusBar.dispose();
}