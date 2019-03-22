

////////// APP CONFIGURATION //////////

var app = new Framework7({
  pushState    : true,
  swipeBackPage:false,
  swipePanel   :false,
  material     : true,
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
    $('#logout').hide();

    //app.loginScreen();
    //mainView.router.load(options)
  }else{
     $('#login').hide();
     $('#username_menu').html(localStorage.user_mail);
  } 

  $('#btn_login').on('click',function (e) {
       
       if( $('#username').val() == "" ||  $('#password').val() == "" ){
          alert_dialog('No dejes campos vacíos','Error en inicio de sesión','ok',function(){});  
       }else{
          login($('#username').val(),$('#password').val());
       }
        
  })

  $("#logout").on('click',function (e) {
       alert_dialog_confirm('Puedes volver cuando quieras',
        '¿Deseas cerrar tu sesión?',
        ['Continuar','Cancelar'],
        function(buttonIndex){
          if(buttonIndex == 1){
            localStorage.removeItem("user_mail");
            localStorage.removeItem("user_password");
            //app.loginScreen();
            $('#logout').hide(); 
            $('#login').show();
            $('#username_menu').html("Iniciar Sesión");
          }
         
        });     
  })

   $('#open_register').on('click',function (e) {
       
      app.popup.open('.popup-register', true);
  })
    

    $('#login').on('click',function (e) {
       
      app.loginScreen();
  })
  
});

////////// CUSTOM JS ON OTHER PAGES //////////

function onBackKeyDown() {
  var cpage     = mainView.activePage;
  var cpagename = cpage.name;
  console.log(cpagename);
  if (cpagename == "register"){
    //mainView.router.back();
    //mainView.router.loadPage({url:'index.html', ignoreCache:true, reload:true });
  }
}



app.onPageInit('index', function (page) {
  

}).trigger();



app.onPageInit('noticias', function (page) {


  
  if(localStorage.user_mail == undefined){
    //app.loginScreen();
  } 
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

function login(username,password) {
SpinnerPlugin.activityStart("Cargando...");
  $$.ajax({
          url     : 'http://app.apiqroo.com.mx/user/login',
          method  : 'POST',
          dataType: 'json',
          data:{'username':username,'password':password},
          success: function(response){
                 
                 if(response.success == true){
                  localStorage.user_mail     = $('#username').val();
                  localStorage.user_password = $('#password').val(); 
                  $('#username_menu').html(localStorage.user_mail);
                  alert_dialog(response.message,'Bienvenido','ok', app.closeModal());
                  $('#logout').show(); 
                  $('#login').hide();
                  $('#username_menu').html(localStorage.user_mail);


                 }else{
                  alert_dialog(response.message,'Error en inicio de sesión','ok', function(){});
                 }
                 SpinnerPlugin.activityStop();
          },
          error: function(xhr, status){
            alert('Error: '+JSON.stringify(xhr));
            alert('ErrorStatus: '+JSON.stringify(status));
          }
    });
        
}


function initMap(){

}



app.onPageInit('naviera-list', function (page) {

    // Do something here for "about" page
  let ruta = page.query.ruta;
 
   loadListNavieras(ruta);

});

function loadListNavieras(ruta){

  $$.ajax({
          url: 'http://app.apiqroo.com.mx/apis/navieras',
          method: 'POST',
          dataType: 'json',
          data:{'user_email':localStorage.user_mail,'user_password':localStorage.user_password,'ruta':ruta},
          success: function(response){
                console.log(response);
                var html="";
                var count = Object.keys(response).length;
                 console.log(count);
                 
                 SpinnerPlugin.activityStart("Cargando...");
                 for (var j = 0; j < count; j++) {
                       
                       html+= "<li>";
                       html+= "   <a href=\"horarios-list.html?ruta_nav="+response[j].RUNA_RUTA_NAVIERA+"\" class=\"item-link item-content\">";
                       html+= "     <div class=\"item-media\"><img src=\"http://app.apiqroo.com.mx/navieras/"+response[j].NAV_LOGO+"\" width=\"44\" alt=\"\"></div>";
                       html+= "       <div class=\"item-inner\">";
                       html+= "          <div class=\"item-title-row\">";
                       html+= "           <div class=\"item-title\">"+ response[j].NAV_NOMBRE +"</div>";
                       html+= "         </div>";
                       html +=  "<div class=\"item-subtitle\" ></div>";
                       html+= "     </div>";
                       html+= "   </a>";
                       html+= " </li>"

                      
                        
                  }
                
                  $('#lista_navieras').html(html);
                 SpinnerPlugin.activityStop();
          },
          error: function(xhr, status){
            alert('Error: '+JSON.stringify(xhr));
            alert('ErrorStatus: '+JSON.stringify(status));
          }
    });

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
