config = {
    xTileExtent: 8 // number of grid-squares (meters) from the Northmost to the Southmost edge of a terrain-tile
  , zTileExtent: 8 // number of grid-squares (meters) from the Eastmost to the Westmost edge of a terrain-tile
  , xTerrainExtent: 8 // number of tiles from the Northmost to the Southmost edges of the terrain
  , zTerrainExtent: 8 // number of tiles from the Eastmost to the Westmost edges of the terrain

  , guides: true // whether to show guides (useful for develoopment)
}


//// Autogenerate some configs to simplify rendering the terrain.
config.xTileExtentPlus1 = config.xTileExtent + 1;
config.zTileExtentPlus1 = config.zTileExtent + 1;
