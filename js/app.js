var Index = { template: '<url>pages/index.html</url>' }
var Foo = { template: '<url>pages/foo.html</url>' }
var Bar = { template: '<url>pages/bar.html</url>' }
var About = { template: '<url>pages/about.html</url>' }

var router = new VueRouter({
    routes: [
        { path: '/', component: Index },
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar },
        { path: '/about', component: About }
    ]
});

router.beforeEach((to, from, next) => {
    var comp = to.matched[0].components.default;
    if(comp.template.startsWith('<url>') && comp.template.endsWith('</url>')) {
        var url = comp.template.replace(/<\/?[^>]+(>|$)/g, "");
        call(url, function(str) {
            comp.template = str;
            next();            
        });
    }
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