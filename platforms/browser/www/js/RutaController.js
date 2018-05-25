

app.onPageInit('categories', function (page) {
   let tipo = page.query.tipo;

   loadListRutas(tipo); 
    
});




/*********************************
*      Funcionalidades           *
*                                *
**********************************/




function loadListRutas(tipo){

  $$.ajax({
          url: 'http://app.apiqroo.com.mx/apis/routes',
          method: 'POST',
          dataType: 'json',
          data:{'user_email':localStorage.user_mail,'user_password':localStorage.user_password,'tipo':tipo},
          success: function(response){
                console.log(response);
                var html="";
                var count = Object.keys(response).length;
                 console.log(count);
                 
                 SpinnerPlugin.activityStart("Cargando...");
                 for (var j = 0; j < count; j++) {
                       
                       html+= "<li>";
                       html+= "   <a href=\"naviera-list.html?ruta="+response[j].RUTAS_RUTA+"\" class=\"item-link item-content\">";
                       html+= "     <div class=\"item-media\"><img src=\"img/categories/ship.png\" width=\"44\" alt=\"\"></div>";
                       html+= "       <div class=\"item-inner\">";
                       html+= "          <div class=\"item-title-row\">";
                       html+= "           <div class=\"item-title\">"+ response[j].RUTAS_NOMBRE +"</div>";
                       html+= "         </div>";
                       html +=  "<div class=\"item-subtitle\" >Ver más</div>";
                       html+= "     </div>";
                       html+= "   </a>";
                       html+= " </li>"
                      
                        
                  }
                 
                  $('#rutas_list').html(html);
                 SpinnerPlugin.activityStop();
          },
          error: function(xhr, status){
            alert('Error: '+JSON.stringify(xhr));
            alert('ErrorStatus: '+JSON.stringify(status));
          }
    });

}





