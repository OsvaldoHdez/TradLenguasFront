import i18next from 'i18next'
import { esp } from './es'
import { eng } from './en'

i18next.init({
    interpolation: {
        escapeValue: false,
    },
    lng: window.location.pathname.substr(1,2) === 'en' ? 'en' : 'es', 
    resources: {
        es: {
            translation: esp,
        },
        en: {
            translation: eng,
        },
    },
})

export default i18next