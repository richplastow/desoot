UI.body.helpers({
    tiles: function () {
        var
            position = Session.get('looptopianPosition') // @todo user db
          , x = position[0]
          , z = position[2]
          , selector = { $or: [ // http://docs.mongodb.org/manual/reference/operator/query/or/
                {
                    x: { $gte:x - config.xTileFar, $lt:x + config.xTileFar }
                  , z: { $gte:z - config.zTileFar, $lt:z + config.zTileFar }
                },{
                    isHigh: true
                }
            ]}
        ;

        //// Xx.
        return Tiles.find(selector);
    }
});
