app.onPageInit('naviera-list', function (page) {
    // Do something here for "about" page
  let ruta = page.query.ruta;
  
   loadListNavieras(ruta);

});





/*********************************
*      Funcionalidades           *
*                                *
**********************************/




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
                 
                  $('#nav_list').html(html);
                 SpinnerPlugin.activityStop();
          },
          error: function(xhr, status){
            alert('Error: '+JSON.stringify(xhr));
            alert('ErrorStatus: '+JSON.stringify(status));
          }
    });

}





