import Cookies from "js-cookie";

export default {
    data: () => {
        return {
            search: "",
            searchStatus: true,
            results: [
                {name: "اسم المستخدم"},
                {name: "صورة 1"},
                {name: "صورة 2"},
                {name: "كلمة"}
            ],
            respondentPost: true,
            respondentPerson: true,
        }
    },
    methods: {
        cleanSearch: function() {
            this.search = "";
        },
        moreResults: function() {
            
        },
        deleteResult: function(result) {
            var index = this.results.indexOf(result);
            this.results.splice(index, 1)
        },
        postAndPerson: function() {
            this.respondentPost = true
            this.respondentPerson = true
        },
        post: function() {
            this.respondentPost = true
            this.respondentPerson = false
        },
        person: function() {
            this.respondentPerson = true
            this.respondentPost = false
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