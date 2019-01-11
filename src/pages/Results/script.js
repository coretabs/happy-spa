import Cookies from "js-cookie";
import axios from 'axios';
export default {
    data: () => {
        return {
            search: "",
            resultStatus: true,
            results: [
                {name: "Ahmed", show: false},
                {name: "Ahmed Alakbari", show: false},
                {name: "Ahmed Omar", show: false},
                {name: "Omar", show: false},
                {name: "Emad", show: false},
                {name: "khalid", show: false},
            ],
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
            if (this.search.replace(/\s/gi, "") == "") {
            } else {/*
                this.results.includes(this.search) ? '' : this.results.push(this.search);
                this.results.length > 3 ? this.results.shift() : '';
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.results));
                this.searchStatus = false;
                this.$router.push({path: "/results", query: { result: this.search }});
                this.search = "";
            */}
            console.log(this.$route.query.result);
            
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
              $("html").classList.add("overflowHidden");
            } else {
              $(".grayContentPage").classList.remove("blur");
              $("html").classList.remove("overflowHidden");
            }
        },
        selectedResearch: function() {
            console.log("hmm");
            console.log(this.results);
            
        }
    },
    computed: {
        filteredSearchs: function() {
            if (this.search.replace(/\s/gi, "") != this.results) {
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
        
        this.results.forEach(result => {
            //result.name.includes(this.$route.query.result) ? '' : this.results.shift(result);
            if (this.$route.query.result == result.name) {
                result.show = true;
            } else {
                result.show = false;
            }
        });
    },
    /*mounted() {
        var self = this;
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            self.results =res.data;
            console.log('Data ', res.data);
        })
        .catch(err => {
            console.log('Error ',err.response);
        })
    }, */
}