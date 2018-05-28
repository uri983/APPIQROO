

app.onPageInit('horarios-list', function (page) {
   let ruta_naviera = page.query.ruta_nav;

   loadHorarios(ruta_naviera); 
    
});




/*********************************
*      Funcionalidades           *
*                                *
**********************************/




function loadHorarios(ruta_naviera){

  $$.ajax({
          url: 'http://app.apiqroo.com.mx/apis/horarios',
          method: 'POST',
          dataType: 'json',
          data:{'user_email':localStorage.user_mail,'user_password':localStorage.user_password,'ruta_naviera':ruta_naviera},
          success: function(response){
                console.log(response);
                var html="";
                var count = Object.keys(response).length;
                 $('#naviera_name').html(response[0].NAV_NOMBRE);
                 console.log(count);
                 
                 SpinnerPlugin.activityStart("Cargando...");
                 for (var j = 0; j < count; j++) {
                       
                       html+= "<li>";
                       html+= "   <a href=\"#\">";
                       html+= "      <span class=\"event-time\">"+response[j].HORA  +" hrs - </span>";
                       html+= "       <span class=\"event-name\">a "+response[j].TO  +"</span>";
                       html+= "          <br />";
                       html+= "           <span class=\"event-location\">Desde "+response[j].FROM  +"</span>";
                       html+= "   </a>";
                       html+= " </li>"

                      
                        
                  }

                  let img = "http://app.apiqroo.com.mx/banner/"+ response[0].NAV_BANNER ;
                  let img_code = "<img style=\"display:none;\" id=\"hora_img_code\" src=\""+img+"\" alt=\"\">";
                  var html2 = $("#horario_img").html();
                  $("#horario_img").html(html2 + img_code);
                   $("#hora_img_code").on('load',function(){
                      $("#hora_img_code").show();
                      $(".wrapper").hide();
                   });
                 
                  $('#horarios').html(html);
                 SpinnerPlugin.activityStop();
          },
          error: function(xhr, status){
            alert('Error: '+JSON.stringify(xhr));
            alert('ErrorStatus: '+JSON.stringify(status));
          }
    });

}





