export const contentEl =
  document.getElementById("content") ??
  (() => {
    throw new Error("content element not found");
  })();


