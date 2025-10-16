"use strict";
// Email highlighter class that uses ANTLR to detect and highlight TorpedoDepot emails
// This class implements VSCode's TextEditorDecorationProvider interface
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailHighlighter = void 0;
const vscode = __importStar(require("vscode")); // Import VSCode API for editor decorations
const emailParser_1 = require("./emailParser"); // Import our custom email parser
/**
 * EmailHighlighter class that provides text decorations for email addresses
 * This class is responsible for providing text decorations (highlighting) for email addresses
 *
 * Note: VSCode doesn't have a TextEditorDecorationProvider interface in the current API
 * Instead, we'll use a different approach with decoration types and manual updates
 */
class EmailHighlighter {
    // Constructor - called when creating a new instance of EmailHighlighter
    constructor() {
        // Initialize the email parser
        // The EmailParser class will handle the ANTLR parsing logic
        this.emailParser = new emailParser_1.EmailParser();
    }
    /**
     * Method to get decorations for a text editor
     * This method finds all valid TorpedoDepot email addresses and returns decoration options
     *
     * @param editor - The text editor to provide decorations for
     * @returns Array of decoration options for valid emails
     */
    async getDecorations(editor) {
        // Get the document from the editor
        const document = editor.document;
        // Get the full text content of the document
        const text = document.getText();
        // Use our email parser to find all valid TorpedoDepot email addresses
        // The parseEmails method returns an array of objects containing email info and positions
        const emailMatches = this.emailParser.parseEmails(text);
        // Convert the email matches into VSCode decoration options
        const decorations = emailMatches.map(match => {
            // Create a range that represents the position of the email in the document
            // VSCode uses 0-based line and character positions
            const range = new vscode.Range(match.startLine, // Start line (0-based)
            match.startChar, // Start character (0-based)
            match.endLine, // End line (0-based)
            match.endChar // End character (0-based)
            );
            // Create decoration options for this email
            // This tells VSCode how to style the text
            const decoration = {
                range: range,
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
    async updateDecorations(editor) {
        // Get the decoration type for TorpedoDepot emails
        // This decoration type defines the visual styling (blue color)
        const decorationType = vscode.window.createTextEditorDecorationType({
            backgroundColor: 'rgba(0, 100, 255, 0.3)',
            color: 'blue',
            fontWeight: 'bold',
            border: '1px solid blue',
            borderRadius: '3px' // Rounded corners
        });
        // Get the decorations for this editor
        const decorations = await this.getDecorations(editor);
        // Apply the decorations to the editor
        editor.setDecorations(decorationType, decorations);
    }
}
exports.EmailHighlighter = EmailHighlighter;
//# sourceMappingURL=emailHighlighter.js.map