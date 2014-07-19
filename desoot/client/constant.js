constant.x3dMain = null; // when X3DOM is ready, a native reference to the main <X3D> element


//// 
jQuery(function($) { // jQuery document ready

    //// Record handy references to the <X3D> elements. @todo more than one <X3D> element?
    constant.x3dMain = document.getElementById('x3d-main');

});
