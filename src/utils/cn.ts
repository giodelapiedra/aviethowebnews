type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, boolean | null | undefined>
  | ClassValue[];

export const cn = (...inputs: ClassValue[]): string => {
  const classes: string[] = [];

  const walk = (value: ClassValue): void => {
    if (!value) return;
    if (typeof value === 'string' || typeof value === 'number') {
      classes.push(String(value));
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (typeof value === 'object') {
      for (const key in value) {
        if (value[key]) classes.push(key);
      }
    }
  };

  inputs.forEach(walk);
  return classes.join(' ');
};
