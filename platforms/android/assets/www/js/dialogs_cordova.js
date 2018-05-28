

/**************************************************************************
*      dialogs_cordova                                                    *
*      Install :cordova plugin add cordova-plugin-dialogs                 *
*      Descripción: archivo js que interactua con el plugin dialogs       *
*      encapsulando sus funciones para uso en toda la aplicación          *
*      Uriel Velasquez - 10 de mayo 2018                                  *
***************************************************************************/


function alert_dialog(message,title,btnName,callback){
  navigator.notification.alert(
    message,  // message
    callback, // callback
    title,    // title
    btnName   // buttonName
  );

} 

function alert_dialog_confirm(message,title,btnName,callback){
  navigator.notification.confirm(
    message,  // message
    callback, // callback
    title,    // title
    btnName
  );
}

