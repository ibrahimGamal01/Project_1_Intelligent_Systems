## Table of Contents

1. Introduction
2. Class: NQueens
    - Constructor
    - DFS Solution
    - BFS Solution
    - UCS Solution
    - A* Solution
    - Greedy Solution
    - Iterative Deepening DFS Solution
    - Conflict
    - Print
3. Main Function

## 1. Introduction

The N-Queens problem is a classic puzzle that involves placing N chess queens on an N×N chessboard so that no two queens threaten each other. This means that no two queens can be in the same row, column, or diagonal.

The project provides solutions to this problem using different search algorithms. Each algorithm attempts to find all possible solutions for a given N.

## 2. Class: NQueens

### Constructor

- **Description:** The constructor initializes the NQueens class with a specified board size.

---

## Depth-First Search (DFS) Solution

- **Description:** The Depth-First Search (DFS) algorithm is used to solve the N-Queens problem. It explores the search space by systematically placing queens on the board, backtracking when conflicts are detected.

### Walkthrough of the Code

1. The `solveDFS` method initializes an empty stack and an empty solutions array.
2. It starts with an empty solution (no queens placed) on the stack.
3. In each iteration, it pops a solution from the stack, checks for conflicts using the `conflict` method, and proceeds only if there are no conflicts.
4. It then checks if all rows are filled. If so, it adds the solution to the solutions array.
5. If there are still rows to be filled, it explores all possible queen placements in the next row by pushing modified solutions onto the stack.
6. This process continues until all possible solutions are found or the stack is empty.

---

### Breadth-First Search (BFS) Solution

- **Description:** The Breadth-First Search (BFS) algorithm attempts to find solutions by systematically placing queens on the board in a breadth-first manner.

### Walkthrough of the Code

1. The `solveBFS` method initializes an empty queue and an empty solutions array.
2. It starts with an empty solution (no queens placed) in the queue.
3. In each iteration, it dequeues a solution from the queue, checks for conflicts using the `conflict` method, and proceeds only if there are no conflicts.
4. It then checks if all rows are filled. If so, it adds the solution to the solutions array.
5. If there are still rows to be filled, it explores all possible queen placements in the next row by enqueuing modified solutions.
6. This process continues until all possible solutions are found or the queue is empty.

---

### Uniform Cost Search (UCS) Solution

- **Description:** The Uniform Cost Search (UCS) algorithm is employed to find solutions by considering the cost of each step. It explores the search space by incrementally adding queens and prioritizing lower-cost paths.

### Walkthrough of the Code

1. The `solveUCS` method initializes an empty queue, an empty solutions array, and each solution's cost.
2. It starts with an empty solution (no queens placed) in the queue with a cost of 0.
3. In each iteration, it dequeues a solution from the queue and checks for conflicts using the `conflict` method. It proceeds only if there are no conflicts.
4. It then checks if all rows are filled. If so, it adds the solution to the solutions array.
5. If there are still rows to be filled, it explores all possible queen placements in the next row by enqueuing modified solutions with an incremented cost.
6. The queue is sorted based on cost, giving priority to lower-cost paths.
7. This process continues until all possible solutions are found or the queue is empty.

---

### A* Search Solution

- **Description:** The A* Search algorithm is used to find solutions by combining the cost of each step with a heuristic. It explores the search space by considering both cost and heuristic, aiming for an optimal solution.

### Walkthrough of the Code

1. The `solveAStar` method initializes an empty open list, an empty solutions array, and a closed list to track visited solutions.
2. It starts with an empty solution (no queens placed) in the open list with a cost of 0 and a random heuristic.
3. In each iteration, it selects the solution with the lowest combined cost and heuristic from the open list.
4. It checks for conflicts using the `conflict` method and proceeds only if there are no conflicts.
5. It then checks if all rows are filled. If so, it adds the solution to the solutions array.
6. If there are still rows to be filled, it explores all possible queen placements in the next row by adding modified solutions with an incremented cost and a new random heuristic to the open list.
7. The open list is sorted based on the sum of cost and heuristic, favoring lower values.
8. Visited solutions are tracked in the closed list to avoid revisiting them.
9. This process continues until all possible solutions are found or the open list is empty.

---

### Greedy Solution

- **Description:** The Greedy algorithm finds solutions by greedily placing queens row by row, selecting the column with the fewest conflicts in each row.

### Walkthrough of the Code

1. The `solveGreedy` method initializes an empty solutions array.
2. It iterates through each row, starting from the top, and in each row, it places the queen in the column with the fewest conflicts.
3. It continues this process until all rows are filled or no valid placement is possible.
4. If all rows are filled, a solution is added to the solutions array.

---

### Iterative Deepening Depth-First Search (IDDFS) Solution

- **Description:** The Iterative Deepening Depth-First Search (IDDFS) is a modification of the DFS algorithm that works with depth limits. It iteratively increases the depth limit until a solution is found.

### Walkthrough of the Code

1. The `solveIDDFS` method initializes an empty solutions array and starts with a depth limit of 0.
2. It enters a loop where it repeatedly applies a depth-limited DFS search with the current depth limit.
3. The depth-limited DFS is similar to regular DFS, but it stops exploring when it reaches the depth limit.
4. The depth limit is increased in each iteration, and the search continues until a solution is found or all depth levels are exhausted.
5. Solutions found at each depth limit are added to the solutions array.

---
---

## Main Function

The `main` function handles user input, where the user can specify the size of the chessboard. It then calls each of the NQueens class's solving methods and prints the solutions for each algorithm.