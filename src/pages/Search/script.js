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
                this.results.includes(this.search.toLowerCase()) ? '' : this.results.push(this.search.toLowerCase());
                this.results.length > 11 ? this.results.shift() : ''; // wt ? sry its working now lol :D
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.results));
                this.search = ""; // looool
            }
        },
    },
    computed: {
        filteredSearchs: function() {
            return this.results.filter((result) => {
                return result.match(this.search); 
            });
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