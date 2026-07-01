import type { NextConfig } from 'next';
import { createMDX } from 'fumadocs-mdx/next';

const nextConfig: NextConfig = {
    pageExtensions: ['tsx', 'mdx', 'md'],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
