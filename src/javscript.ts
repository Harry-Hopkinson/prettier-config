import * as vscode from "vscode";
import { activeEditor } from "./constants";

export const javascript = activeEditor.edit(
  (edit: { insert: (arg0: any, arg1: string) => void }) => {
    edit.insert(
      new vscode.Position(0, 0),
      `module.exports = {\n
            singleQuote: true,
            printWidth: 120,
            tabWidth: 4,
            trailingComma: 'all',
            endOfLine: 'auto'
        };`
    );
  }
);
