Session.set('eastmost' , 0 * 8);
Session.set('westmost' , 8 * 8);
Session.set('northmost', 0 * 8);
Session.set('southmost', 8 * 8);

UI.body.helpers({
    terrain: function () {
        return Terrain.find({
          //   x: { $gte:Session.get('eastmost') , $lt:Session.get('westmost')  }
          // , z: { $gte:Session.get('northmost'), $lt:Session.get('southmost') }
        });
    }
  , config: function () {
        return config; // from both/config.js
    }
});
