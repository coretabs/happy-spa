export default {
    'computed': {
        textAlgin: function () {
            return (this.$i18n.locale == 'ar') ? 'txtR' : 'txtL';
        },
        has_icons: function () {
            return (this.$i18n.locale == 'ar') ? 'has-icons-right' : 'has-icons-left';
        },
        is_way: function () {
            return (this.$i18n.locale == 'ar') ? 'is-right' : 'is-left';
        },
    }
}