type CacheKey = string;
type CacheValue = string;

const cache = new Map<CacheKey, CacheValue>();

export const getFromCache = (key: CacheKey): string | undefined => {
  return cache.get(key);
};

export const saveToCache = (key: CacheKey, value: string): void => {
  cache.set(key, value);
};

export const clearCache = (): void => {
  cache.clear();
};

export const generateCacheKey = (
  text: string,
  from: string,
  to: string
): CacheKey => {
  return `${text}_${from}_${to}`;
};
