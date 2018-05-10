"use strict";

////////// APP CONFIGURATION //////////

var app = new Framework7({
  pushState: true,
  swipeBackPage:false,
  swipePanel:false,
  material: true,
  routes: [
    {
    path: '/',
    async(routeTo, routeFrom, resolve, reject) {
      alert('ruta');
    }
  },
  ],
});

var $$ = Dom7;


var mainView = app.addView('.view-main', {
  dynamicNavbar: true
})

/*********************************
*      Eventos de APP            *
*                                *
**********************************/
////////// CUSTOM JS ON HOME PAGE //////////

$$(document).on('DOMContentLoaded', function (e) {

  

})

$$(document).on('deviceready', function() {
  if(localStorage.user_mail == undefined){
    app.loginScreen();
  }else{
    
  } 

  $('#btn_login').on('click',function (e) {
       localStorage.user_mail     = $('#username').val();
       localStorage.user_password = $('#password').val();
       alert_dialog('Inicio de sesión correcto','Bienvenido','ok',function(){alert('hola')});
       app.alert('Iniciaste sesión como: '+ localStorage.user_mail, 'Bienvenido');
       app.closeModal();
        
  })

  $("#logout").on('click',function (e) {
       localStorage.removeItem("user_mail");
       localStorage.removeItem("user_password");
       app.loginScreen();
        
  })
    
  
});

////////// CUSTOM JS ON OTHER PAGES //////////

$$(document).on('page:index', function (e) {

  

});



app.onPageInit('index', function (page) {
    // Do something here for "about" page
    listNews(0);

  ////////// INFINITE SCROLL //////////

  var loading = true;

  // When infiniteScroll is called
  $$('.infinite-scroll').on('infinite', function () {
   
    
    // Exit, if infinite scroll is in progress
    if (!loading) return;

    // Set loading true
    loading = false;

    // Simulation of an Ajax request for demo
    setTimeout(function(){
       var lastItemIndex = $$('#news li').length;
      loading = true;
     
      listNews(lastItemIndex);
      //app.detachInfiniteScroll($$('.infinite-scroll')); // For demo, we add just 2 posts and detach the infinite-scroll to prevent unnecessary loadings
      //$$('.infinite-scroll-preloader').remove(); // For demo, we add just 2 posts and remove the loader
      //loading = false;
      var lastItemIndex = $$('#news li').length;
    }, 1000);
  });
}).trigger();


app.onPageInit('naviera_list', function (page) {
    // Do something here for "about" page
    
});








/* ALL OF THE CODE BELOW IS FOR THE DEMO FEATURES, YOU CAN DELETE IT */

$$(document).on('page:init', function (e) {

  ////////// PULL TO REFRESH //////////

  var pullToRefreshContent = $$('.pull-to-refresh-content');

  // When pullToRefresh is called
  pullToRefreshContent.on('ptr:refresh', function (e) {

    // Simulation of an Ajax request for demo
    setTimeout(function(){
      pullToRefreshContent.find('ul').prepend(
        '<li>'+
          '<a href="post.html">'+
            '<div class="post">'+
              '<div class="post-image">'+
                '<img alt="" src="img/thumbnails/11.jpg">'+
              '</div>'+
              '<div class="post-details">'+
                '<div class="post-category">Music</div>'+
                '<div class="post-title">'+
                  '<h2 class="post-title-content">The Best Latino Songs Of This Summer</h2>'+
                '</div>'+
                '<div class="post-publication">3 min ago</div>'+
              '</div>'+
            '</div>'+
          '</a>'+
        '</li>'
      );
      app.pullToRefreshDone(pullToRefreshContent);
    }, 1500);
  });


  

});


////////// NOTIFICATIONS //////////

$$('.notification-pulltorefresh').on('click', function () {
    app.addNotification({
        title: 'Pull-to-refresh feature',
        message: 'Drag the screen downward like Facebook app to load recent posts. (You must be on mobile)',
    });
});

$$('.notification-infinitescroll').on('click', function () {
    app.addNotification({
        title: 'Infinite-scroll feature',
        message: 'Scroll down at the end of the post list to trigger the infinite-scroll and load more posts.',
    });
});

$$('.notification-search').on('click', function () {
    app.addNotification({
        title: 'Search feature',
        message: 'Try to type something in the search field to dynamically search into the post list (eg. Music)',
    });
});

/*********************************
*      Funcionalidades           *
*                                *
**********************************/

function initMap() {
        
}










function listNews(start){

    $$.ajax({
                url: 'http://app.apiqroo.com.mx/apis/news',
                method: 'POST',
                dataType: 'json',
                data:{'start':start,'user_email':'email@example.com','user_password':'123456'},
                success: function(response){
                  //console.log(response[0].tag);
                  if( response[0].tag == null){
                          response[0].tag ="Noticias";
                      }
                  var pre_html =  $('#news').html();
                  var html = " <li>";
                  html+= "<a href=\"post.html?news_id="+response[0].ID+"\">";
                  html+=  "<div class=\"post\">";
                  html+=    "<div class=\"post-image\">";
                  html+=      "<img alt=\"\" src=\""+response[0].img+"\">";
                  html+=   "</div>";
                  html+=    "<div class=\"post-details\">";
                  html+=      "<div class=\"post-category\">"+response[0].tag+"</div><div class=\"post-publication\">"+response[0].post_date+"</div>";
                  html+=      "<div class=\"post-title\">";
                  html+=        "<h2 class=\"post-title-content\">"+response[0].post_title+"</h2>";
                  html+=      "</div>";
                  html+=    "</div>";
                  html+=  "</div>";
                  html+="</a>";
                  html+="</li>";


                  var count = Object.keys(response).length;
                  //console.log(count);
                  for (var j = 1; j < count; j++) {
                      //console.log(response.data[j]);
                      //
                      if( response[j].tag == null){
                          response[j].tag ="Noticias";
                      }
                      html+=  "<li>";
                      html+=   "<a href=\"post.html?news_id="+response[j].ID+"\">";
                      html+=     "<div class=\"post\">";
                      html+=       "<div class=\"post-image\">";
                      var img = response[j].img.replace("dev.apiqroo.com.mx/v2017-v3", "www.apiqroo.com.mx");
                      img = img.replace("dev.apiqroo.com.mx/v2017", "www.apiqroo.com.mx");
                      
                       html+=        "<img alt=\"\" src=\""+img+"\">";
                       html+=      "</div>";
                       html+=      "<div class=\"post-details\">";
                       html+=        "<div class=\"post-category\">"+response[j].tag+"</div>";
                       html+=        "<h2 class=\"post-title-content\">"+response[j].post_title+"</h2>";
                       html+=       "<div class=\"post-publication\">"+response[j].post_date+"</div>";
                        html+=     "</div>";
                        html+=   "</div>";
                        html+="</a>";
                       html+=  "</li>";
                  }

                 

                  $('#news').html(pre_html + html);
                  
                },
                error: function(xhr, status){
                  //alert('Error: '+JSON.stringify(xhr));
                  //alert('ErrorStatus: '+JSON.stringify(status));
                }
              });
        }
