import * as vscode from "vscode";

var statusBar: vscode.StatusBarItem;
var textEditor: vscode.TextEditor = vscode.window.activeTextEditor;

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand(
            "prettier-config.prettierConfig",
            async () => {
                var activeEditor: vscode.TextEditor =
                    vscode.window.activeTextEditor;
                const fileType = await vscode.window.showInformationMessage(
                    "Which file to generate the Prettier Config for?",
                    "Javascript",
                    "JSON"
                );
                var textEditor: vscode.TextEditor =
                    vscode.window.activeTextEditor;
                updateCurrentEditor(activeEditor, textEditor);
                if (activeEditor && !textEditor.document.isDirty) {
                    if (fileType === "Javascript") {
                        var javascriptEditArray: Array<vscode.TextEdit> = [];
                        if (activeEditor) {
                            const singleQuotes =
                                await vscode.window.showInformationMessage(
                                    "Do you want to use single quotes?",
                                    "Yes",
                                    "No"
                                );
                            if (singleQuotes === "Yes") {
                                javascriptEditArray.push(
                                    new vscode.TextEdit(
                                        new vscode.Range(
                                            new vscode.Position(0, 0),
                                            new vscode.Position(0, 0)
                                        ),
                                        `module.exports = {\n   singleQuote: true,\n};`
                                    )
                                );
                            } else {
                                javascriptEditArray.push(
                                    new vscode.TextEdit(
                                        new vscode.Range(
                                            new vscode.Position(0, 0),
                                            new vscode.Position(0, 0)
                                        ),
                                        `module.exports = {\n   singleQuote: false,\n};`
                                    )
                                );
                            }
                            const printWidth = await vscode.window.showInputBox({
                                prompt: "What is the print width?",
                                placeHolder: "120",
                                validateInput: (value: string) => {
                                    if (value.length > 0) {
                                        return null;
                                    }
                                    return "Please enter a number";
                                },
                            });
                            if (printWidth) {
                                javascriptEditArray.push(
                                    new vscode.TextEdit(
                                        new vscode.Range(
                                            new vscode.Position(0, 0),
                                            new vscode.Position(0, 0)
                                        ),
                                        `printWidth: ${printWidth},\n};`
                                )
                            );
                        } else if (!activeEditor) {
                            updateCurrentEditor(activeEditor, textEditor);
                        }

                        updateCurrentEditor(activeEditor, textEditor);
                    } else if (fileType === "JSON") {
                        if (activeEditor) {
                            activeEditor.edit(
                                (edit: {
                                    insert: (arg0: any, arg1: string) => void;
                                }) => {
                                    edit.insert(
                                        new vscode.Position(0, 0),
                                        `{\n   "singleQuote": true,\n   "printWidth": 120,\n   "tabWidth": 4,\n   "trailingComma": "all",\n   "endOfLine": "auto"\n}`
                                    );
                                }
                            );
                        } else if (!activeEditor) {
                            updateCurrentEditor(activeEditor, textEditor);
                        }
                        updateCurrentEditor(activeEditor, textEditor);
                    }
                } else if (activeEditor && textEditor.document.isDirty) {
                    vscode.window.showInformationMessage(
                        "Please save your file before generating a Prettier Config"
                    );
                } else {
                    vscode.window.showErrorMessage(
                        "Please open a file before generating a Prettier Config"
                    );
                    updateCurrentEditor(activeEditor, textEditor);
                }
            }
        ),
        vscode.commands.registerCommand(
            "prettier-config.prettierConfig.updateStatusBar",
            () => {
                updateStatusBar();
            }
        )
    );
    statusBar = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
    );
    statusBar.command = "prettier-config.prettierConfig";
    context.subscriptions.push(statusBar);
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(updateStatusBar),
        vscode.window.onDidChangeTextEditorSelection(updateStatusBar)
    );
    updateStatusBar();
    var activeEditor: vscode.TextEditor = vscode.window.activeTextEditor;
    updateCurrentEditor(activeEditor, textEditor);
}

function updateStatusBar(): void {
    statusBar.text = `$(edit) Prettier Config`;
    statusBar.show();
}

function deactivate() {
    statusBar.dispose();
}

function updateCurrentEditor(
    activeEditor: vscode.TextEditor,
    textEditor: vscode.TextEditor
): void {
    activeEditor = vscode.window.activeTextEditor;
    textEditor = vscode.window.activeTextEditor;
}
