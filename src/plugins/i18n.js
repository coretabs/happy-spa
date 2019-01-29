import Vue from 'vue'
import VueI18n from "vue-i18n";
import axios from "axios";

Vue.use(VueI18n);

const messages = {
    ar: {
        home: {
            applicationIdea_1: 'تمتع بإجراء محادثات مع اصدقائك على الكمبيوتر والهاتف',
            applicationIdea_2: 'متاح على العديد من الانظمة الاساسية',
            applicationIdea_3: 'شارك اللحظات الجميلة',
            applicationIdea_4: 'اجعل عائلتك واصدقائك اقرب مع',
            applicationIdea_5: 'شارك مشاعرك مع العديد من الملصقات الرائعة',
            begin: 'فلنبدأ',
            logIn_para: 'هل لديك حساب بالفعل؟',
            logIn_link: 'تسجيل الدخول'
        },
        signUp: {
            new_user: 'حساب جديد',
            email: 'بريدك الالكتروني',
            wrongEmail: 'البريد غير صحيح',
            password: 'كلمة المرور',
            invalidpassword: 'كلمة المرور غير صالحة',
            least_one_number: 'يجب ان تحوي رقم واحد على الأقل',
            least_one_letter: 'وحرف إنجليزي واحد على الأقل',
            less_elements: 'وان لا تقل عن 8 عناصر',
            samePassword: 'كلمة المرور غير مطابقة',
            next: 'التالي',
            note: 'عن طريق تسجيلك, انت توافق على ',
            termsOfService: 'شروط الإستخدام ',
            and: 'و ',
            privacyPolicy: 'سياسة الخصوصية',
            another: 'أو تسجيل عن طريق',
            facbook: 'فيس بوك',
            gmail: 'جيميل',
            logIn_para: 'هل لديك حساب؟',
            logIn_link: 'تسجيل الدخول'
        },
        logIn: {
            log_in: 'تسجيل الدخول',
            name_mail: 'اسم المستخدم أو البريد الإلكتروني',
            password: 'كلمة المرور',
            logIn_btn: 'تسجيل الدخول',
            forgotPassword: 'هل نسيت كلمة المرور؟',
            another: 'أو سجل دخولك عن طريق',
            facbook: 'فيس بوك',
            gmail: 'جيميل',
            signUp_para: 'ليس لديك حساب؟',
            signUp_link: 'تسجيل'
        },
        loadingPost: {
            drag_refresh: 'إسحب للتحديث',
            released_update: 'أطلق للتحديث',
            updating: 'جار التحديث...',
            more: 'جار الحصول على المزيد...',
            no_more: 'لا يوجد المزيد :('
        },
        confirm: {
            yes: 'نعم',
            no: 'لا'
        },
        error_msg: {
            close: 'اغلاق'
        },
        report: {
            choose_reason: 'اختر سبباً للإبلاغ عن هذا المنشور',
            spam: 'محتوى عشوائي',
            violence: 'محتوى عنيف',
            nude: 'عري / محتوى جنسي',
            send: 'ارسال'
        },
        newPost: {
            share: 'نشر',
            imgAndVedio: 'صورة / فيديو',
            gif: 'صور متحركة',
            camera: 'كاميرا',
            addFunPost: 'أضف شيئاً مضحكاً'
        },
        profile: {
            edit: 'تعديل',
            delete: 'حذف',
            report: 'تبليغ'
        },
        userHome: {
            edit: 'تعديل',
            delete: 'حذف',
            report: 'تبليغ'
        },
        post: {
            first_comment: 'كن أول من يعلق',
            edit: 'تعديل',
            delete: 'حذف',
            report: 'تبليغ',
            more: 'إقرأ المزيد',
            writePost: 'اكتب تعليق...'
        },
        postComments: {
            first_comment: 'كن أول من يعلق',
            edit: 'تعديل',
            delete: 'حذف',
            report: 'تبليغ',
            writePost: 'اكتب تعليق...'
        },
        replies: {
            first_respond: 'كن أول من يرد',
            edit: 'تعديل',
            delete: 'حذف',
            report: 'تبليغ',
            writePost: 'اكتب تعليق...'
        }, 
        verificationStep: {
            activate: 'تفعيل حسابك',
            activateEmail: 'تم إرسال رسالة التفعيل إلى بريدك الإلكتروني, يرجى تفقد الرسالة لتفعيل حسابك',
            receiveActivate: 'لم تصلك رسالة التفعيل؟',
            re_send: 'أعد إرسال الرسالة',
        },
        more: {
            setting: 'الإعدادت',
            connectUs: 'تواصل معنا',
            terms: 'بنود سياسة الخصوصية',
            about: 'حول البرنامج',
            signOut: 'تسجيل الخروج'
        },
        setting: {
            settings: 'الإعدادات',
            editProfile: 'تعديل الملف الشخصي',
            language: 'اللغة',
            changePassword: 'تغيير كلمة السر',
            manageEmail: 'إدارة البريد الإلكتروني',
            manageLinks: 'إدارة الروابط',
            accountSettings : 'إعدادات الحساب'
        },
        information: {
            editProfile: 'تعديل الملف الشخصي',
            firstName: 'الإسم الأول',
            lastName: 'الإسم الأخير',
            userName: 'اسم المستخدم',
            birthday: 'تاريخ الميلاد',
            city: 'المدينة',
            cv: 'اكتب سيرتك الذاتية...'
        },
        manageEmail: {
            manageE_mail: 'إدارة البريد الإلكتروني',
            basicEmail: 'البريد الإلكتروني الأساسي',
            backupEmail: 'البريد الإلكتروني الإحتياطي',
            enterEmail: 'أدخل بريدك الإلكتروني',
            save: 'حفظ'
        },
        social: {
            manage_links: 'إدارة الروابط',
            save: 'حفظ'
        },
        privacyPolicy: {
            privacy_policy: 'بنود سياسة الخصوصية'
        },
        termsOfService: {
            terms_of_service: 'شروط الخدمة'
        },
        forgotPassword: {
            forgotPassword: 'هل نسيت كلمة المرور؟',
            passwordRecovery: 'قم بإدخال بريدك الإلكتروني هنا لكي تصلك التعليمات الخاصة باستعادة كلمة المرور',
            enterEmail: 'البريد الإلكتروني',
            send: 'إرسال'
        }
    }, 
    en: {
        home: {
            applicationIdea_1: 'Have fun conversations with your friends on your computer and phone',
            applicationIdea_2: 'Available on many basic systems',
            applicationIdea_3: 'Share the beautiful moments',
            applicationIdea_4: 'Make your family and friends closer with',
            applicationIdea_5: 'Share your feelings with many great posters',
            begin: 'let\'s start',
            logIn_para: 'Already have an account?',
            logIn_link: 'log in'
        },
        signUp: {
            new_user: 'new account',
            email: 'Your E-mail',
            wrongEmail: 'Mail is incorrect',
            password: 'password',
            invalidpassword: 'Invalid password',
            least_one_number: 'Must contain at least one number',
            least_one_letter: 'And at least one English letter',
            less_elements: 'And not less than 8 elements',
            samePassword: 'Passwords do not match',
            next: 'next',
            note: 'By registering, you agree to ',
            termsOfService: 'Terms of use ',
            and: 'and ',
            privacyPolicy: 'Privacy policy',
            another: 'Or register by',
            facbook: 'facebook',
            gmail: 'gmail',
            logIn_para: 'have an account?',
            logIn_link: 'log in'
        },
        logIn: {
            log_in: 'log in',
            name_mail: 'Username or Email Address',
            password: 'password',
            logIn_btn: 'log in',
            forgotPassword: 'did you forget your password?',
            another: 'Or log in by',
            facbook: 'facebook',
            gmail: 'gmail',
            signUp_para: 'You do not have an account?',
            signUp_link: 'Sign Up'
        },
        loadingPost: {
            drag_refresh: 'Drag to refresh',
            released_update: 'Released for update',
            updating: 'Updating ...',
            more: 'More ...',
            no_more: 'There is no more :('
        },
        confirm: {
            yes: 'yes',
            no: 'no'
        },
        error_msg: {
            close: 'Close'
        },
        report: {
            choose_reason: 'Choose a reason to report this publication',
            spam: 'Spam',
            violence: 'Violence',
            nude: 'nude',
            send: 'send'
        },
        newPost: {
            share: 'send',
            imgAndVedio: 'Image / video',
            gif: 'gif',
            camera: 'Camera',
            addFunPost: 'Add something funny'
        },
        profile: {
            edit: 'edit',
            delete: 'delete',
            report: 'report'
        },
        userHome: {
            edit: 'edit',
            delete: 'delete',
            report: 'report'
        },
        post: {
            first_comment: 'Be the first to comment',
            edit: 'edit',
            delete: 'delete',
            report: 'report',
            more: 'read more',
            writePost: '...Write a comment'
        },
        postComments: {
            first_comment: 'Be the first to comment',
            edit: 'edit',
            delete: 'delete',
            report: 'report',
            writePost: '...Write a comment'
        },
        replies: {
            first_respond: 'Be the first to respond',
            edit: 'edit',
            delete: 'delete',
            report: 'report',
            writePost: '...Write a comment'
        },
        verificationStep: {
            activate: 'Activate your account',
            activateEmail: 'The activation email has been sent to your email address, please check the message to activate your account',
            receiveActivate: 'Did not receive the activation message?',
            re_send: 'Re-send the message',
        },
        more: {
            setting: 'setting',
            connectUs: 'connect us',
            terms: 'terms of privacy policy',
            about: 'about the program',
            signOut: 'sign out'
        },
        setting: {
            settings: 'settings',
            editProfile: 'edit profile',
            language: 'language',
            changePassword: 'change password',
            manageEmail: 'manage email',
            manageLinks: 'manage links',
            accountSettings : 'account settings'
        },
        information: {
            editProfile: 'edit profile',
            firstName: 'first name',
            lastName: 'last name',
            userName: 'user name',
            birthday: 'birthday',
            city: 'city',
            cv: '... Type your curriculum vitae'
        },
        manageEmail: {
            manageE_mail: 'manage email',
            basicEmail: 'basic email',
            backupEmail: 'backup email',
            enterEmail: 'enter your email address',
            save: 'save'
        },
        social: {
            manage_links: 'manage links',
            save: 'save'
        },
        privacyPolicy: {
            privacy_policy: 'privacy policy'
        },
        termsOfService: {
            terms_of_service: 'terms of service'
        },
        forgotPassword: {
            forgotPassword: 'did you forget your password?',
            passwordRecovery: 'Enter your email here to receive password recovery instructions',
            enterEmail: 'email',
            send: 'send'
        }
    }
}

export const i18n = new VueI18n({
    fallbackLocale: 'en',
    locale: 'en',
    messages
})

/*Object.defineProperty(Vue.prototype,
    '$locale', {
        get: function () {
            return app.i18n.locale
        },
        set: function (locale) {
            app.i18n.locale = locale
        }
    })

    new Vue(app)

this.$locale
this.$locale = 'ar'*/

//export const defaultLocale = ['ar']
/*
function setI18nLanguage(lang) {
    i18n.locale = lang
    axios.defaults.headers.common['Accept-Language'] = lang
    document.querySelector('html').setAttribute('lang', lang)
    return lang
}

export function loadLanguageAsync(lang) {
    if (i18n.locale !== lang) {
        if (!loadedLanguages.includes(lang)) {
            return import( webpackChunkName: "lang-[request]"  `@/lang/${lang}`).then(msgs => {
                i18n.setLocaleMessage(lang, msgs.default)
                loadedLanguages.push(lang)
                return setI18nLanguage(lang)
            })
        }
    }
    return Promise.resolve(lang)
}
*/