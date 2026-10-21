import { StoreItem, StoreCategory } from '../types';
import { slugify } from '../lib/mediaStorage';

export interface StoreUrlParams {
  productId: string | null;
  category: string | null;
}

/**
 * Parses the current browser URL (search params, pathname, or hash)
 * to extract active category and/or product identifiers.
 */
export function parseStoreUrl(): StoreUrlParams {
  if (typeof window === 'undefined') {
    return { productId: null, category: null };
  }

  const pathname = decodeURIComponent(window.location.pathname || '');
  const search = window.location.search || '';
  const hash = decodeURIComponent(window.location.hash || '');

  const searchParams = new URLSearchParams(search);

  // 1. Direct query parameters in search string (?producto=... &categoria=...)
  let productId = searchParams.get('producto') || searchParams.get('product') || searchParams.get('p') || null;
  let category = searchParams.get('categoria') || searchParams.get('category') || searchParams.get('cat') || null;

  // 2. Query parameters inside hash string (#tienda?producto=... &categoria=...)
  if (hash.includes('?')) {
    const hashQuery = hash.split('?')[1];
    const hashParams = new URLSearchParams(hashQuery);
    if (!productId) productId = hashParams.get('producto') || hashParams.get('product') || hashParams.get('p') || null;
    if (!category) category = hashParams.get('categoria') || hashParams.get('category') || hashParams.get('cat') || null;
  }

  // 3. Path segments: /producto/:id or /tienda/producto/:id
  if (!productId) {
    const prodMatch = pathname.match(/(?:^|\/)(?:producto|product)\/([^/?#]+)/i);
    if (prodMatch && prodMatch[1]) {
      productId = prodMatch[1];
    }
  }

  // 4. Path segments: /categoria/:cat or /tienda/categoria/:cat
  if (!category) {
    const catMatch = pathname.match(/(?:^|\/)(?:categoria|category)\/([^/?#]+)/i);
    if (catMatch && catMatch[1]) {
      category = catMatch[1];
    }
  }

  // 5. Hash path segments: #producto/:id or #categoria/:cat
  if (!productId) {
    const hashProdMatch = hash.match(/#(?:producto|product)\/([^/?#]+)/i);
    if (hashProdMatch && hashProdMatch[1]) {
      productId = hashProdMatch[1];
    }
  }

  if (!category) {
    const hashCatMatch = hash.match(/#(?:categoria|category)\/([^/?#]+)/i);
    if (hashCatMatch && hashCatMatch[1]) {
      category = hashCatMatch[1];
    }
  }

  return {
    productId: productId ? productId.trim() : null,
    category: category ? category.trim() : null,
  };
}

/**
 * Builds a clean canonical store URL string based on category and product selection.
 * Examples:
 *  - /tienda
 *  - /tienda?categoria=papeleria
 *  - /tienda?producto=pack-web-pyme
 *  - /tienda?categoria=papeleria&producto=resma-papel
 */
export function buildStoreUrl(category?: string | null, productId?: string | null): string {
  const params = new URLSearchParams();

  if (category && category !== 'todos' && category !== 'all') {
    params.set('categoria', category);
  }

  if (productId) {
    params.set('producto', productId);
  }

  const queryString = params.toString();
  return queryString ? `/tienda?${queryString}` : '/tienda';
}

/**
 * Finds a StoreItem in the items collection using either:
 * 1. Exact ID
 * 2. Case-insensitive ID
 * 3. Slugified ID
 * 4. Slugified name
 * 5. Partial title match
 */
export function findStoreItem(items: StoreItem[], identifier: string): StoreItem | null {
  if (!identifier || !Array.isArray(items) || items.length === 0) return null;

  const raw = identifier.trim();
  const lower = raw.toLowerCase();
  const slug = slugify(raw);

  // 1. Exact id
  const exactId = items.find((it) => it.id === raw);
  if (exactId) return exactId;

  // 2. Case-insensitive id
  const caseId = items.find((it) => it.id.toLowerCase() === lower);
  if (caseId) return caseId;

  // 3. Slugified id
  const slugId = items.find((it) => slugify(it.id) === slug);
  if (slugId) return slugId;

  // 4. Slugified name
  const slugName = items.find((it) => slugify(it.name) === slug);
  if (slugName) return slugName;

  // 5. Partial match (in case of friendly URLs)
  const partial = items.find((it) => {
    const itemSlug = slugify(it.name);
    return itemSlug.includes(slug) || slug.includes(itemSlug);
  });
  if (partial) return partial;

  return null;
}

/**
 * Finds the canonical category id from an input identifier (id or label).
 */
export function findCategoryId(
  categories: (StoreCategory | { id: string; label: string })[],
  identifier: string
): string | null {
  if (!identifier || !Array.isArray(categories) || categories.length === 0) return null;

  const raw = identifier.trim();
  const lower = raw.toLowerCase().replace(/-/g, '_');
  const slug = slugify(raw);

  // 1. Direct match on id
  const directId = categories.find((c) => c.id.toLowerCase() === lower || c.id === raw);
  if (directId) return directId.id;

  // 2. Slugified id match
  const slugId = categories.find((c) => slugify(c.id) === slug);
  if (slugId) return slugId.id;

  // 3. Slugified label match (e.g. 'papeleria', 'impresion-digitacion')
  const slugLabel = categories.find((c) => slugify(c.label) === slug);
  if (slugLabel) return slugLabel.id;

  return null;
}
