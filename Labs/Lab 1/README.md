# TorpedoDepot Email Highlighter VSCode Extension

A VSCode extension that uses ANTLR to highlight TorpedoDepot email addresses in blue.

## Features

- **ANTLR-based parsing**: Uses a custom ANTLR grammar to parse and validate email addresses
- **Real-time highlighting**: Automatically highlights valid TorpedoDepot emails as you type
- **Educational focus**: Heavily commented code to help learn TypeScript and ANTLR concepts

## Email Highlighting Rules

The extension highlights emails matching the pattern: `<local-part>@torpedodepot.<domain-suffix>`

- **local-part**: Only alphanumeric characters (a-z, A-Z, 0-9)
- **domain-suffix**: Must be `.net`, `.com`, or `.wannabemil`

### Examples

✅ **Highlighted (blue)**:
- `valid@torpedodepot.com`
- `test123@torpedodepot.net`
- `user@torpedodepot.wannabemil`

❌ **Not highlighted**:
- `invalid@gmail.com`
- `user@yahoo.net`
- `notanemail`

## Installation

1. Clone this repository
2. Install dependencies: `npm install`
3. Compile the extension: `npm run compile`
4. Press F5 to run the extension in a new Extension Development Host window

## Usage

1. Open any text file in VSCode
2. Type or paste TorpedoDepot email addresses
3. Valid emails will be automatically highlighted in blue
4. Use the test file `test-emails.txt` to see examples

## Technical Details

### ANTLR Grammar

The extension uses a custom ANTLR grammar (`TorpedoDepotEmailFilter.g4`) to define email parsing rules:

```antlr
grammar TorpedoDepotEmailFilter;

email: localPart '@torpedodepot' domainSuffix;
localPart: ALPHANUMERIC;
domainSuffix: NET | COM | WANNABEMIL;

ALPHANUMERIC: [a-zA-Z0-9]+;
NET: '.net';
COM: '.com';
WANNABEMIL: '.wannabemil';
WS: [ \t\r\n]+ -> skip;
```

### Architecture

- **extension.ts**: Main extension entry point and activation
- **emailHighlighter.ts**: VSCode decoration provider for text highlighting
- **emailParser.ts**: ANTLR-based email parsing logic
- **generated/**: Auto-generated ANTLR lexer, parser, and visitor classes

### Key TypeScript Concepts Demonstrated

- **Module system**: Import/export statements
- **Type annotations**: Interfaces, type safety
- **Async/await**: Promise handling
- **VSCode API**: Extension development, decorations
- **ANTLR integration**: Parser generation and usage

## Development

### Building

```bash
npm run compile
```

### Running

```bash
# Press F5 in VSCode to run in Extension Development Host
# Or use the command palette: "Developer: Reload Window"
```

### Testing

1. Open `test-emails.txt` in the Extension Development Host
2. Verify that valid TorpedoDepot emails are highlighted in blue
3. Verify that invalid emails are not highlighted

## Educational Value

This extension serves as a learning project for:

- **TypeScript fundamentals**: Types, interfaces, classes, modules
- **VSCode extension development**: API usage, decoration providers
- **ANTLR parsing**: Grammar definition, lexer/parser generation
- **Text processing**: Position tracking, range calculations
- **Error handling**: Try-catch blocks, graceful degradation

Every line of code is heavily commented to explain the underlying concepts and implementation details.

