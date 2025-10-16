// Email highlighter class that uses ANTLR to detect and highlight TorpedoDepot emails
// This class implements VSCode's TextEditorDecorationProvider interface

import * as vscode from 'vscode'; // Import VSCode API for editor decorations
import { EmailParser } from './emailParser'; // Import our custom email parser

/**
 * EmailHighlighter class that provides text decorations for email addresses
 * This class is responsible for providing text decorations (highlighting) for email addresses
 * 
 * Note: VSCode doesn't have a TextEditorDecorationProvider interface in the current API
 * Instead, we'll use a different approach with decoration types and manual updates
 */
export class EmailHighlighter {
    // Private property to store our email parser instance
    private emailParser: EmailParser;

    // Constructor - called when creating a new instance of EmailHighlighter
    constructor() {
        // Initialize the email parser
        // The EmailParser class will handle the ANTLR parsing logic
        this.emailParser = new EmailParser();
    }

    /**
     * Method to get decorations for a text editor
     * This method finds all valid TorpedoDepot email addresses and returns decoration options
     * 
     * @param editor - The text editor to provide decorations for
     * @returns Array of decoration options for valid emails
     */
    public async getDecorations(editor: vscode.TextEditor): Promise<vscode.DecorationOptions[]> {
        // Get the document from the editor
        const document = editor.document;
        
        // Get the full text content of the document
        const text = document.getText();
        
        // Use our email parser to find all valid TorpedoDepot email addresses
        // The parseEmails method returns an array of objects containing email info and positions
        const emailMatches = this.emailParser.parseEmails(text);

        // Convert the email matches into VSCode decoration options
        const decorations: vscode.DecorationOptions[] = emailMatches.map(match => {
            // Create a range that represents the position of the email in the document
            // VSCode uses 0-based line and character positions
            const range = new vscode.Range(
                match.startLine,    // Start line (0-based)
                match.startChar,    // Start character (0-based)
                match.endLine,      // End line (0-based)
                match.endChar       // End character (0-based)
            );

            // Create decoration options for this email
            // This tells VSCode how to style the text
            const decoration: vscode.DecorationOptions = {
                range: range, // The text range to decorate
                hoverMessage: `TorpedoDepot Email: ${match.email}`, // Tooltip text when hovering
                // We don't specify renderOptions here - VSCode will use the decoration type's default styling
            };

            return decoration;
        });

        // Return the array of decorations
        return decorations;
    }

    /**
     * Method to manually trigger decoration updates
     * This can be called when we want to force a re-parse and re-highlight
     * 
     * @param editor - The text editor to update decorations for
     */
    public async updateDecorations(editor: vscode.TextEditor): Promise<void> {
        // Get the decoration type for TorpedoDepot emails
        // This decoration type defines the visual styling (blue color)
        const decorationType = vscode.window.createTextEditorDecorationType({
            backgroundColor: 'rgba(0, 100, 255, 0.3)', // Light blue background
            color: 'blue', // Blue text color
            fontWeight: 'bold', // Bold text
            border: '1px solid blue', // Blue border
            borderRadius: '3px' // Rounded corners
        });

        // Get the decorations for this editor
        const decorations = await this.getDecorations(editor);
        
        // Apply the decorations to the editor
        editor.setDecorations(decorationType, decorations);
    }
}
