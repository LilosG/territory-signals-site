/** The route slug for a product recipe key. */
export const recipeSlug = (key: string): string => (key === 'str_exit' ? 'short-term-rental-exit' : key.replaceAll('_', '-'));
