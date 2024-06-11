import PocketBase from "pocketbase";

export const pb = new PocketBase(
  import.meta.env.DEV ? "https://lo-bzwu.ch" : undefined
);
