"use strict";
// Email parser class that uses regex-based parsing to detect TorpedoDepot email addresses
// This class handles the actual parsing logic using pattern matching that follows our ANTLR grammar rules
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailParser = void 0;
const simpleEmailParser_1 = require("./simpleEmailParser"); // Import our simple email parser
/**
 * EmailParser class that handles regex-based email parsing
 * This class is responsible for:
 * 1. Using regex patterns that match our ANTLR grammar rules
 * 2. Finding all valid TorpedoDepot email addresses in text
 * 3. Extracting position information for VSCode decorations
 * 4. Validating email format according to our grammar
 */
class EmailParser {
    // Constructor - called when creating a new instance of EmailParser
    constructor() {
        // Initialize the simple email parser
        // This parser uses regex patterns that match our ANTLR grammar rules
        this.simpleParser = new simpleEmailParser_1.SimpleEmailParser();
    }
    /**
     * Main method to parse emails from text
     * This method takes a text string and returns all valid TorpedoDepot email addresses found
     *
     * @param text - The text to parse for email addresses
     * @returns Array of EmailMatch objects representing found emails
     */
    parseEmails(text) {
        // Delegate to the simple parser which uses regex patterns matching our ANTLR grammar
        // The simple parser implements the same logic as our ANTLR grammar but using regex
        return this.simpleParser.parseEmails(text);
    }
    /**
     * Method to validate an email address according to our grammar rules
     * This method checks if an email matches the pattern: localPart@torpedodepot.domainSuffix
     *
     * @param email - The email address to validate
     * @returns True if the email is valid according to our grammar, false otherwise
     */
    isValidEmail(email) {
        // Delegate to the simple parser's validation method
        // This method uses regex patterns that exactly match our ANTLR grammar rules
        return this.simpleParser.parseEmails(email).length > 0;
    }
    /**
     * Get a detailed breakdown of an email address
     * This method parses an email into its components for educational purposes
     *
     * @param email - The email address to analyze
     * @returns Object containing the parsed components or null if invalid
     */
    analyzeEmail(email) {
        // Delegate to the simple parser's analysis method
        return this.simpleParser.analyzeEmail(email);
    }
    /**
     * Count the number of valid TorpedoDepot emails in the text
     * This is a utility method for quick counting
     *
     * @param text - The text to count emails in
     * @returns Number of valid TorpedoDepot emails found
     */
    countEmails(text) {
        // Delegate to the simple parser's count method
        return this.simpleParser.countEmails(text);
    }
    /**
     * Alternative method using ANTLR visitor pattern for more detailed parsing
     * This method demonstrates how to use the visitor pattern to extract information from parse trees
     *
     * Note: This method is kept for educational purposes to show how ANTLR visitors would work
     * In practice, we use the simple parser which implements the same logic with regex
     *
     * @param text - The text to parse
     * @returns Array of EmailMatch objects
     */
    parseEmailsWithVisitor(text) {
        // For now, delegate to the simple parser
        // In a full ANTLR implementation, this would use the visitor pattern
        // to traverse the parse tree and extract email information
        return this.simpleParser.parseEmails(text);
    }
}
exports.EmailParser = EmailParser;
//# sourceMappingURL=emailParser.js.map