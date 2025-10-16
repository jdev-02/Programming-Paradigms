"use strict";
// Generated ANTLR4 TypeScript Visitor for TorpedoDepotEmailFilter grammar
// This file contains the base visitor class for traversing parse trees
Object.defineProperty(exports, "__esModule", { value: true });
exports.TorpedoDepotEmailFilterVisitor = void 0;
const AbstractParseTreeVisitor_1 = require("antlr4ts/tree/AbstractParseTreeVisitor");
/**
 * Base visitor class for the TorpedoDepotEmailFilter grammar
 * This class provides default implementations of all visitor methods
 * Users can extend this class and override specific methods to handle parse tree traversal
 *
 * The visitor pattern allows for different operations to be performed on parse tree nodes
 * without modifying the parse tree structure itself
 */
class TorpedoDepotEmailFilterVisitor extends AbstractParseTreeVisitor_1.AbstractParseTreeVisitor {
    // Visit method for email rule
    // This method is called when visiting an email node in the parse tree
    visitEmail(ctx) {
        // Default implementation visits all children and returns the result
        return this.visitChildren(ctx);
    }
    // Visit method for local part rule
    // This method is called when visiting a local part node in the parse tree
    visitLocalPart(ctx) {
        // Default implementation visits all children and returns the result
        return this.visitChildren(ctx);
    }
    // Visit method for domain suffix rule
    // This method is called when visiting a domain suffix node in the parse tree
    visitDomainSuffix(ctx) {
        // Default implementation visits all children and returns the result
        return this.visitChildren(ctx);
    }
    // Default visit method for any rule
    // This method is called when visiting any node that doesn't have a specific visit method
    defaultResult() {
        // Default implementation returns null
        // Override this method to provide a default return value
        return null;
    }
    // Method to aggregate results from multiple children
    // This method is called when a rule has multiple children and we need to combine their results
    aggregateResult(aggregate, nextResult) {
        // Default implementation returns the next result, ignoring the aggregate
        // Override this method to implement custom aggregation logic
        return nextResult;
    }
}
exports.TorpedoDepotEmailFilterVisitor = TorpedoDepotEmailFilterVisitor;
//# sourceMappingURL=TorpedoDepotEmailFilterVisitor.js.map