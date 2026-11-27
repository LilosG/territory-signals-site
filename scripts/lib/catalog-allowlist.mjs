/** The only fields copied out of the product repo (DECISIONS.md S1). Anything else is rejected by check-catalog. */
export const CATALOG_SHAPE = {
  catalog_version: true,
  model_version: true,
  signal_types: ['key', 'label'],
  signal_groups: ['key', 'label'],
  recipes: ['key', 'label', 'short_description', 'requires_data'],
  components: ['key', 'kind', 'family', 'max_points', 'label', 'family_label'],
  owner_modifier_cap: true,
};
export const SCORING_KEYS = ['model_version', 'suppression', 'stacking', 'signals', 'owner_modifiers', 'recipes'];
export const SCORING_RECIPE_KEYS = ['label', 'short_description', 'description', 'rationale', 'when', 'requires_data'];

export const pick = (obj, keys) => Object.fromEntries(keys.filter((k) => k in obj).map((k) => [k, obj[k]]));
