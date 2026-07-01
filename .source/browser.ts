// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"getting-started.mdx": () => import("../content/docs/getting-started.mdx?collection=docs"), "(root)/index.mdx": () => import("../content/docs/(root)/index.mdx?collection=docs"), "changelog/9-4-0.mdx": () => import("../content/docs/changelog/9-4-0.mdx?collection=docs"), "changelog/all-releases.mdx": () => import("../content/docs/changelog/all-releases.mdx?collection=docs"), "installation/index.mdx": () => import("../content/docs/installation/index.mdx?collection=docs"), }),
};
export default browserCollections;