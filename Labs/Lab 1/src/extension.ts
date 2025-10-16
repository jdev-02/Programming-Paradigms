// Main VSCode extension entry point
// This file is the entry point for our VSCode extension and handles activation

import * as vscode from 'vscode'; // Import VSCode API - provides access to editor, decorations, etc.
import { EmailHighlighter } from './emailHighlighter'; // Import our custom email highlighter class

/**
 * Extension activation function
 * This function is called when the extension is activated (when VSCode starts or when the extension is enabled)
 * 
 * @param context - VSCode extension context that provides access to extension resources and lifecycle
 */
export function activate(context: vscode.ExtensionContext): void {
    // Log that the extension has been activated
    console.log('TorpedoDepot Email Highlighter extension is now active!');

    // Create a new instance of our email highlighter
    // This class will handle the actual email detection and highlighting
    const emailHighlighter = new EmailHighlighter();

    // Set up document change listener to update decorations when text changes
    // This ensures that highlighting updates in real-time as the user types
    const documentChangeListener = vscode.workspace.onDidChangeTextDocument(async (event) => {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
        
        // Only update decorations if there's an active editor and the document changed
        if (editor && event.document === editor.document) {
            // Update decorations for the changed document
            await emailHighlighter.updateDecorations(editor);
        }
    });

    // Set up editor change listener to update decorations when switching editors
    // This ensures that highlighting is applied when opening new files
    const editorChangeListener = vscode.window.onDidChangeActiveTextEditor(async (editor) => {
        // Only update decorations if there's an active editor
        if (editor) {
            // Update decorations for the new editor
            await emailHighlighter.updateDecorations(editor);
        }
    });

    // Add the listeners to the extension's subscriptions
    // This ensures they get properly disposed of when the extension is deactivated
    context.subscriptions.push(documentChangeListener, editorChangeListener);

    // Register a command that can be called from the command palette
    // This is useful for testing and debugging
    const helloCommand = vscode.commands.registerCommand(
        'torpedodepot-email-highlighter.helloWorld', // Command identifier
        () => {
            // Show an information message when the command is executed
            vscode.window.showInformationMessage('Hello from TorpedoDepot Email Highlighter!');
        }
    );

    // Add the command to the extension's subscriptions
    context.subscriptions.push(helloCommand);

    // Log successful activation
    console.log('Extension activation completed successfully');
}

/**
 * Extension deactivation function
 * This function is called when the extension is deactivated (when VSCode shuts down or extension is disabled)
 * 
 * Note: This function is optional - if not provided, VSCode will handle cleanup automatically
 */
export function deactivate(): void {
    // Log that the extension is being deactivated
    console.log('TorpedoDepot Email Highlighter extension is being deactivated');
    
    // Any cleanup code would go here
    // In our case, VSCode will automatically dispose of our subscriptions
}
