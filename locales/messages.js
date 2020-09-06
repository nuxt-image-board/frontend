// import helpArticlesEn from '@/locales/help/articles/en.json'
// import helpCategoriesEn from '@/locales/help/categories/en.json'
import textEn from '@/locales/text/en.json'
import helpArticlesJa from '@/locales/help/articles/ja.json'
import helpCategoriesJa from '@/locales/help/categories/ja.json'
import textJa from '@/locales/text/ja.json'

export default {
  en: {
    // ...helpArticlesEn,
    // ...helpCategoriesEn,
    ...textEn
  },
  ja: {
    ...helpArticlesJa,
    ...helpCategoriesJa,
    ...textJa
  }
}
