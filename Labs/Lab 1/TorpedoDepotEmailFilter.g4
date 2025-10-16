//- It is of the form <local-part>@torpedodepot.<domain-suffix>
//- <local-part> is ONLY alpha-numeric characters.
//- <domain-suffix> can only be .net, .com, or .wannabemil
//- Use ANTLR .g4 format in your design. What is this you ask? Read on.
//- Draw a finite state machine for the tokenizer used in your rules (lexical analyzer, lexer).

grammar TorpedoDepotEmailFilter;

//entry point for parser
email: localPart '@torpedodepot' domainSuffix;

localPart: ALPHANUMERIC;

domainSuffix: NET | COM | WANNABEMIL;

//tokens for lexer
ALPHANUMERIC: [a-zA-Z0-9]+; //1 or more of the accepted chars nothing special
NET: '.net';
COM: '.com';
WANNABEMIL: '.wannabemil';

//Whitespace handling from slide
WS: [ \t\r\n]+ -> skip;
