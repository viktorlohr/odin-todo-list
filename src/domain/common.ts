export type Brand<K, T> = K & { readonly __brand: T };

export function updateItemInItems<T>(
  items: T[],
  idKey: keyof T,
  updatedItem: T,
): T[] {
  const filteredItems = items.filter(
    (item) => item[idKey] != updatedItem[idKey],
  );

  if (filteredItems.length === items.length) {
    throw new Error("Cannot update Object as it does not exist yet");
  }

  const updatedItems = [...filteredItems, updatedItem];

  return updatedItems;
}

export function removeItemInItems<T, K extends keyof T>(
  items: T[],
  idKey: K,
  idToRemove: T[K],
): T[] {
  const filteredItems = items.filter((item) => item[idKey] != idToRemove);

  if (filteredItems.length == items.length) {
    throw new Error(
      `Could not remove item with id ${idToRemove} as it does not exist.`,
    );
  }

  return filteredItems;
}

export function addItemToItems<T>(items: T[], idKey: keyof T, newItem: T): T[] {
  if (items.some((item) => item[idKey] === newItem[idKey])) {
    throw new Error(`item with id ${newItem[idKey]} already exists`);
  }

  return [...items, newItem];
}
