UI.body.helpers({
    movers: function () {
        var mover
          , position = Session.get('looptopianPosition') // @todo user db
          , x = position[0]
          , z = position[2]
          , selector = { $or: [] } // http://docs.mongodb.org/manual/reference/operator/query/or/
        ;

        //// Small Movers have a low `far`, so search nearby for them. Large Movers have a high `far`, because they can be seen from farther away.
        config.movers.forEach( function (mover) {
            selector.$or.push({
                x: { $gte:x - mover.far, $lt:x + mover.far }
              , z: { $gte:z - mover.far, $lt:z + mover.far }
              , species: mover.species
            });
        });
        return Movers.find(selector);
    }
});
