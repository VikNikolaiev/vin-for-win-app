/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const withLess = require('next-with-less');
const path = require('path');
const { i18n } = require('./next-i18next.config');
const packageJSON = require('./package.json');

const avtoproPackages = Object.keys(packageJSON.dependencies).filter((name) =>
    name.includes('@avtopro/')
);

const plugins = [
    [
        withLess,

        {
            lessLoaderOptions: {
                lessOptions: {
                    math: 'always'
                }
            }
        }
    ]
];

module.exports = withPlugins(plugins, {
    reactStrictMode: false,

    i18n,

    transpilePackages: [
        '@avtopro/files-uploader',

        '@avtopro/file-type',

        '@avtopro/icons',

        '@avtopro/button',

        '@avtopro/file-type',

        '@avtopro/overlay',

        '@avtopro/preloader',

        '@avtopro/placeholder',

        '@avtopro/placeholder-robot',

        '@avtopro/modal',

        '@avtopro/panel',

        '@avtopro/tooltip'
    ],

    swcMinify: true,

    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias, // Чтобы получить абсолютные пути к скомпилированным UMD-версиям компонентов @avtopro // пропускаем их через require.resolve — используется поле "main" из package.json пакета. // Если этого не сделать, то ES6-импорты пакетов будут ориентироваться на поле "module", // которое в пакетах @avtopro указывает на исходный код компонентов, // который в свою очередь содержит импорты Less-файлов со стилями, что приведёт к ошибке // "CSS Imported by a Dependency": https://nextjs.org/docs/messages/css-npm

            ...avtoproPackages.reduce((aliases, pkgName) => {
                aliases[`${pkgName}$`] = path.resolve(require.resolve(pkgName));

                return aliases;
            }, {})
        };

        return config;
    }
});
