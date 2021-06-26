import Vue from 'vue';
import VueI18n from 'vue-i18n'//引入国际化
Vue.use(VueI18n)
const locale='CN'

// 加载所有语言环境并记住上下文
function loadMessages() {
    const context = require.context("./lang", true, /[a-z0-9-_]+\.json$/i);
    const messages = {}
    context
        .keys()
        .map((key) => {
            const locale = key.replace(/.\/([\w-_]+)\/(\w+).json$/i, '$1');
            const module = key.replace(/.\/([\w-_]+)\/(\w+).json$/i, '$2');
            const value = context(key);
            if (!messages[locale]) {
                messages[locale] = {};
            }
            messages[locale][module] = value
        }
        )
    return { context, messages };
}
const { context, messages } = loadMessages();

// 热更新
if (module.hot) {
    module.hot.accept(context.id, () => {
        const { messages: newMessages } = loadMessages();

        Object.keys(newMessages)
            .filter((locale) => messages[locale] !== newMessages[locale])
            .forEach((locale) => {
                messages[locale] = newMessages[locale];
                i18n.setLocaleMessage(locale, messages[locale]);
            });
    });
}
export const i18n = new VueI18n({
    locale,
    messages,
    silentTranslationWarn: true
});
export const changeLocale = (locale) => {
    i18n.locale = locale;
}
// VueI18n 实例