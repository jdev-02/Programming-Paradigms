// Generated ANTLR4 TypeScript Lexer for TorpedoDepotEmailFilter grammar
// This file contains the lexer that breaks input text into tokens

import { Lexer } from 'antlr4ts/Lexer';
import { CharStream } from 'antlr4ts/CharStream';
import { Token } from 'antlr4ts/Token';
import { Vocabulary } from 'antlr4ts/Vocabulary';

// Token type constants - these represent the different types of tokens our lexer can recognize
export const ALPHANUMERIC = 1; // Token type for alphanumeric characters
export const NET = 2;           // Token type for '.net' domain suffix
export const COM = 3;           // Token type for '.com' domain suffix
export const WANNABEMIL = 4;    // Token type for '.wannabemil' domain suffix
export const WS = 5;            // Token type for whitespace (skipped)
export const EOF = -1;          // End of file token

// Vocabulary object that maps token types to their string representations
export const vocabulary: Vocabulary = {
  getDisplayName: (tokenType: number): string => {
    switch (tokenType) {
      case ALPHANUMERIC: return 'ALPHANUMERIC';
      case NET: return 'NET';
      case COM: return 'COM';
      case WANNABEMIL: return 'WANNABEMIL';
      case WS: return 'WS';
      case EOF: return 'EOF';
      default: return 'UNKNOWN';
    }
  },
  getLiteralName: (tokenType: number): string | undefined => {
    switch (tokenType) {
      case NET: return "'.net'";
      case COM: return "'.com'";
      case WANNABEMIL: return "'.wannabemil'";
      default: return undefined;
    }
  },
  getSymbolicName: (tokenType: number): string | undefined => {
    return vocabulary.getDisplayName(tokenType);
  },
  maxTokenType: WANNABEMIL
};

/**
 * Custom lexer class that extends ANTLR4's base Lexer
 * This class is responsible for breaking input text into tokens according to our grammar rules
 */
export class TorpedoDepotEmailFilterLexer extends Lexer {
  // Static array of rule names for debugging purposes
  public static readonly ruleNames: string[] = [
    "ALPHANUMERIC", "NET", "COM", "WANNABEMIL", "WS"
  ];

  // Static array of literal names for debugging purposes
  public static readonly literalNames: (string | null)[] = [
    null, null, "'.net'", "'.com'", "'.wannabemil'"
  ];

  // Static array of symbolic names for debugging purposes
  public static readonly symbolicNames: (string | null)[] = [
    null, "ALPHANUMERIC", "NET", "COM", "WANNABEMIL", "WS"
  ];

  // Vocabulary instance for this lexer
  public static readonly vocabulary: Vocabulary = vocabulary;

  // Required abstract properties
  public readonly channelNames: string[] = [];
  public readonly grammarFileName: string = "TorpedoDepotEmailFilter.g4";
  public readonly modeNames: string[] = ["DEFAULT_MODE"];
  public readonly ruleNames: string[] = TorpedoDepotEmailFilterLexer.ruleNames;

  // Constructor that initializes the lexer with an input stream
  constructor(input: CharStream) {
    super(input);
    // Note: ATN simulator is simplified for this implementation
  }

  // Getter for the vocabulary
  public get vocabulary(): Vocabulary {
    return TorpedoDepotEmailFilterLexer.vocabulary;
  }

  // Main tokenization method - this is called by the lexer to get the next token
  public nextToken(): Token {
    try {
      // Skip whitespace tokens as specified in the grammar
      while (true) {
        // Check if we're at the end of input
        if (this._input.LA(1) === EOF) {
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
          return this.emitToken(WANNABEMIL, '.wannabemil');
        }
        
        if (this.matchString('.net')) {
          return this.emitToken(NET, '.net');
        }
        
        if (this.matchString('.com')) {
          return this.emitToken(COM, '.com');
        }

        // Match alphanumeric characters
        if (this.isAlphanumeric(c)) {
          let text = '';
          while (this.isAlphanumeric(this._input.LA(1))) {
            text += String.fromCharCode(this._input.LA(1));
            this._input.consume();
          }
          return this.emitToken(ALPHANUMERIC, text);
        }

        // If we can't match anything, consume the character and continue
        this._input.consume();
      }
    } catch (e) {
      // If there's an error, emit an error token
      return this.emitErrorToken();
    }
  }

  // Helper method to check if a character is alphanumeric
  private isAlphanumeric(c: number): boolean {
    return (c >= 48 && c <= 57) ||  // 0-9
           (c >= 65 && c <= 90) ||  // A-Z
           (c >= 97 && c <= 122);   // a-z
  }

  // Helper method to check if the input matches a specific string
  private matchString(str: string): boolean {
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
  private emitToken(type: number, text: string): Token {
    // Create a simple token implementation using the factory
    const startIndex = this._input.index - text.length;
    const stopIndex = this._input.index - 1;
    return this._factory.create(
      { source: this, stream: this._input },
      type,
      text,
      0, // channel
      startIndex,
      stopIndex,
      this.line,
      this.charPositionInLine - text.length
    );
  }

  // Helper method to emit an EOF token
  public emitEOF(): Token {
    return this.emitToken(EOF, '<EOF>');
  }

  // Helper method to emit an error token
  private emitErrorToken(): Token {
    return this.emitToken(-1, '<INVALID>');
  }
}

// Rule context class for lexer rules
class LexerRuleContext {
  constructor(
    public readonly lexer: TorpedoDepotEmailFilterLexer,
    public readonly parent: any,
    public readonly invokingState: number
  ) {}
}

// ATN simulator class (simplified for our needs)
class TorpedoDepotEmailFilterLexerATNSimulator {
  constructor(public readonly recog: TorpedoDepotEmailFilterLexer) {}
}
