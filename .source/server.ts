// @ts-nocheck
import { default as __fd_glob_8 } from "../content/docs/(root)/meta.json?collection=meta"
import { default as __fd_glob_7 } from "../content/docs/installation/meta.json?collection=meta"
import { default as __fd_glob_6 } from "../content/docs/changelog/meta.json?collection=meta"
import { default as __fd_glob_5 } from "../content/docs/meta.json?collection=meta"
import * as __fd_glob_4 from "../content/docs/installation/index.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/changelog/all-releases.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/changelog/9-4-0.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/(root)/index.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/getting-started.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.doc("docs", "content/docs", {"getting-started.mdx": __fd_glob_0, "(root)/index.mdx": __fd_glob_1, "changelog/9-4-0.mdx": __fd_glob_2, "changelog/all-releases.mdx": __fd_glob_3, "installation/index.mdx": __fd_glob_4, });

export const meta = await create.meta("meta", "content/docs", {"meta.json": __fd_glob_5, "changelog/meta.json": __fd_glob_6, "installation/meta.json": __fd_glob_7, "(root)/meta.json": __fd_glob_8, });