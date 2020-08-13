import { EnvironmentBannerModule } from 'src/app/environment-banner/environment-banner.module'

export const environment = {
  production: true,
  sessionDebugger: true,
  API_NEWS: 'https://www.mocky.io/v2/5dced45b3000007300931ce8',
  API_NEWS_DEPRECATED: 'https://www.mocky.io/v2/5dced45b3000007300931ce8',
  API_PUB: '//pub.localhost/v3.0',
  API_WEB: '//localhost/',
  BASE_URL: '//localhost/',
  BLOG_NEWS: 'https://localhost/about/news',
  GOOGLE_ANALYTICS_TESTING_MODE: true,
  GOOGLE_ANALYTICS: 'UA-0000000-00',
  GOOGLE_RECAPTCHA: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  HOTJAR_ANALYTICS: 'hjid:0000000',
  ZENDESK: null,
  SHOW_TEST_WARNING_BANNER: true,
  INSTITUTIONAL_AUTOCOMPLETE_DISPLAY_AMOUNT: 20,
  VERBOSE_SNACKBAR_ERRORS_REPORTS: true,
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
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    xx: '** xx',
    src: '** source',
    lr: '** lr',
    rl: '** rl',
    uk: '** Ukrainian',
    ca: '** Catalan',
  },
}
