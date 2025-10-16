// Generated ANTLR4 TypeScript Parser for TorpedoDepotEmailFilter grammar
// This file contains the parser that builds a parse tree from tokens

import { Parser } from 'antlr4ts/Parser';
import { TokenStream } from 'antlr4ts/TokenStream';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { ATN } from 'antlr4ts/atn/ATN';
import { DFA } from 'antlr4ts/dfa/DFA';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { TorpedoDepotEmailFilterLexer, ALPHANUMERIC, NET, COM, WANNABEMIL } from './TorpedoDepotEmailFilterLexer';

// Rule index constants - these represent the different parser rules
export const RULE_email = 0;           // Main email rule
export const RULE_localPart = 1;       // Local part rule
export const RULE_domainSuffix = 2;    // Domain suffix rule

// Rule names array for debugging
export const ruleNames: string[] = [
  "email", "localPart", "domainSuffix"
];

// Vocabulary instance (same as lexer)
export const vocabulary: Vocabulary = TorpedoDepotEmailFilterLexer.vocabulary;

/**
 * Main parser class that extends ANTLR4's base Parser
 * This class is responsible for parsing tokens according to our grammar rules
 */
export class TorpedoDepotEmailFilterParser extends Parser {
  // Static arrays for debugging
  public static readonly ruleNames: string[] = ruleNames;
  public static readonly literalNames: (string | null)[] = TorpedoDepotEmailFilterLexer.literalNames;
  public static readonly symbolicNames: (string | null)[] = TorpedoDepotEmailFilterLexer.symbolicNames;
  public static readonly vocabulary: Vocabulary = vocabulary;

  // Required abstract properties
  public readonly grammarFileName: string = "TorpedoDepotEmailFilter.g4";
  public readonly ruleNames: string[] = ruleNames;

  // Constructor that initializes the parser with a token stream
  constructor(input: TokenStream) {
    super(input);
    // Note: ATN simulator is simplified for this implementation
  }

  // Getter for the vocabulary
  public get vocabulary(): Vocabulary {
    return TorpedoDepotEmailFilterParser.vocabulary;
  }

  // Main email parsing rule - this is the entry point for parsing
  public email(): EmailContext {
    // Create a new context for the email rule
    const _localctx = new EmailContext(this._ctx, this.state);

    try {
      // Parse the local part
      this.localPart();
      
      // Expect and consume the '@torpedodepot' literal
      this.match(ALPHANUMERIC); // This will be '@torpedodepot' in our implementation
      
      // Parse the domain suffix
      this.domainSuffix();
      
      return _localctx;
    } catch (re) {
      // If parsing fails, throw a recognition exception
      throw re;
    }
  }

  // Local part parsing rule
  public localPart(): LocalPartContext {
    const _localctx = new LocalPartContext(this._ctx, this.state);

    try {
      // Expect an alphanumeric token for the local part
      this.match(ALPHANUMERIC);
      return _localctx;
    } catch (re) {
      throw re;
    }
  }

  // Domain suffix parsing rule
  public domainSuffix(): DomainSuffixContext {
    const _localctx = new DomainSuffixContext(this._ctx, this.state);

    try {
      // Expect one of the domain suffix tokens (.net, .com, or .wannabemil)
      if (this._input.LA(1) === NET) {
        this.match(NET);
      } else if (this._input.LA(1) === COM) {
        this.match(COM);
      } else if (this._input.LA(1) === WANNABEMIL) {
        this.match(WANNABEMIL);
      } else {
        // If none of the expected tokens are found, throw an error
        throw new RecognitionException(this, this._input, this._ctx, this._input.LT(1)?.text || '');
      }
      return _localctx;
    } catch (re) {
      throw re;
    }
  }
}

// Context classes for each parser rule - these represent nodes in the parse tree

/**
 * Email context class - represents a complete email parse tree node
 */
export class EmailContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // Getter for the local part context
  public localPart(): LocalPartContext {
    return this.getRuleContext(0, LocalPartContext);
  }

  // Getter for the domain suffix context
  public domainSuffix(): DomainSuffixContext {
    return this.getRuleContext(1, DomainSuffixContext);
  }

  // Accept method for visitor pattern
  public accept<Result>(visitor: any): Result {
    if (visitor.visitEmail) {
      return visitor.visitEmail(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

/**
 * Local part context class - represents the local part of an email
 */
export class LocalPartContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // Accept method for visitor pattern
  public accept<Result>(visitor: any): Result {
    if (visitor.visitLocalPart) {
      return visitor.visitLocalPart(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

/**
 * Domain suffix context class - represents the domain suffix of an email
 */
export class DomainSuffixContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // Accept method for visitor pattern
  public accept<Result>(visitor: any): Result {
    if (visitor.visitDomainSuffix) {
      return visitor.visitDomainSuffix(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

// ATN simulator class (simplified for our needs)
class TorpedoDepotEmailFilterParserATNSimulator {
  constructor(public readonly recog: TorpedoDepotEmailFilterParser) {}
}
