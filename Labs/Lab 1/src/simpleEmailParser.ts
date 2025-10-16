// Simplified email parser that uses regex for pattern matching
// This is a fallback implementation that doesn't require complex ANTLR setup

/**
 * Interface that represents a detected email match
 * This interface defines the structure of data returned when an email is found
 */
interface EmailMatch {
    email: string;        // The complete email address that was matched
    startLine: number;    // Line number where the email starts (0-based)
    startChar: number;    // Character position where the email starts (0-based)
    endLine: number;      // Line number where the email ends (0-based)
    endChar: number;      // Character position where the email ends (0-based)
}

/**
 * Simple email parser that validates TorpedoDepot email addresses
 * This class uses regex patterns to match the email format defined in our grammar
 */
export class SimpleEmailParser {
    // Regular expression pattern that matches our ANTLR grammar rules
    // Pattern breakdown:
    // - \b: Word boundary (ensures we match complete words)
    // - [a-zA-Z0-9]+: One or more alphanumeric characters (local part)
    // - @torpedodepot: Literal '@torpedodepot' string
    // - \.(?:com|net|wannabemil): Domain suffix (.com, .net, or .wannabemil)
    // - \b: Word boundary (ensures we match complete words)
    private readonly emailPattern = /\b([a-zA-Z0-9]+)@torpedodepot\.(?:com|net|wannabemil)\b/g;

    /**
     * Parse emails from text and return all valid TorpedoDepot email addresses
     * This method finds all email addresses matching our pattern and returns their positions
     * 
     * @param text - The text to parse for email addresses
     * @returns Array of EmailMatch objects representing found emails
     */
    public parseEmails(text: string): EmailMatch[] {
        // Array to store all found email matches
        const emailMatches: EmailMatch[] = [];

        try {
            // Split the text into lines for position tracking
            // This allows us to calculate line and character positions for each match
            const lines = text.split('\n');

            // Process each line individually
            // This approach allows us to track line numbers accurately
            for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                const line = lines[lineIndex];
                
                // Reset the regex lastIndex to ensure we start from the beginning of each line
                this.emailPattern.lastIndex = 0;
                
                // Find all matches in the current line
                let match;
                while ((match = this.emailPattern.exec(line)) !== null) {
                    // Validate the email using our grammar rules
                    if (this.isValidEmail(match[0])) {
                        // Calculate the position of this email in the document
                        const startChar = match.index; // Character position within the line
                        const endChar = match.index + match[0].length; // End character position

                        // Create an EmailMatch object for this valid email
                        const emailMatch: EmailMatch = {
                            email: match[0], // The complete email address
                            startLine: lineIndex, // Line number (0-based)
                            startChar: startChar, // Start character position (0-based)
                            endLine: lineIndex, // End line number (same as start for single-line emails)
                            endChar: endChar // End character position (0-based)
                        };

                        // Add this match to our results array
                        emailMatches.push(emailMatch);
                    }
                }
            }
        } catch (error) {
            // If there's an error during parsing, log it and return empty array
            console.error('Error parsing emails:', error);
        }

        // Return all found email matches
        return emailMatches;
    }

    /**
     * Validate an email address according to our grammar rules
     * This method checks if an email matches the pattern: localPart@torpedodepot.domainSuffix
     * 
     * @param email - The email address to validate
     * @returns True if the email is valid according to our grammar, false otherwise
     */
    private isValidEmail(email: string): boolean {
        try {
            // Use a more detailed regex to validate the email structure
            // This regex matches our ANTLR grammar exactly:
            // - localPart: [a-zA-Z0-9]+ (one or more alphanumeric characters)
            // - @torpedodepot: literal string
            // - domainSuffix: .com, .net, or .wannabemil
            const validationPattern = /^[a-zA-Z0-9]+@torpedodepot\.(?:com|net|wannabemil)$/;
            
            // Test if the email matches our pattern
            const isValid = validationPattern.test(email);
            
            // Additional validation: ensure local part is not empty
            const localPart = email.split('@')[0];
            const hasValidLocalPart = localPart && localPart.length > 0 && /^[a-zA-Z0-9]+$/.test(localPart);
            
            // Return true only if both pattern and local part are valid
            return isValid && !!hasValidLocalPart;
        } catch (error) {
            // If validation fails (throws an exception), the email is invalid
            console.error('Error validating email:', error);
            return false;
        }
    }

    /**
     * Get a detailed breakdown of an email address
     * This method parses an email into its components for educational purposes
     * 
     * @param email - The email address to analyze
     * @returns Object containing the parsed components or null if invalid
     */
    public analyzeEmail(email: string): { localPart: string; domain: string; suffix: string } | null {
        try {
            // Use regex to extract components
            const match = email.match(/^([a-zA-Z0-9]+)@torpedodepot\.(com|net|wannabemil)$/);
            
            if (match) {
                return {
                    localPart: match[1], // The part before @
                    domain: 'torpedodepot', // The domain part
                    suffix: match[2] // The suffix (.com, .net, or .wannabemil)
                };
            }
            
            return null; // Invalid email format
        } catch (error) {
            console.error('Error analyzing email:', error);
            return null;
        }
    }

    /**
     * Count the number of valid TorpedoDepot emails in the text
     * This is a utility method for quick counting
     * 
     * @param text - The text to count emails in
     * @returns Number of valid TorpedoDepot emails found
     */
    public countEmails(text: string): number {
        const matches = this.parseEmails(text);
        return matches.length;
    }
}
