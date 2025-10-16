"use strict";
// Generated ANTLR4 TypeScript Lexer for TorpedoDepotEmailFilter grammar
// This file contains the lexer that breaks input text into tokens
Object.defineProperty(exports, "__esModule", { value: true });
exports.TorpedoDepotEmailFilterLexer = exports.vocabulary = exports.EOF = exports.WS = exports.WANNABEMIL = exports.COM = exports.NET = exports.ALPHANUMERIC = void 0;
const Lexer_1 = require("antlr4ts/Lexer");
// Token type constants - these represent the different types of tokens our lexer can recognize
exports.ALPHANUMERIC = 1; // Token type for alphanumeric characters
exports.NET = 2; // Token type for '.net' domain suffix
exports.COM = 3; // Token type for '.com' domain suffix
exports.WANNABEMIL = 4; // Token type for '.wannabemil' domain suffix
exports.WS = 5; // Token type for whitespace (skipped)
exports.EOF = -1; // End of file token
// Vocabulary object that maps token types to their string representations
exports.vocabulary = {
    getDisplayName: (tokenType) => {
        switch (tokenType) {
            case exports.ALPHANUMERIC: return 'ALPHANUMERIC';
            case exports.NET: return 'NET';
            case exports.COM: return 'COM';
            case exports.WANNABEMIL: return 'WANNABEMIL';
            case exports.WS: return 'WS';
            case exports.EOF: return 'EOF';
            default: return 'UNKNOWN';
        }
    },
    getLiteralName: (tokenType) => {
        switch (tokenType) {
            case exports.NET: return "'.net'";
            case exports.COM: return "'.com'";
            case exports.WANNABEMIL: return "'.wannabemil'";
            default: return undefined;
        }
    },
    getSymbolicName: (tokenType) => {
        return exports.vocabulary.getDisplayName(tokenType);
    },
    maxTokenType: exports.WANNABEMIL
};
/**
 * Custom lexer class that extends ANTLR4's base Lexer
 * This class is responsible for breaking input text into tokens according to our grammar rules
 */
class TorpedoDepotEmailFilterLexer extends Lexer_1.Lexer {
    // Constructor that initializes the lexer with an input stream
    constructor(input) {
        super(input);
        // Required abstract properties
        this.channelNames = [];
        this.grammarFileName = "TorpedoDepotEmailFilter.g4";
        this.modeNames = ["DEFAULT_MODE"];
        this.ruleNames = TorpedoDepotEmailFilterLexer.ruleNames;
        // Note: ATN simulator is simplified for this implementation
    }
    // Getter for the vocabulary
    get vocabulary() {
        return TorpedoDepotEmailFilterLexer.vocabulary;
    }
    // Main tokenization method - this is called by the lexer to get the next token
    nextToken() {
        try {
            // Skip whitespace tokens as specified in the grammar
            while (true) {
                // Check if we're at the end of input
                if (this._input.LA(1) === exports.EOF) {
                    return this.emitEOF();
                }
                // Get the current character
                const c = this._input.LA(1);
                // Skip whitespace characters (spaces, tabs, newlines, carriage returns)
                if (c === 32 || c === 9 || c === 10 || c === 13) { // space, tab, newline, carriage return
                    this._input.consume();
                    continue;
                }
                // Try to match domain suffixes first (longest match)
                if (this.matchString('.wannabemil')) {
                    return this.emitToken(exports.WANNABEMIL, '.wannabemil');
                }
                if (this.matchString('.net')) {
                    return this.emitToken(exports.NET, '.net');
                }
                if (this.matchString('.com')) {
                    return this.emitToken(exports.COM, '.com');
                }
                // Match alphanumeric characters
                if (this.isAlphanumeric(c)) {
                    let text = '';
                    while (this.isAlphanumeric(this._input.LA(1))) {
                        text += String.fromCharCode(this._input.LA(1));
                        this._input.consume();
                    }
                    return this.emitToken(exports.ALPHANUMERIC, text);
                }
                // If we can't match anything, consume the character and continue
                this._input.consume();
            }
        }
        catch (e) {
            // If there's an error, emit an error token
            return this.emitErrorToken();
        }
    }
    // Helper method to check if a character is alphanumeric
    isAlphanumeric(c) {
        return (c >= 48 && c <= 57) || // 0-9
            (c >= 65 && c <= 90) || // A-Z
            (c >= 97 && c <= 122); // a-z
    }
    // Helper method to check if the input matches a specific string
    matchString(str) {
        for (let i = 0; i < str.length; i++) {
            if (this._input.LA(i + 1) !== str.charCodeAt(i)) {
                return false;
            }
        }
        // If we matched, consume the characters
        for (let i = 0; i < str.length; i++) {
            this._input.consume();
        }
        return true;
    }
    // Helper method to emit a token with the given type and text
    emitToken(type, text) {
        // Create a simple token implementation using the factory
        const startIndex = this._input.index - text.length;
        const stopIndex = this._input.index - 1;
        return this._factory.create({ source: this, stream: this._input }, type, text, 0, // channel
        startIndex, stopIndex, this.line, this.charPositionInLine - text.length);
    }
    // Helper method to emit an EOF token
    emitEOF() {
        return this.emitToken(exports.EOF, '<EOF>');
    }
    // Helper method to emit an error token
    emitErrorToken() {
        return this.emitToken(-1, '<INVALID>');
    }
}
exports.TorpedoDepotEmailFilterLexer = TorpedoDepotEmailFilterLexer;
// Static array of rule names for debugging purposes
TorpedoDepotEmailFilterLexer.ruleNames = [
    "ALPHANUMERIC", "NET", "COM", "WANNABEMIL", "WS"
];
// Static array of literal names for debugging purposes
TorpedoDepotEmailFilterLexer.literalNames = [
    null, null, "'.net'", "'.com'", "'.wannabemil'"
];
// Static array of symbolic names for debugging purposes
TorpedoDepotEmailFilterLexer.symbolicNames = [
    null, "ALPHANUMERIC", "NET", "COM", "WANNABEMIL", "WS"
];
// Vocabulary instance for this lexer
TorpedoDepotEmailFilterLexer.vocabulary = exports.vocabulary;
// Rule context class for lexer rules
class LexerRuleContext {
    constructor(lexer, parent, invokingState) {
        this.lexer = lexer;
        this.parent = parent;
        this.invokingState = invokingState;
    }
}
// ATN simulator class (simplified for our needs)
class TorpedoDepotEmailFilterLexerATNSimulator {
    constructor(recog) {
        this.recog = recog;
    }
}
//# sourceMappingURL=TorpedoDepotEmailFilterLexer.js.map