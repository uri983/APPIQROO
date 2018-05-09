

app.onPageInit('puerto_detail', function (page) {
    
   let puerto_id = page.query.puerto;

   getPuertoDetail(puerto_id);

})





/*********************************
*      Funcionalidades           *
*                                *
**********************************/




function getPuertoDetail(port_id){

  // Do something here for "about" page
   SpinnerPlugin.activityStart("Cargando...");   
   let puerto_id     = port_id;
   let puerto_name   = "";
   let img           = "";
   let status        = "";
   let icon          = "";
   let status_message= "";




   $$.ajax({
                url: 'http://app.apiqroo.com.mx/apis/port_details',
                method: 'POST',
                dataType: 'json',
                data:{'puerto_id':puerto_id,'user_email':'email@example.com','user_password':'123456'},
                success: function(response){
                  console.log(response);
                  SpinnerPlugin.activityStop();

                  if(puerto_id == 2){
                    img = "punta_sam";
                    
                   }else if(puerto_id == 3){
                    img = "puerto_juarez";
                   
                   } else if(puerto_id == 4){
                    img = "isla_mujeres";
                   
                   } else if(puerto_id == 7){
                    img = "cozumel";
                    
                   } else if(puerto_id == 26){
                     img = "chetumal";
                     
                   } 

                   if(response[0].PUERH_STATUS = null){
                      icon   = "<i style=\"color: #04a20a;\" class=\"icon ion-ios-checkmark\"></i>";
                      status = "<div class=\"item-title\" style=\"color: #04a20a;\">Puerto Abierto</div>";
                    }else if(response[0].PUERH_STATUS = 1){
                      icon   = "<i style=\"color: #04a20a;\" class=\"icon ion-ios-checkmark\"></i>";
                      status = "<div class=\"item-title\" style=\"color: #04a20a;\">Puerto Abierto</div>";
                    }else{
                      icon   = "<i style=\"color: #f44336;\" class=\"icon ion-ios-close\"></i>";
                      status = "<div class=\"item-title\" style=\"color: #f44336;\">Puerto Cerrado</div>";
                    }

                    if(response[0].PUERH_FLAG == null){
                      status_message = "Puerto abierto a todo tipo de navegación";
                    }else if(response[0].PUERH_FLAG == 1){
                       status_message = "Puerto abierto a todo tipo de navegación";
                    }else if(response[0].PUERH_FLAG == 2){
                       status_message = "Puerto abierto, extremar precauciones";
                    }else if(response[0].PUERH_FLAG == 3){
                       status_message = "Cerrado únicamente a la navegación menor.";
                    }else if(response[0].PUERH_FLAG == 4){
                       status_message = "Cerrado a todo tipo de navegación.";
                    }

                   img = "http://app.apiqroo.com.mx/puertos/"+ img +".JPG"
                   let img_code = "<img style=\"display:none;\" id=\"port_img_code\" src=\""+img+"\" alt=\"\">";
                   $('#port_name').html(response[0].PUER_SNAME);
                   $('#port_address').html(response[0].PUER_DIRECCION);
                   $('#port_text').html(response[0].PUER_TEXT);
                   $("#port_phone").html(response[0].PUER_TELEFONO);
                   $("#port_horario").html(response[0].PUER_HORARIO);
                   $("#port_status").html(status);
                   $("#port_status_icon").html(icon);
                   $("#port-flag-description").html(status_message);
                   var lat         = parseFloat(response[0].PUER_LAT);
                   var lon         = parseFloat(response[0].PUER_LON);
                   var puerto_coord= {lat: lat, lng: lon};

                                      
                   var map = new google.maps.Map(document.getElementById('map_canvas'), {
                          zoom: 18,
                          center: puerto_coord
                    });
                   var marker = new google.maps.Marker({
                          position: puerto_coord,
                          map: map
                    });

                   var html = $("#port_img").html();

                   $("#port_img").html(html + img_code);
                   $("#port_img_code").on('load',function(){
                      $("#port_img_code").show();
                      $(".wrapper").hide();
                   });
                  
                  
                },
                error: function(xhr, status){
                  alert('Error: '+JSON.stringify(xhr));
                  alert('ErrorStatus: '+JSON.stringify(status));
                }
    });




}





