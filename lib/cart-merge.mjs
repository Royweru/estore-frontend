export function mergeCartLines(localItems, serverItems) {
  const mergedByProduct = new Map();

  for (const serverItem of serverItems) {
    mergedByProduct.set(serverItem.product_id, {
      product: serverItem.product,
      quantity: serverItem.quantity,
    });
  }

  for (const localItem of localItems) {
    const existing = mergedByProduct.get(localItem.product.id);
    const quantity = existing ? Math.max(existing.quantity, localItem.quantity) : localItem.quantity;
    mergedByProduct.set(localItem.product.id, {
      product: localItem.product,
      quantity,
    });
  }

  return Array.from(mergedByProduct.values());
}
