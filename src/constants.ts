import * as vscode from "vscode";

export const prettierConfigCommand = "prettier-config.prettierConfig";
export const activeEditor: any = vscode.window.activeTextEditor;
export const documentFileType = activeEditor.document.languageId;
