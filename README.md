# p5js_ants
A genetic algorithm simulation

In this simulation, I generate 25 ants at the start and assign them a random direction for 200 frames.
These directions are up, left, or right. (I did have down, but the ants were getting stuck. I might add it back in).
After 200 frames, a fitness level is determined for each ant based on the distance to the food source.
If the kill box was hit, not only do they stop for the rest of the 200 frames, but their fitness is cut in half at the end.
Once the fitness is determined, I then generate 25 new ants and crossover the DNA of two parents from the previous population.
A higher fitness means a higher chance of being a parent.
Mutation also exists to add a chance of discovering a higher fitness value.

Try it out here: https://johnbarbee.github.io/p5js_ants/
