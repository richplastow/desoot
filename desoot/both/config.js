config = {
    xTileExtent:    8     // number of grid-squares (meters) from the Westmost to the Eastmost edge of a terrain Tile
  , zTileExtent:    8     // number of grid-squares (meters) from the Northmost to the Southmost edge of a terrain Tile
  , xTerrainExtent: 16    // number of Tiles from the Westmost to the Eastmost edges of the terrain
  , zTerrainExtent: 16    // number of Tiles from the Northmost to the Southmost edges of the terrain
  , xTileFar: 30          // only subscribe to Tiles within 30 squares x-distance from your Looptopian
  , zTileFar: 30          // as above, for y-distance

  , moverCount:     400
  , movers: [
        {
            species: 'lizood'
          , color: 'brown'
          , size: '1 1 1'
          , far: 20 // only subscribe to lizoods within 40 squares distance from your Looptopian
        }
      , {
            species: 'camool'
          , color: 'yellow'
          , size: '2 2 2'
          , far: 30
        }
      , {
            species: 'pookas'
          , color: 'pink'
          , size: '.2 .2 .2'
          , far: 10
        }
    ]

  , showGuides:     true  // whether to show guides (useful for develoopment)
};


//// Autogenerate some configs to simplify rendering the terrain.
config.xTileExtentPlus1 = config.xTileExtent + 1;
config.zTileExtentPlus1 = config.zTileExtent + 1;
