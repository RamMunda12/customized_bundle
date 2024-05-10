// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
// const NO_CHANGES = {
//   operations: [],
// };

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */

// gid://shopify/ProductVariant/48340586594599
export function run(input) {
  const groupedItems = {};

  input.cart.lines.forEach(line => {
      const bundleId = line?.bundleId;
      if (bundleId && bundleId.value) {
          if (!groupedItems[bundleId.value]) {
              groupedItems[bundleId.value] = [];
          }
          groupedItems[bundleId.value].push(line);
      }
  });

  return {
      operations: [
          ...Object.values(groupedItems).map(group => {
              const mergeOperation = {
                  merge: {
                      cartLines: group.map(line => {
                          return {
                              cartLineId: line.id,
                              quantity: line.quantity,
                          };
                      }),
                      parentVariantId: "gid://shopify/ProductVariant/48340586594599",
                  }
              };
              return mergeOperation;
          })
      ],
  };
}
