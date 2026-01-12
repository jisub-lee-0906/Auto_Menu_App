import menuDb from '@/data/menu_db.json';

// Define the shape of our menu database based on the JSON structure
type MenuCategory = 'rice' | 'soup' | 'main' | 'side' | 'kimchi' | 'dessert';

export interface Menu {
  rice: string;
  soup: string;
  main: string;
  side1: string;
  side2: string;
  kimchi: string;
  dessert: string;
}

export type LockedState = {
  [K in keyof Menu]: boolean;
};

const CATEGORIES: MenuCategory[] = ['rice', 'soup', 'main', 'side', 'kimchi', 'dessert'];

/**
 * Helper to get a random item from an array
 */
function getRandomItem(items: string[]): string {
  if (!items || items.length === 0) return '';
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

/**
 * Generates a random menu, respecting locked items.
 * @param currentMenu The current menu state (needed if locks are active)
 * @param lockedState The state of locked items (true = locked)
 * @returns A new Menu object
 */
export function generateMenu(
  currentMenu?: Menu,
  lockedState?: LockedState
): Menu {
  // Type assertion since we know the JSON structure matches
  const db = menuDb as Record<MenuCategory, string[]>;

  // Initialize new menu
  const newMenu: Partial<Menu> = {};

  // 1. Handle Rice, Soup, Main, Kimchi, Dessert
  const standardFields: (keyof Menu)[] = ['rice', 'soup', 'main', 'kimchi', 'dessert'];
  
  standardFields.forEach((field) => {
    // If locked and currentMenu exists, keep the old value
    if (lockedState?.[field] && currentMenu?.[field]) {
      newMenu[field] = currentMenu[field];
    } else {
      // Otherwise, pick a new random item from the DB
      // Note: field name matches DB key name for these
      newMenu[field] = getRandomItem(db[field as MenuCategory]);
    }
  });

  // 2. Handle Sides (Side1 and Side2)
  // We need to pick 2 unique sides if possible
  const sidePool = db.side;
  
  // Logic for Side 1
  if (lockedState?.side1 && currentMenu?.side1) {
    newMenu.side1 = currentMenu.side1;
  } else {
    newMenu.side1 = getRandomItem(sidePool);
  }

  // Logic for Side 2
  // Make sure Side 2 != Side 1 (unless the DB is very small)
  if (lockedState?.side2 && currentMenu?.side2) {
    newMenu.side2 = currentMenu.side2;
  } else {
    let pick = getRandomItem(sidePool);
    // Simple retry to avoid duplicates, only if not locked
    // If side1 is locked, we still want to avoid it
    const side1 = newMenu.side1; // guaranteed to be set by now
    
    // Try to find a non-duplicate
    let attempts = 0;
    while (pick === side1 && attempts < 5) {
      pick = getRandomItem(sidePool);
      attempts++;
    }
    newMenu.side2 = pick;
  }

  return newMenu as Menu;
}
