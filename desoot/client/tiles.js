// Session.set('eastmost' , 2 * 8);
// Session.set('westmost' , 4 * 8);
// Session.set('northmost', 2 * 8);
// Session.set('southmost', 4 * 8);

UI.body.helpers({
    tiles: function () {
        return Tiles.find({
          //   x: { $gte:Session.get('northmost'), $lt:Session.get('southmost') }
          // , z: { $gte:Session.get('eastmost') , $lt:Session.get('westmost')  }
        });
    }
});
