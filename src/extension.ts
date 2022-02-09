import * as vscode from "vscode";
import {
    activeEditor
} from "./constants";

var statusBar: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
        vscode.commands.registerCommand("prettier-config.prettierConfig", async () => {
            const fileType = await vscode.window.showInformationMessage(
				"Which file to generate the prettier config for?",
				"JavaScript",
				"JSON"
			);
			if (fileType === "JavaScript") {
				activeEditor.edit(
					(edit: { insert: (arg0: any, arg1: string) => void }) => {
						edit.insert(
							new vscode.Position(0, 0),
							`module.exports = {\n   singleQuote: true,\n   printWidth: 120,\n   tabWidth: 4,\n   trailingComma: all,\n   endOfLine: auto\n};`,
						);
					},
				);
			} 
			else if (fileType === "JSON") {
				activeEditor.edit(
					(edit: { insert: (arg0: any, arg1: string) => void }) => {
						edit.insert(
							new vscode.Position(0, 0),
							`{\n   "singleQuote": true,\n   "printWidth": 120,\n   "tabWidth": 4,\n   "trailingComma": "all",\n   "endOfLine": "auto"\n}`,
						);
					},
				);
			}
		})
	);
    statusBar = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100,
    );
    statusBar.command = "prettier-config.prettierConfig";
    context.subscriptions.push(statusBar);
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(updateStatusBar),
        vscode.window.onDidChangeTextEditorSelection(updateStatusBar),
    );
    updateStatusBar();
}

function updateStatusBar(): void {
    statusBar.text = `$(edit) Prettier Config`;
    statusBar.show();
}

function deactivate() {
    statusBar.dispose();
}
