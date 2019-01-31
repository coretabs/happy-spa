export default {
    computed: {
        dirRTL: function() {
          return this.$i18n.locale == "ar" ? "directionRTL" : "directionLTR";
        },
        has_icons_R: function() {
          return this.$i18n.locale == "ar" ? "has-icons-right" : "has-icons-left";
        },
        is_way_R: function() {
          return this.$i18n.locale == "ar" ? "right" : "left";
        },
    }
}