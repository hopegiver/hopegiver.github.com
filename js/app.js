var Index = { template: '<!---->', templateUrl: 'pages/index.html' }
var About = { template: '<!---->', templateUrl: 'pages/about.html' }

var router = new VueRouter({
    routes: [
        { path: '/', component: Index },
        { path: '/about', component: About }
    ]
});

router.beforeEach((to, from, next) => {
    var comp = to.matched[0].components.default;
    if(comp.template == '<!---->' && comp.templateUrl != undefined) {
        call(comp.templateUrl, function(str) {
            comp.template = str;
        });
       //comp.template = '<h1>hahah</h1>';
    }
    next();
});

var app = new Vue({
  router
}).$mount('#app');

function call(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}