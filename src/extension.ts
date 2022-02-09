import * as vscode from 'vscode';
import { prettierConfigCommand, activeEditor, documentFileType } from './constants';
import { javascript } from './javscript';
import { json } from "./json";

var statusBar : vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(prettierConfigCommand, () => {
			if (activeEditor) {
				if (documentFileType === "javscript") {
					if (activeEditor.document.getText().length === 0) {
						javascript();
					}
					else {
						vscode.window.showErrorMessage("Generating a Prettier Config Failed. Please use on an empty document.");
					}
				}
				else if (documentFileType === "json") {
					if (activeEditor.document.getText().length === 0) {
						json();
					}
					else {
						vscode.window.showErrorMessage("Generating a Prettier Config Failed. Please use on an empty document.");
					}
				}
			}
			else {
				deactivate();
			}
		})
	);
	statusBar = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right,
		100
	);
	statusBar.command = prettierConfigCommand;
	context.subscriptions.push(statusBar);
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(updateStatusBar),
		vscode.window.onDidChangeTextEditorSelection(updateStatusBar)
	);
	updateStatusBar();
}

function updateStatusBar() : void {
	statusBar.text = `$(edit) Prettier Config`;
	statusBar.show();
}

function deactivate() {
	statusBar.dispose();
}