import * as vscode from 'vscode';
import "typescript";
import { prettierConfigCommand, activeEditor, documentFileType } from './constants';

var statusBar : vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

	vscode.commands.registerCommand(prettierConfigCommand, () => {
		if (activeEditor) {
			if (documentFileType === "javscript") {
				if (activeEditor.document.getText().length === 0) {
					activeEditor.edit((edit: { insert: (arg0: any, arg1: string) => void; }) => {
						edit.insert(
							new vscode.Position(0, 0),
							`// JavaScript file\n`
						);
					});
				}
				else {
					vscode.window.showErrorMessage("Generating a Prettier Config Failed. Please use on an empty document.");
				}
			}
			else if (documentFileType === "json") {
				if (activeEditor.document.getText().length === 0) {
					activeEditor.edit((edit: { insert: (arg0: any, arg1: string) => void; }) => {
						edit.insert(
							new vscode.Position(0, 0),
							`// JSON file\n`
						);
					});
				}
				else {
					vscode.window.showErrorMessage("Generating a Prettier Config Failed. Please use on an empty document.");
				}
			}
		}
		else {
			vscode.window.showErrorMessage("Generating a Prettier Config Failed. Please use on a JavaScript or JSON document.");
		}
	});
}

function updateStatusBar() : void {
	statusBar.text = `$(edit) Prettier Config`;
	statusBar.show();
}

function deactivate() {
	statusBar.dispose();
}