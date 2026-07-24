type ClassValue = string | undefined | null | false | { [key: string]: boolean };
type ClassArray = ClassValue[];

export function cn(...inputs: (ClassValue | ClassArray)[]): string {
  return inputs
    .flat()
    .filter((x): x is string => typeof x === 'string' && x.length > 0)
    .join(' ');
}

export function createCSSScope(componentName: string) {
  return (suffix: string) => `${componentName}__${suffix}`;
}

export function mergeClasses(...classes: (string | undefined)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .split(' ')
    .filter(Boolean)
    .join(' ');
}

export default cn;
