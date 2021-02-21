const BASE_URL = process.env.NODE_ENV === 'development' ? '/' : '/pro-docs/';

module.exports = {
  title: 'pro! documentation',
  tagline: 'documentation for pro!',
  url: 'https://github.com/tetcoin/pro',
  baseUrl: BASE_URL,
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'paritytech',
  onBrokenLinks: 'warn',
  projectName: 'pro-docs',
  stylesheets: [
    'fonts/fonts.css'
  ],
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/duotoneDark'),
      additionalLanguages: ['rust', 'json']
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false
    },
    navbar: {
      title: '',
      logo: {
        alt: 'pro!',
        src: 'img/logo-black.svg',
        srcDark: '/img/logo-white.svg',
      },
      items: [
        {
          href: 'https://github.com/tetcoin/pro',
          label: 'pro! GitHub',
          position: 'right',
        },
        {
          href: 'https://github.com/tetcoin/pro-docs',
          label: 'Docs GitHub',
          position: 'right',
        },
      ],
    },
  },
  presets: [
    ['@docusaurus/preset-classic', {
      docs: {
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/pro-docs/edit/master/',
        routeBasePath: '/'
      },
      blog: {
        showReadingTime: true,
        editUrl: 'https://github.com/pro-docs/edit/master/',
      },
      theme: {
        customCss: [require.resolve('./src/css/custom.css')],
      },
    }],
  ],
  plugins: [require.resolve('docusaurus-lunr-search')],
};
