// Movers.remove({});

var

    //// Generates a semi-random Mover.
    //// Returns an object containing:
    ////     1. A random color
    ////     2. X and Z coordinates for its start position
    randomMover = function (moverType) {
        var x, z
          , out = {
                color:   moverType.color // moverType.colors[ Math.floor( Math.random() * moverType.colors.length ) ]
              , x:       Math.floor( Math.random() * config.xTerrainExtent * config.xTileExtent ) + .5
              , z:       Math.floor( Math.random() * config.zTerrainExtent * config.zTileExtent ) + .5
              , species: moverType.species
            }
        ;
        return out;
    }


    //// Generates a set of Movers, and records them into the `Movers` collection.
  , randomMovers = function () {
        var i
          , moverType
        ;

        //// Xx.
        for (i=0; i<config.moverCount; i++) {

                //// Xx.
                moverType = config.movers[ Math.floor( Math.random() * config.movers.length ) ];

                //// Generate a random mover, and record it in the `Movers` collection.
                Movers.insert( randomMover(moverType) );

        }
    }
;

//// The first time the app starts, generate an initial population of Movers, and record them into the `Movers` collection.
if ( 0 !== Movers.find().count() ) {
    // console.log( Movers.find().count() );
} else {
    console.log('The ‘Movers’ collection is empty...');
    randomMovers();
}
