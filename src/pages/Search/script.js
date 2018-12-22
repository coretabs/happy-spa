import Cookies from "js-cookie";
export default {
    data: () => {
        return {
            search: "",
            searchStatus: false,
            results: [
                {name: "اسم المستخدم"},
                {name: "صورة 1"},
                {name: "صورة 2"},
                {name: "كلمة"}
            ]
        }
    },
    methods: {
        cleanSearch: function() {
            this.search = "";
        },
        deleteResults: function() {
            
        },
        deleteResult: function(result) {
            var index = this.results.indexOf(result);
            this.results.splice(index, 1)
        }
    },
    computed: {
        filteredSearchs: function() {
            return this.results.filter((result) => {
                return result.name.match(this.search);
            });
        }
    }
}