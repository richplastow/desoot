Session.set('looptopianPosition', [40,2,40]);

UI.body.helpers({
    looptopianPosition: function () {
        return Session.get('looptopianPosition').join(' ');
    }
  , viewpointPosition: function () {
        var lp = Session.get('looptopianPosition');
        return lp[0] + ' ' + (lp[1] + 6) + ' ' + (lp[2] + 10);
    }
});

UI.body.events({
    "mousedown x3d": function () {
        dragged = false;
    }
  , "mousemove x3d": function () {
        dragged = true;
    }
  , "mouseup shape": function (evt) {

        if (dragged) { return; }

        var x = Math.floor(evt.worldX + evt.normalX / 2) + 0.5
          , y =            evt.worldY + evt.normalY / 2 // @todo height of center of square, from looking up terrain-data
          , z = Math.floor(evt.worldZ + evt.normalZ / 2) + 0.5
        ;

        if (1 === evt.button) {
            console.log('Left Click ', x, y, z, evt.currentTarget.id);
            Session.set('looptopianPosition', [x,y,z]);
            var viewpoint = document.getElementById("viewpoint");
            viewpoint.resetView();

        } else if (2 === evt.button || 4 === evt.button) {
            console.log('Right Click ', x, y, z, evt.currentTarget.id);
        }
    }
});
