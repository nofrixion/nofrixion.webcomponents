import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const isBuilt = import.meta.env.PROD;
const builtClassesPrefix = import.meta.env.builtClassesPrefix;

const customTwMerge = extendTailwindMerge({
  prefix: isBuilt ? builtClassesPrefix : '',
});

export const cn = (...inputs: ClassValue[]) => customTwMerge(clsx(inputs));
