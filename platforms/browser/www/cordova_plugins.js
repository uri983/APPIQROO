cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-progressindicator2/www/progressIndicator.js",
        "id": "cordova-plugin-progressindicator2.ProgressIndicator",
        "pluginId": "cordova-plugin-progressindicator2",
        "clobbers": [
            "ProgressIndicator"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-console": "1.0.7",
    "cordova-plugin-statusbar": "1.0.1",
    "cordova-plugin-progressindicator2": "1.2.1"
}
// BOTTOM OF METADATA
});