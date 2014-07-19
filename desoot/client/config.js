config.x3dDebug            = false;
config.x3dStatistics       = false;
config.x3dProcessIndicator = false;
config.x3dTogglePoints     = false;

//// Make configuration available to `desoot.html`.
UI.body.helpers({
    config: function () {
        return config;
    }
});
