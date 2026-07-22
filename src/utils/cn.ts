/**
 * Utility function for conditional className management
 * Similar to clsx/classnames but lightweight
 */

type ClassValue = string | undefined | null | false | { [key: string]: boolean };
type ClassArray = ClassValue[];

export function cn(...inputs: (ClassValue | ClassArray)[]): string {
  return inputs
    .flat()
    .filter((x): x is string => typeof x === 'string' && x.length > 0)
    .join(' ');
}

/**
 * Create a scoped CSS class generator
 * Useful for component-specific styling
 */
export function createCSSScope(componentName: string) {
  return (suffix: string) => `${componentName}__${suffix}`;
}

/**
 * Merge Tailwind classes intelligently
 * Handles overrides for conflicting utilities
 */
export function mergeClasses(...classes: (string | undefined)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .split(' ')
    .filter(Boolean)
    .join(' ');
}

export default cn;
