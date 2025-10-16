// Generated ANTLR4 TypeScript Listener for TorpedoDepotEmailFilter grammar
// This file contains the base listener class for traversing parse trees

import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { 
  EmailContext, 
  LocalPartContext, 
  DomainSuffixContext 
} from './TorpedoDepotEmailFilterParser';

/**
 * Base listener class for the TorpedoDepotEmailFilter grammar
 * This class provides empty implementations of all listener methods
 * Users can extend this class and override specific methods to handle parse tree events
 */
export class TorpedoDepotEmailFilterListener implements ParseTreeListener {
  // Called when entering an email rule
  // This method is called when the parser starts processing an email
  public enterEmail(ctx: EmailContext): void {
    // Default implementation does nothing
    // Override this method to handle entering an email context
  }

  // Called when exiting an email rule
  // This method is called when the parser finishes processing an email
  public exitEmail(ctx: EmailContext): void {
    // Default implementation does nothing
    // Override this method to handle exiting an email context
  }

  // Called when entering a local part rule
  // This method is called when the parser starts processing the local part of an email
  public enterLocalPart(ctx: LocalPartContext): void {
    // Default implementation does nothing
    // Override this method to handle entering a local part context
  }

  // Called when exiting a local part rule
  // This method is called when the parser finishes processing the local part of an email
  public exitLocalPart(ctx: LocalPartContext): void {
    // Default implementation does nothing
    // Override this method to handle exiting a local part context
  }

  // Called when entering a domain suffix rule
  // This method is called when the parser starts processing the domain suffix of an email
  public enterDomainSuffix(ctx: DomainSuffixContext): void {
    // Default implementation does nothing
    // Override this method to handle entering a domain suffix context
  }

  // Called when exiting a domain suffix rule
  // This method is called when the parser finishes processing the domain suffix of an email
  public exitDomainSuffix(ctx: DomainSuffixContext): void {
    // Default implementation does nothing
    // Override this method to handle exiting a domain suffix context
  }

  // Called when entering any rule
  // This method is called for every rule entry in the parse tree
  public enterEveryRule(ctx: any): void {
    // Default implementation does nothing
    // Override this method to handle entering any rule
  }

  // Called when exiting any rule
  // This method is called for every rule exit in the parse tree
  public exitEveryRule(ctx: any): void {
    // Default implementation does nothing
    // Override this method to handle exiting any rule
  }

  // Called when visiting a terminal node
  // This method is called when visiting leaf nodes in the parse tree
  public visitTerminal(node: any): void {
    // Default implementation does nothing
    // Override this method to handle terminal nodes
  }

  // Called when visiting an error node
  // This method is called when visiting error nodes in the parse tree
  public visitErrorNode(node: any): void {
    // Default implementation does nothing
    // Override this method to handle error nodes
  }
}

