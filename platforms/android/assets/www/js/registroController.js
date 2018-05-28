

app.onPageInit('register', function (page) {
      $('#login').on('click',function (e) {
       	  window.location="index.html";
      })

      $('#btn_register').on('click',function (e) {
       	 btnRegister();
      })
});





/*********************************
*      Funcionalidades           *
*                                *
**********************************/


/** se ejecuta al click del registro */
function btnRegister(){


	let user             = $('#user').val();
	let mail             = $('#username_register').val();
	let password         = $('#password_register').val();
	let password_confirm = $('#conf_password').val();

	if(isEmpty(user,mail,password,password_confirm) == true){

		if(validate_mail(mail) == false){

			if(validate_password(password,password_confirm) == true){
				postRegister(user,mail,password,password_confirm);
			}

		}

	}
}





/** [isEmpty metodo que valida que los campos no esten vacios] */
function isEmpty(user,mail,password,password_confirm){


	if(user == "" || mail == "" || password == "" || password_confirm == ""){
		alert_dialog('No dejes campos vacíos','Verifica tus datos','ok',function(){});
		return false;
	}

	return true;

}

/** [validate_mail description] */
function validate_mail(mail){
	let status = false;
	$$.ajax({
		  async	  :  false,
          url     : 'http://app.apiqroo.com.mx/user/mail_exist',
          method  : 'POST',
          dataType: 'json',
          data    : {'mail':mail},
          success: function(response){
                 
                 if(response.success == true){
                  alert_dialog(response.message,'Correo registrado anteriormente','Continuar', app.closeModal());
                  status = true;
                 }else{
                  status = false;
                 }
                 
          },
          error: function(xhr, status){
            alert('Error: '+JSON.stringify(xhr));
            alert('ErrorStatus: '+JSON.stringify(status));
          }
    });

	return status;

}

function validate_password(password,password_confirm){

	if(password == password_confirm){
		return true;
	}else{

		alert_dialog('Verifica tu contraseña','Las contraseñas no coinciden','ok',function(){});
		return false;	
	}

	

}

function postRegister(user,mail,password,password_confirm){
	SpinnerPlugin.activityStart("Creando registro...");
	$$.ajax({
		  async	  :  false,
          url     : 'http://app.apiqroo.com.mx/user/register',
          method  : 'POST',
          dataType: 'json',
          data    : {'user':user,'mail':mail,'password':password},
          success: function(response){
                 
                 if(response.success == true){
                  SpinnerPlugin.activityStop();
                  alert_dialog(response.message,'¡Éxito!','Continuar', function(){
                  localStorage.user_mail     = $('#username').val();
                  localStorage.user_password = $('#password').val(); 
                  $('#username_menu').html(localStorage.user_mail);
                  window.location="index.html";
                  
                  });
                  
                 }else{
                   SpinnerPlugin.activityStop();
                   alert_dialog(response.message,'¡Algo salio mal!','Continuar', app.closeModal());
                 }
                 
          },
          error: function(xhr, status){
            alert('Error: '+JSON.stringify(xhr));
            alert('ErrorStatus: '+JSON.stringify(status));
          }
    });

	
}







