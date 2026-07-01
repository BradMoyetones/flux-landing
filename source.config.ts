import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { transformers } from "@/lib/highlight-code"
import rehypePrettyCode from "rehype-pretty-code"

export const { docs, meta } = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      plugins.shift()
      plugins.push([
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light-default",
          },
          transformers,
        },
      ])

      return plugins
    },
  },
});
