Training app. Most important points:
- it doesn't involve canvas - it's all a matrice of shifting css classes
- folder names are because I was experimenting with different ways of organizing the codebase

Rotation:
- I solved it entirely on my own, using a different methodology than the common ones
- ultimately, what worked is an intersting pattern of developing I came up with, something along the lines of the following
- 1. start at the very end, 2. hard-code it initially, 3. when it works as it should, automate, 4. move one layer of abstraction up, 5. repeat
- in any case, it worked for rotation and I also solved all kinds of other concerns with it, such as scoring or handling collisions with other tetrominoes, or collisisions with the board ends

Codebase is verbose and not maintainable. It was a learning project.
