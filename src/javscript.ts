import * as vscode from 'vscode';
import { activeEditor } from './constants';

export const javascript = activeEditor.edit((edit: { insert: (arg0: any, arg1: string) => void; }) => {
    edit.insert(
        new vscode.Position(0, 0),
        `// JavaScript file\n`
    );
});