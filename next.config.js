/** @type {import('next').NextConfig} */

const path = require("path");

const packageJSON = require("./package.json");

const avtoproPackages = Object.keys(packageJSON.dependencies).filter((name) =>
    name.includes("@avtopro/")
);

const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["@avtopro/*"],
    swcMinify: true,
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,

            ...avtoproPackages.reduce((aliases, pkgName) => {
                aliases[`${pkgName}$`] = path.resolve(require.resolve(pkgName));

                return aliases;
            }, {}),
        };
        return config;
    },
};

module.exports = nextConfig;
