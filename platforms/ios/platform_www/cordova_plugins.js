cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-awesome-shared-preferences.SharedPreferences",
    "file": "plugins/cordova-plugin-awesome-shared-preferences/www/index.js",
    "pluginId": "cordova-plugin-awesome-shared-preferences",
    "clobbers": [
      "window.plugins.SharedPreferences"
    ]
  },
  {
    "id": "cordova-plugin-dialogs.notification",
    "file": "plugins/cordova-plugin-dialogs/www/notification.js",
    "pluginId": "cordova-plugin-dialogs",
    "merges": [
      "navigator.notification"
    ]
  },
  {
    "id": "cordova-plugin-spinner.SpinnerPlugin",
    "file": "plugins/cordova-plugin-spinner/www/spinner-plugin.js",
    "pluginId": "cordova-plugin-spinner",
    "clobbers": [
      "SpinnerPlugin"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cordova-plugin-statusbar.statusbar",
    "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
    "pluginId": "cordova-plugin-statusbar",
    "clobbers": [
      "window.StatusBar"
    ]
  },
  {
    "id": "es6-promise-plugin.Promise",
    "file": "plugins/es6-promise-plugin/www/promise.js",
    "pluginId": "es6-promise-plugin",
    "runs": true
  },
  {
    "id": "cordova-plugin-x-socialsharing.SocialSharing",
    "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
    "pluginId": "cordova-plugin-x-socialsharing",
    "clobbers": [
      "window.plugins.socialsharing"
    ]
  },
  {
    "id": "phonegap-plugin-push.PushNotification",
    "file": "plugins/phonegap-plugin-push/www/push.js",
    "pluginId": "phonegap-plugin-push",
    "clobbers": [
      "PushNotification"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-awesome-shared-preferences": "0.1.0",
  "cordova-plugin-dialogs": "2.0.1",
  "cordova-plugin-spinner": "1.1.0",
  "cordova-plugin-splashscreen": "5.0.2",
  "cordova-plugin-statusbar": "1.0.1",
  "cordova-plugin-whitelist": "1.2.2",
  "es6-promise-plugin": "4.1.0",
  "cordova-plugin-x-socialsharing": "5.3.2",
  "phonegap-plugin-push": "2.1.3"
};
// BOTTOM OF METADATA
});