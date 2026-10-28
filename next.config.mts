import createMDX from "@next/mdx";

const nextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx"],
    typescript: {
        ignoreBuildErrors: true,
    },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
