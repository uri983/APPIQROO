"use strict";

////////// APP CONFIGURATION //////////

var app = new Framework7({
  pushState: true,
  swipePanel: 'left',
  material: true
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

  listNews();

})

$$(document).on('deviceready', function() {
  
});

////////// CUSTOM JS ON OTHER PAGES //////////

$$(document).on('page:index', function (e) {

  

});

app.onPageInit('cruceros', function (page) {
    // Do something here for "about" page
    loadArribos();
});


app.onPageInit('post', function (page) {
    // Do something here for "about" page
    getNewsDetail(page.query.news_id);

    
    $('#float_facebook').on('click',function(){

      window.plugins.socialsharing.shareViaFacebook(localStorage.title,  localStorage.img, localStorage.url, function() {console.log('share ok')}, function(errormsg){alert(errormsg)})
      
    });

    $('#float_twitter').on('click',function(){

      window.plugins.socialsharing.shareViaTwitter(localStorage.title, localStorage.img, localStorage.url);

    });

    
})



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


  ////////// INFINITE SCROLL //////////

  var loading = false;

  // When infiniteScroll is called
  $$('.infinite-scroll').on('infinite', function () {

    // Exit, if infinite scroll is in progress
    if (loading) return;

    // Set loading true
    loading = true;

    // Simulation of an Ajax request for demo
    setTimeout(function(){
      $$('.infinite-scroll ul').append(
        '<li>'+
          '<a href="post.html">'+
            '<div class="post">'+
              '<div class="post-image">'+
                '<img alt="" src="img/thumbnails/10.jpg">'+
              '</div>'+
              '<div class="post-details">'+
                '<div class="post-category">Music</div>'+
                '<h2 class="post-title-content">Top 5 Summer Hits Of November</h2>'+
                '<div class="post-publication">3 weeks ago</div>'+
              '</div>'+
            '</div>'+
          '</a>'+
        '</li>'+
        '<li>'+
          '<a href="post.html">'+
            '<div class="post">'+
              '<div class="post-image">'+
                '<img alt="" src="img/thumbnails/11.jpg">'+
              '</div>'+
              '<div class="post-details">'+
                '<div class="post-category">Lifestyle</div>'+
                '<h2 class="post-title-content">The Best Things To During Summer Holidays</h2>'+
                '<div class="post-publication">1 month ago</div>'+
              '</div>'+
            '</div>'+
          '</a>'+
        '</li>'
      );
      app.detachInfiniteScroll($$('.infinite-scroll')); // For demo, we add just 2 posts and detach the infinite-scroll to prevent unnecessary loadings
      $$('.infinite-scroll-preloader').remove(); // For demo, we add just 2 posts and remove the loader
      loading = false;
    }, 2000);
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

function loadArribos(){

  $$.ajax({
                url: 'http://servicios.apiqroo.com.mx/calendario-cruceros/app_service.php',
                method: 'POST',
                dataType: 'json',
                success: function(response){
                
                 $('#contenido').html(response);
                  
                },
                error: function(xhr, status){
                  alert('Error: '+JSON.stringify(xhr));
                  alert('ErrorStatus: '+JSON.stringify(status));
                }
    });

}



function getNewsDetail(news_id){
  SpinnerPlugin.activityStart("Cargando...");
    $$.ajax({
                url: 'http://servicios.apiqroo.com.mx/appiqroo_service/home/getNewsbyId/',
                method: 'POST',
                dataType: 'json',
                data:{'new_id':news_id},
                success: function(response){
                 
                  var res = response.data[0].post_content.replace(/\[.*?\]\s?/g, '')
                  $('.post-date').html(response.data[0].post_date);
                  $('#post-content').html(jQuery(res).text());
                  $('#post-title').html(response.data[0].post_title);
                  $("#post-img").attr("src",response.data[0].img);

                  localStorage.title = response.data[0].post_title;
                  localStorage.url   = response.data[0].guid;
                  localStorage.img   = response.data[0].img;
                  SpinnerPlugin.activityStop();
                  
                  
                },
                error: function(xhr, status){
                  alert('Error: '+JSON.stringify(xhr));
                  alert('ErrorStatus: '+JSON.stringify(status));
                }
    });


    

}


function listNews(){

    $$.ajax({
                url: 'http://servicios.apiqroo.com.mx/appiqroo_service/home/getNews/',
                method: 'POST',
                dataType: 'json',
                success: function(response){
                  //console.log(response);
                  var html = " <li>";
                  html+= "<a href=\"post.html?news_id="+response.data[0].ID+"\">";
                  html+=  "<div class=\"post\">";
                  html+=    "<div class=\"post-image\">";
                  html+=      "<img alt=\"\" src=\""+response.data[0].img+"\">";
                  html+=   "</div>";
                  html+=    "<div class=\"post-details\">";
                  html+=      "<div class=\"post-category\">Noticias</div><div class=\"post-publication\">"+response.data[0].post_date+"</div>";
                  html+=      "<div class=\"post-title\">";
                  html+=        "<h2 class=\"post-title-content\">"+response.data[0].post_title+"</h2>";
                  html+=      "</div>";
                  html+=    "</div>";
                  html+=  "</div>";
                  html+="</a>";
                  html+="</li>";
                  var count = Object.keys(response.data).length;
                  //console.log(count);
                  for (var j = 1; j < count; j++) {
                      //console.log(response.data[j]);
                      html+=  "<li>";
                      html+=   "<a href=\"post.html?news_id="+response.data[j].ID+"\">";
                      html+=     "<div class=\"post\">";
                      html+=       "<div class=\"post-image\">";
                       html+=        "<img alt=\"\" src=\""+response.data[j].img+"\">";
                       html+=      "</div>";
                       html+=      "<div class=\"post-details\">";
                       html+=        "<div class=\"post-category\">Noticias</div>";
                       html+=        "<h2 class=\"post-title-content\">"+response.data[j].post_title+"</h2>";
                       html+=       "<div class=\"post-publication\">"+response.data[j].post_date+"</div>";
                        html+=     "</div>";
                        html+=   "</div>";
                        html+="</a>";
                       html+=  "</li>";
                  }

                 

                  $('#news').html(html);
                  
                },
                error: function(xhr, status){
                  alert('Error: '+JSON.stringify(xhr));
                  alert('ErrorStatus: '+JSON.stringify(status));
                }
              });
        }
