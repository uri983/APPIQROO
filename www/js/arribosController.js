

app.onPageInit('cruceros', function (page) {
    // Do something here for "about" page
    loadArribos();
});





/*********************************
*      Funcionalidades           *
*                                *
**********************************/




function loadArribos(){

  $$.ajax({
                url: 'http://app.apiqroo.com.mx/apis/arribos',
                method: 'POST',
                dataType: 'json',
                 data:{'user_email':'email@example.com','user_password':'123456'},
                success: function(response){
                var html="";
                var count = Object.keys(response).length;
                 console.log(response);
                var group_header = ""; 
                 SpinnerPlugin.activityStart("Cargando...");
                 for (var j = 0; j < count; j++) {
                        if(group_header != response[j].FFECHA ){
                        html+="<div style=\"margin:0px;\" class=\"list-block\"><li class=\"list-group-title\">"+response[j].NFECHA+"</li></div>";
                        group_header = response[j].FFECHA;
                        }
                  
                        html+=  "<li>";
                        html+=   "<a href=\"#\">";
                        html+=     "<div class=\"post\">";
                        html+=      "<div style=\"    width: 100%;\" class=\"post-details\">";
                        html+=        "<div style=\"color:#345386;\" class=\"post-category\">"+response[j].NPUERTO+"</div>";
                        html+=        "<h2 class=\"post-title-content\">"+response[j].NCRUCERO+"</h2>";
                        var res = response[j].PNAVIERA.split("|");
                        var status = "";
                        if(response[j].ESTATUS == "A"){
                          status = "<span style=\"color:#009688;\"> ARRIBADO </span>";
                        }else if(response[j].ESTATUS == "P"){
                          status = "<span style=\"color:#d68918;\"> PROGRAMADO </span>";
                        }else{
                          status = "<span style=\"color:#c50e00;\"> CANCELADO </span>";
                        }
                        html+=       "<div style=\"color:#2c3944;\" class=\"post-publication\"><img src=\"http://estadistica.apiqroo.com.mx/assets/img/flags/"+res['0']+".png\"> "+ res[1] +" - "+ status +"</div>";
                        html+=       "<div style=\"color:#2c3944;\" class=\"post-publication\">ETA: "+ response[j].ETA +" ETD: "+ response[j].ETD +" </div>";
                        html+=     "</div>";
                        html+=   "</div>";
                        html+="</a>";
                       html+=  "</li>";
                  }

                  $('#list-content').html(html);
                 SpinnerPlugin.activityStop();
                },
                error: function(xhr, status){
                  alert('Error: '+JSON.stringify(xhr));
                  alert('ErrorStatus: '+JSON.stringify(status));
                }
    });

}





