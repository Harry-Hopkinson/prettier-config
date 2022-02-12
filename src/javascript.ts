import * as vscode from "vscode";
import { activeEditor } from "./constants";

export const javascript = activeEditor.edit(
    activeEditor.edit((edit: { insert: (arg0: any, arg1: string) => void }) => {
        edit.insert(
            new vscode.Position(0, 0),
            `module.exports = {\n   singleQuote: true,\n   printWidth: 120,\n   tabWidth: 4,\n   trailingComma: all,\n   endOfLine: auto\n};`,
        );
    }),
);
