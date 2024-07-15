/**
 * Decorator to log method calls
 * @param className 
 * @description This decorator logs all method calls of a class
 * @returns 
 */
export function LogMethodsCalls(className: string) {
  return function(target: any) {
    Object.getOwnPropertyNames(target.prototype).forEach(methodName => {
      const originalMethod = target.prototype[methodName];
      if (methodName !== "constructor" && typeof originalMethod === "function") {
        target.prototype[methodName] = function(...args: any[]) {
          console.log(`${className}.${methodName} called with args:`, args);
          return originalMethod.apply(this, args);
        };
      }
    });
  };
}
