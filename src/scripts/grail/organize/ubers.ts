import { Item } from "../../items/types/Item";
import { layout } from "../layout";
import { PageFlags, Stash } from "../../stash/types";
import { moveItem } from "../../stash/moveItem";
import { makeIndex } from "../../stash/makeIndex";
import { sortAndGroupBy } from "./sortAndGroupBy";

// Order to display them in
export const UBERS = ["pk1", "pk2", "pk3", "dhn", "bey", "mbr"];

export function organizeUbers(stash: Stash, items: Item[]) {
  if (items.length === 0) return;

  const groups = sortAndGroupBy(items, (item) => UBERS.indexOf(item.code));
  const offset = stash.pages.length;
  const { nbPages, positions } = layout("lines", groups);
  for (let i = 0; i < nbPages; i++) {
    const page = { name: "# Ubers", items: [], flags: PageFlags.SHARED };
    if (i === 0) {
      makeIndex(page, false);
    }
    stash.pages.push(page);
  }
  for (const [item, { page, rows, cols }] of positions.entries()) {
    moveItem(stash, item, offset + page, rows[0], cols[0]);
  }
}