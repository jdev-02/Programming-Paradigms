// Generated ANTLR4 TypeScript Visitor for TorpedoDepotEmailFilter grammar
// This file contains the base visitor class for traversing parse trees

import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { 
  EmailContext, 
  LocalPartContext, 
  DomainSuffixContext 
} from './TorpedoDepotEmailFilterParser';

/**
 * Base visitor class for the TorpedoDepotEmailFilter grammar
 * This class provides default implementations of all visitor methods
 * Users can extend this class and override specific methods to handle parse tree traversal
 * 
 * The visitor pattern allows for different operations to be performed on parse tree nodes
 * without modifying the parse tree structure itself
 */
export class TorpedoDepotEmailFilterVisitor<T> extends AbstractParseTreeVisitor<T> {
  // Visit method for email rule
  // This method is called when visiting an email node in the parse tree
  public visitEmail(ctx: EmailContext): T {
    // Default implementation visits all children and returns the result
    return this.visitChildren(ctx);
  }

  // Visit method for local part rule
  // This method is called when visiting a local part node in the parse tree
  public visitLocalPart(ctx: LocalPartContext): T {
    // Default implementation visits all children and returns the result
    return this.visitChildren(ctx);
  }

  // Visit method for domain suffix rule
  // This method is called when visiting a domain suffix node in the parse tree
  public visitDomainSuffix(ctx: DomainSuffixContext): T {
    // Default implementation visits all children and returns the result
    return this.visitChildren(ctx);
  }

  // Default visit method for any rule
  // This method is called when visiting any node that doesn't have a specific visit method
  public defaultResult(): T {
    // Default implementation returns null
    // Override this method to provide a default return value
    return null as T;
  }

  // Method to aggregate results from multiple children
  // This method is called when a rule has multiple children and we need to combine their results
  public aggregateResult(aggregate: T, nextResult: T): T {
    // Default implementation returns the next result, ignoring the aggregate
    // Override this method to implement custom aggregation logic
    return nextResult;
  }
}

