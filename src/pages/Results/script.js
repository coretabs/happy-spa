import Cookies from "js-cookie";
import axios from 'axios';
export default {
    data: () => {
        return {
            search: "",
            resultStatus: true,
            results: [],
            respondentPost: false,
            respondentPerson: false,
            allPost: true,
            allPerson: true,
            menu: false,
            resultid: "",
        }
    },
    methods: {
        cleanSearch: function() {
            this.search = "";
        },
        moreResults: function() {
            
        },
        addResults: function() {
            console.log(this.$route.query.result);
            console.log(this.$api.results.posts())
            
        },
        deleteResult: function(result) {
            var index = this.results.indexOf(result);
            this.results.splice(index, 1)
        },
        postAndPerson: function() {
            this.allPost = true
            this.allPerson = true
            this.respondentPost = false
            this.respondentPerson = false
        },
        closeAllPost: function() {
            this.allPost = false
            this.person()
        },
        closeAllPerson: function() {
            this.allPerson = false
            this.post()
        },
        post: function() {
            this.respondentPost = true
            this.respondentPerson = false
            this.allPost = false
            this.allPerson = false
        },
        person: function() {
            this.respondentPerson = true
            this.respondentPost = false
            this.allPost = false
            this.allPerson = false
        },
        showMenu(resultid) {
            this.menu = !this.menu;
            this.resultid = resultid ? resultid : "";

            if (this.menu) {
              $(".grayContentPage").classList.add("blur");
              this.$scroll.deny();
            } else {
              $(".grayContentPage").classList.remove("blur");
              this.$scroll.allow();
            }
        },
        selectedResearch: function() {
            console.log(this.results);
        }
    },
    computed: {
        filteredSearchs: function() {
            if (this.search != this.results) {
                var app = this;
                return this.results.filter((result) => {
                    return result.name.match(app.search); 
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
        this.search = this.$route.query.result;
    }
}