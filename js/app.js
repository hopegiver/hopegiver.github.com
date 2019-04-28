var Index = { template: '<!---->', templateUrl: 'pages/index.html' }
var Foo = { template: '<!---->', templateUrl: 'pages/foo.html' }
var Bar = { template: '<!---->', templateUrl: 'pages/bar.html' }
var About = { template: '<!---->', templateUrl: 'pages/about.html' }

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
  if(comp.template == '<!---->' && comp.templateUrl != undefined) {
    new Promise(function(resolve, reject) {
      ajax_get(comp.templateUrl, function(data) {
        resolve(data);
      });
    }).then(function(data) {
      console.log(data);
      comp.template = data;
      next();      
    });
  } else {
    next();
  }
});

var app = new Vue({
  router
}).$mount('#app');

function ajax_get(url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(this.responseText);
    }
  };
  url += (url.indexOf("?") > 0 ? "&_=" : "?_=") + new Date().getTime();
  xhttp.open("GET", url, true);
  xhttp.send();
}