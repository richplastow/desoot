//// 
jQuery(function($) { // jQuery document ready

    var init = function () {

        //// Set up x3dom debugging tools. http://x3dom.org/docs-old/api.html
        constant.x3dMain.runtime.debug(config.x3dDebug);
        constant.x3dMain.runtime.statistics(config.x3dStatistics);
        constant.x3dMain.runtime.processIndicator(config.x3dProcessIndicator);
        if (config.x3dTogglePoints) { constant.x3dMain.runtime.togglePoints(); }

    };

    //// `x3dMain.runtime` is not available yet, but it will be available at the first `requestAnimationFrame()` frame. @todo test on all devices
    requestAnimationFrame(init);

});