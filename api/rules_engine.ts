
import { DB } from './db_engine';
import { Rule, Product, Order, User } from '../types';

/**
 * MANUAL RULES ENGINE
 * Executes deterministic logic blocks (IF/THEN) defined by Admins.
 * NO AI: Purely conditional threshold-based logic.
 */
class RulesEngine {
  
  /**
   * Evaluates a product against active safety rules.
   */
  async evaluateProduct(product: Product): Promise<string[]> {
    const activeRules = DB.rules.filter(r => r.isActive);
    const triggers: string[] = [];

    activeRules.forEach(rule => {
      // Manual Condition Parsers
      if (rule.condition.includes('price >')) {
        const threshold = parseInt(rule.condition.split('>')[1].trim());
        if (product.price > threshold) triggers.push(rule.action);
      }
      
      if (rule.condition.includes('category ===')) {
        const cat = rule.condition.split('===')[1].trim().replace(/['"]/g, '');
        if (product.category === cat) triggers.push(rule.action);
      }
    });

    return triggers;
  }

  /**
   * Evaluates an order against fiscal risk rules.
   */
  async evaluateOrder(order: Order): Promise<string[]> {
    const activeRules = DB.rules.filter(r => r.isActive);
    const triggers: string[] = [];

    activeRules.forEach(rule => {
      if (rule.condition.includes('total >')) {
        const threshold = parseInt(rule.condition.split('>')[1].trim());
        if (order.total > threshold) triggers.push(rule.action);
      }
    });

    return triggers;
  }
}

export const rulesEngine = new RulesEngine();
