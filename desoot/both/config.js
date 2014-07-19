config = {
    xTileExtent: 8    // number of grid-squares (meters) from the Westzzzmost to the Eastzzzmost edge of a terrain-tile
  , zTileExtent: 8    // number of grid-squares (meters) from the Northzzzmost to the Southzzzmost edge of a terrain-tile
  , xTerrainExtent: 8 // number of tiles from the Westzzzmost to the Eastzzzmost edges of the terrain
  , zTerrainExtent: 8 // number of tiles from the Northzzzmost to the Southzzzmost edges of the terrain

  , showGuides: true  // whether to show guides (useful for develoopment)
};


//// Autogenerate some configs to simplify rendering the terrain.
config.xTileExtentPlus1 = config.xTileExtent + 1;
config.zTileExtentPlus1 = config.zTileExtent + 1;
