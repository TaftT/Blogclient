//var url="http://localhost:3000";
var url="https://collectorsblog.herokuapp.com";

var app = new Vue ( {
  el:"#app", // id in an HTML element

//this is a change
  data:{
    variable: "",
    greeting: "Hello vuedify",
    page: "blog",
    drawer: false,
    thePost: "",
    posts:[],
    selectedCategory: "all",
    newPost:{
      title: "",
      author: "",
      category: "all",
      date: new Date(),
      image: "",
      text: ""
    },
    categories:[
      "all",
      "clothing",
      "cards",
      "books",
      "coins",
      "comic books",
      "movies",
      "misc."
    ],


  },

  created: function () {
    this.getPosts();
    window.addEventListener("keydown", this.keyEvents);

  },

  methods: {
    getPosts:  function(){
        fetch(`${url}/posts`).then(function (response) {
          console.log(response.status)
          response.json().then(function (data) {
            app.posts=data.posts
          });
        });
      },


    submitPost: function (event){
      this.newPost.date= new Date();
      this.posts.unshift(this.newPost);
      this.page = "blog";
      fetch(`${url}/posts`, {
      method:"POST",
      headers:{
        "Content-type": "application/json"
      },
      body: JSON.stringify(app.newPost)
    }).then(function (response) {
      app.getPosts();
      app.newPost={
        title: "",
        author: "",
        category: "all",
        date: "",
        image: "",
        text: ""
      }

    });


      },
    },


  computed:{
    selectedPost: function() {
      var selection = this.posts.filter(function(post) {
          return post.title == app.thePost;
      });
      return selection;


    },
    sortedPosts: function() {
            if (this.selectedCategory == "all") {
                return this.posts;
            } else {
                var sorted_posts = this.posts.filter(function(post) {
                    return post.category == app.selectedCategory;
                });
                return sorted_posts;
            }
        }
  }

})
