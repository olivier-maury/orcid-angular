import { EnvironmentBannerModule } from 'src/app/environment-banner/environment-banner.module'

export const environment = {
  production: true,
  API_NEWS: 'https://localhost/blog/feed',
  API_WEB: '//localhost/',
  BASE_URL: '//localhost/',
  BLOG_NEWS: 'https://localhost/about/news',
  LANGUAGE_MENU_OPTIONS: {
    ar: 'العربية',
    cs: 'Čeština',
    en: 'English',
    es: 'Español',
    fr: 'Français',
    it: 'Italiano',
    ja: '日本語',
    ko: '한국어',
    pt: 'Português',
    ru: 'Русский',
    zh_CN: '简体中文',
    zh_TW: '繁體中文',
    xx: '** xx',
    source: '** source',
    lr: '** lr',
    rl: '** rl',
    uk: '** Ukrainian',
    ca: '** Catalan',
  },
  MODULES: [EnvironmentBannerModule],
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
