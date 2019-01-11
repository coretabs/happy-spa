import Cookies from "js-cookie";
const STORAGE_KEY = 'result-storage';
export default {
    data: () => {
        return {
            search: "",
            searchStatus: false,
            results: [],
            ifFilteredSearchs: this.filteredSearchs
        }
    },
    methods: {
        cleanSearch: function() {
            this.search = "";
        },
        deleteResults: function() {
            this.results = [];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.results));
        },
        deleteResult: function(result) {
            var index = this.results.indexOf(result);
            this.results.splice(index, 1);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.results));
        },
        showResult: function() {
            this.searchStatus = true
        },
        addResults: function() {
            if (this.search.replace(/\s/gi, "") == "") {
            } else { 
                this.results.includes(this.search) ? '' : this.results.push(this.search);
                this.results.length > 11 ? this.results.shift() : '';
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.results));
                this.searchStatus = false;
                this.$router.push({path: "/results", query: { result: this.search }});
                this.search = "";
            }
        },
        clickResult: function(result) {
            this.search = result;
            this.addResults();

        }
    },
    computed: {
        filteredSearchs: function() {
            if (this.search.replace(/\s/gi, "") != this.results) {
                return this.results.filter((result) => {
                    return result.match(this.search); 
                });
            }
        },
        afterFiltered: function() {
            if (this.filteredSearchs != "") {
                return this.filteredSearchs
            } else {
                return this.results
            }
        }
    },
    created() {
        this.results = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    },
}