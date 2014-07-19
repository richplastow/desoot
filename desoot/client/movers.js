UI.body.helpers({
    movers: function () {
        return Movers.find({
          //   x: { $gte:Session.get('northmost'), $lt:Session.get('southmost') }
          // , z: { $gte:Session.get('eastmost') , $lt:Session.get('westmost')  }
        });
    }
});
