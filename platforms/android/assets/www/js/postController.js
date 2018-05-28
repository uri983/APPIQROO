

app.onPageInit('post', function (page) {
    // Do something here for "about" page
    getNewsDetail(page.query.news_id);
   
})





/*********************************
*      Funcionalidades           *
*                                *
**********************************/




function getNewsDetail(news_id){
  SpinnerPlugin.activityStart("Cargando...");
    $$.ajax({
                url: 'http://app.apiqroo.com.mx/apis/news_details',
                method: 'POST',
                dataType: 'json',
                data:{'new_id':news_id,'user_email':localStorage.user_mail,'user_password':localStorage.user_password},
                success: function(response){
                  //console.log(response);
                  var img = response[0].img.replace("dev.apiqroo.com.mx/v2017-v3", "www.apiqroo.com.mx");
                      img = img.replace("dev.apiqroo.com.mx/v2017", "www.apiqroo.com.mx");
                 
                  var res = response[0].post_content.replace(/\[.*?\]\s?/g, '')
                  $('.post-date').html(response[0].post_date);
                  $('#post-content').html(jQuery(res).text());
                  $('#post-title').html(response[0].post_title);
                  //$("#post-img").attr("src",img);

                  localStorage.title = response[0].post_title;
                  localStorage.url   = response[0].guid;
                  localStorage.img   = img;
                  var img_code="<img alt=\"\" id=\"post_img_code\" src=\""+img+"\">";
                  var html = $("#post_img").html();
                  $("#post_img").html(html + img_code);
                   $("#post_img_code").on('load',function(){
                      $("#post_img_code").show();
                      $(".wrapper").hide();
                   });
                  SpinnerPlugin.activityStop();
                  
                  
                },
                error: function(xhr, status){
                  alert('Error: '+JSON.stringify(xhr));
                  alert('ErrorStatus: '+JSON.stringify(status));
                }
    });


    

}





