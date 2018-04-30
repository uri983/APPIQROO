

app.onPageInit('puertos_list', function (page) {
   
   loadListPuerto(); 
    
});




/*********************************
*      Funcionalidades           *
*                                *
**********************************/




function loadListPuerto(){

  $$.ajax({
          url: 'http://app.apiqroo.com.mx/apis/listPuertos',
          method: 'POST',
          dataType: 'json',
          data:{'user_email':'email@example.com','user_password':'123456'},
          success: function(response){
                console.log(response);
                var html="";
                var count = Object.keys(response).length;
                 console.log(count);
                 
                 SpinnerPlugin.activityStart("Cargando...");
                 for (var j = 0; j < count; j++) {
                       
                       html+= "<li>";
                       html+= "   <a href=\"puerto_detail.html?puerto="+response[j].PUER_PUERTO+"\" class=\"item-link item-content\">";
                       html+= "     <div class=\"item-media\"><img src=\"img/apiqroo.png\" width=\"44\" alt=\"\"></div>";
                       html+= "       <div class=\"item-inner\">";
                       html+= "          <div class=\"item-title-row\">";
                       html+= "           <div class=\"item-title\">"+ response[j].PUER_SNAME +"</div>";
                       html+= "         </div>";
                       if(response[j].PUERH_STATUS = null){
                       html +=  "<div class=\"item-subtitle\" style=\"color: #04a20a;\">Abierto</div>";
                       }else if(response[j].PUERH_STATUS = 1){
                       html +=  "<div class=\"item-subtitle\" style=\"color: #04a20a;\">Abierto</div>";
                       }else{
                       html +=  "<div class=\"item-subtitle\" style=\"color: #f44336;\">Cerrado</div>";
                       }
                       html+= "     </div>";
                       html+= "   </a>";
                       html+= " </li>"
                      
                        
                  }
                 
                  $('#puerto_list').html(html);
                 SpinnerPlugin.activityStop();
          },
          error: function(xhr, status){
            alert('Error: '+JSON.stringify(xhr));
            alert('ErrorStatus: '+JSON.stringify(status));
          }
    });

}





