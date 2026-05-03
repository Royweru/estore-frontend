import assert from "node:assert/strict";

import { mergeCartLines } from "../lib/cart-merge.mjs";

{
  const product = { id: "p1", name: "Tee" };
  const localItems = [{ product, quantity: 3 }];
  const serverItems = [{ product_id: "p1", product, quantity: 1 }];

  const merged = mergeCartLines(localItems, serverItems);

  assert.equal(merged.length, 1);
  assert.equal(merged[0].product.id, "p1");
  assert.equal(merged[0].quantity, 3);
}

{
  const localItems = [];
  const serverItems = [
    {
      product_id: "p2",
      product: { id: "p2", name: "Hoodie" },
      quantity: 2,
    },
  ];

  const merged = mergeCartLines(localItems, serverItems);

  assert.equal(merged.length, 1);
  assert.equal(merged[0].product.id, "p2");
  assert.equal(merged[0].quantity, 2);
}
