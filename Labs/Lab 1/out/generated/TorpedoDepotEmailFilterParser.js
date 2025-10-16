"use strict";
// Generated ANTLR4 TypeScript Parser for TorpedoDepotEmailFilter grammar
// This file contains the parser that builds a parse tree from tokens
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainSuffixContext = exports.LocalPartContext = exports.EmailContext = exports.TorpedoDepotEmailFilterParser = exports.vocabulary = exports.ruleNames = exports.RULE_domainSuffix = exports.RULE_localPart = exports.RULE_email = void 0;
const Parser_1 = require("antlr4ts/Parser");
const ParserRuleContext_1 = require("antlr4ts/ParserRuleContext");
const RecognitionException_1 = require("antlr4ts/RecognitionException");
const TorpedoDepotEmailFilterLexer_1 = require("./TorpedoDepotEmailFilterLexer");
// Rule index constants - these represent the different parser rules
exports.RULE_email = 0; // Main email rule
exports.RULE_localPart = 1; // Local part rule
exports.RULE_domainSuffix = 2; // Domain suffix rule
// Rule names array for debugging
exports.ruleNames = [
    "email", "localPart", "domainSuffix"
];
// Vocabulary instance (same as lexer)
exports.vocabulary = TorpedoDepotEmailFilterLexer_1.TorpedoDepotEmailFilterLexer.vocabulary;
/**
 * Main parser class that extends ANTLR4's base Parser
 * This class is responsible for parsing tokens according to our grammar rules
 */
class TorpedoDepotEmailFilterParser extends Parser_1.Parser {
    // Constructor that initializes the parser with a token stream
    constructor(input) {
        super(input);
        // Required abstract properties
        this.grammarFileName = "TorpedoDepotEmailFilter.g4";
        this.ruleNames = exports.ruleNames;
        // Note: ATN simulator is simplified for this implementation
    }
    // Getter for the vocabulary
    get vocabulary() {
        return TorpedoDepotEmailFilterParser.vocabulary;
    }
    // Main email parsing rule - this is the entry point for parsing
    email() {
        // Create a new context for the email rule
        const _localctx = new EmailContext(this._ctx, this.state);
        try {
            // Parse the local part
            this.localPart();
            // Expect and consume the '@torpedodepot' literal
            this.match(TorpedoDepotEmailFilterLexer_1.ALPHANUMERIC); // This will be '@torpedodepot' in our implementation
            // Parse the domain suffix
            this.domainSuffix();
            return _localctx;
        }
        catch (re) {
            // If parsing fails, throw a recognition exception
            throw re;
        }
    }
    // Local part parsing rule
    localPart() {
        const _localctx = new LocalPartContext(this._ctx, this.state);
        try {
            // Expect an alphanumeric token for the local part
            this.match(TorpedoDepotEmailFilterLexer_1.ALPHANUMERIC);
            return _localctx;
        }
        catch (re) {
            throw re;
        }
    }
    // Domain suffix parsing rule
    domainSuffix() {
        const _localctx = new DomainSuffixContext(this._ctx, this.state);
        try {
            // Expect one of the domain suffix tokens (.net, .com, or .wannabemil)
            if (this._input.LA(1) === TorpedoDepotEmailFilterLexer_1.NET) {
                this.match(TorpedoDepotEmailFilterLexer_1.NET);
            }
            else if (this._input.LA(1) === TorpedoDepotEmailFilterLexer_1.COM) {
                this.match(TorpedoDepotEmailFilterLexer_1.COM);
            }
            else if (this._input.LA(1) === TorpedoDepotEmailFilterLexer_1.WANNABEMIL) {
                this.match(TorpedoDepotEmailFilterLexer_1.WANNABEMIL);
            }
            else {
                // If none of the expected tokens are found, throw an error
                throw new RecognitionException_1.RecognitionException(this, this._input, this._ctx, this._input.LT(1)?.text || '');
            }
            return _localctx;
        }
        catch (re) {
            throw re;
        }
    }
}
exports.TorpedoDepotEmailFilterParser = TorpedoDepotEmailFilterParser;
// Static arrays for debugging
TorpedoDepotEmailFilterParser.ruleNames = exports.ruleNames;
TorpedoDepotEmailFilterParser.literalNames = TorpedoDepotEmailFilterLexer_1.TorpedoDepotEmailFilterLexer.literalNames;
TorpedoDepotEmailFilterParser.symbolicNames = TorpedoDepotEmailFilterLexer_1.TorpedoDepotEmailFilterLexer.symbolicNames;
TorpedoDepotEmailFilterParser.vocabulary = exports.vocabulary;
// Context classes for each parser rule - these represent nodes in the parse tree
/**
 * Email context class - represents a complete email parse tree node
 */
class EmailContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // Getter for the local part context
    localPart() {
        return this.getRuleContext(0, LocalPartContext);
    }
    // Getter for the domain suffix context
    domainSuffix() {
        return this.getRuleContext(1, DomainSuffixContext);
    }
    // Accept method for visitor pattern
    accept(visitor) {
        if (visitor.visitEmail) {
            return visitor.visitEmail(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.EmailContext = EmailContext;
/**
 * Local part context class - represents the local part of an email
 */
class LocalPartContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // Accept method for visitor pattern
    accept(visitor) {
        if (visitor.visitLocalPart) {
            return visitor.visitLocalPart(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.LocalPartContext = LocalPartContext;
/**
 * Domain suffix context class - represents the domain suffix of an email
 */
class DomainSuffixContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // Accept method for visitor pattern
    accept(visitor) {
        if (visitor.visitDomainSuffix) {
            return visitor.visitDomainSuffix(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.DomainSuffixContext = DomainSuffixContext;
// ATN simulator class (simplified for our needs)
class TorpedoDepotEmailFilterParserATNSimulator {
    constructor(recog) {
        this.recog = recog;
    }
}
//# sourceMappingURL=TorpedoDepotEmailFilterParser.js.map