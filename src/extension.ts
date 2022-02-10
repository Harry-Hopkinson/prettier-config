import * as vscode from "vscode";

var statusBar: vscode.StatusBarItem;
var activeEditor: any = vscode.window.activeTextEditor;

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
        vscode.commands.registerCommand("prettier-config.prettierConfig", async () => {
            const fileType = await vscode.window.showInformationMessage(
				"Which file to generate the Prettier Config for?",
				"Javascript",
				"JSON"
			);
			if (activeEditor.document.isDirty) {
				activeEditor = vscode.window.activeTextEditor;
			}
			else {
				if (fileType === "Javascript") {
					if (activeEditor) {
						activeEditor.edit(
							(edit: { insert: (arg0: any, arg1: string) => void }) => {
								edit.insert(
									new vscode.Position(0, 0),
									`module.exports = {\n   singleQuote: true,\n   printWidth: 120,\n   tabWidth: 4,\n   trailingComma: all,\n   endOfLine: auto\n};`,
								);
							},
						);
					}
					else {
						const newDocument = await vscode.workspace.openTextDocument({
							language: "javascript",
							content: `module.exports = {\n   singleQuote: true,\n   printWidth: 120,\n   tabWidth: 4,\n   trailingComma: all,\n   endOfLine: auto\n};`,
						});
						await vscode.window.showTextDocument(newDocument);
					}
				}
				else if (fileType === "JSON") {
					if (activeEditor) {
						activeEditor.edit(
							(edit: { insert: (arg0: any, arg1: string) => void }) => {
								edit.insert(
									new vscode.Position(0, 0),
									`{\n   "singleQuote": true,\n   "printWidth": 120,\n   "tabWidth": 4,\n   "trailingComma": "all",\n   "endOfLine": "auto"\n}`,
								);
							},
						);
					}
					else {
						const newDocument: vscode.TextDocument = await vscode.workspace.openTextDocument({
							language: "json",
							content: `{\n   "singleQuote": true,\n   "printWidth": 120,\n   "tabWidth": 4,\n   "trailingComma": "all",\n   "endOfLine": "auto"\n}`,
						});
						await vscode.window.showTextDocument(newDocument);
					}
				}
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
