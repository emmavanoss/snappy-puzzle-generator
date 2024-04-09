# Snappy puzzle generator

"Snappy puzzles" are games where you slide tiles around to make a complete 
picture.

`createGame` will generate a solvable board from a set of tiles and `validate` 
will return the completed picture when the correct solution is submitted.

There's also a script here for convenience that will chop a picture up into
however many tiles. To use it:
- Copy the script into your project (or wherever you want the tiles)
- Install imagemagick (e.g. with homebrew)
- Create the output directory e.g. `mkdir boards/duck`
- Run `tile.sh` on your image, e.g. `sh tile.sh duck.jpg boards/duck`.