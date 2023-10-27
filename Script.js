const readline = require("readline");

class NQueens {
  constructor(size) {
    this.size = size;
  }

  // Depth-First Search (DFS) solution
  solveDFS() {
    if (this.size < 1) {
      return [];
    }
    const solutions = [];
    const stack = [[]];
    while (stack.length > 0) {
      const solution = stack.pop();
      if (this.conflict(solution)) {
        continue;
      }
      const row = solution.length;
      if (row === this.size) {
        solutions.push([...solution]);
        continue;
      }
      for (let col = 0; col < this.size; col++) {
        const queen = [row, col];
        const queens = [...solution];
        queens.push(queen);
        stack.push(queens);
      }
    }
    return solutions;
  }

  // Breadth-First Search (BFS) solution
  solveBFS() {
    if (this.size < 1) {
      return [];
    }
    const solutions = [];
    const queue = [[]];
    while (queue.length > 0) {
      const solution = queue.shift();
      if (this.conflict(solution)) {
        continue;
      }
      const row = solution.length;
      if (row === this.size) {
        solutions.push([...solution]);
        continue;
      }
      for (let col = 0; col < this.size; col++) {
        const queen = [row, col];
        const queens = [...solution];
        queens.push(queen);
        queue.push(queens);
      }
    }
    return solutions;
  }

  // Add this method to your NQueens class
  solveUCS() {
    if (this.size < 1) {
      return [];
    }
    const solutions = [];
    const queue = [{ queens: [], cost: 0 }];

    while (queue.length > 0) {
      const { queens, cost } = queue.shift();

      if (this.conflict(queens)) {
        continue;
      }

      const row = queens.length;

      if (row === this.size) {
        solutions.push([...queens]);
        continue;
      }

      for (let col = 0; col < this.size; col++) {
        const queen = [row, col];
        const newQueens = [...queens, queen];
        const newCost = cost + 1; // Increment the cost for each step
        queue.push({ queens: newQueens, cost: newCost });
      }

      // Sort the queue based on the cost (Uniform Cost Search)
      queue.sort((a, b) => a.cost - b.cost);
    }

    return solutions;
  }

  solveAStar() {
    if (this.size < 1) {
      return [];
    }
    const solutions = [];
    const openList = [
      { queens: [], cost: 0, heuristic: this.randomHeuristic() },
    ];
    const closedList = new Set();

    while (openList.length > 0) {
      openList.sort((a, b) => a.cost + a.heuristic - (b.cost + b.heuristic));
      const { queens, cost } = openList.shift();

      if (this.conflict(queens)) {
        continue;
      }

      const row = queens.length;

      if (row === this.size) {
        solutions.push([...queens]);
        continue;
      }

      for (let col = 0; col < this.size; col++) {
        const queen = [row, col];
        const newQueens = [...queens, queen];
        const newCost = cost + 1; // Increment the cost for each step
        const heuristic = this.randomHeuristic(); // Create a random heuristic
        openList.push({ queens: newQueens, cost: newCost, heuristic });
      }

      closedList.add(queens.toString());
    }

    return solutions;
  }

  // Create a random heuristic (this is just an example)
  randomHeuristic() {
    return Math.random();
  }

    // Greedy solution
    solveGreedy() {
      if (this.size < 1) {
        return [];
      }
      const solutions = [];
      for (let i = 0; i < this.size; i++) {
        const solution = this.placeQueensGreedy(i);
        if (solution.length === this.size) {
          solutions.push(solution);
        }
      }
      return solutions;
    }
  
    placeQueensGreedy(startRow) {
      const queens = [];
      for (let row = startRow; row < this.size; row++) {
        let minConflicts = this.size;
        let minConflictCol = -1;
        for (let col = 0; col < this.size; col++) {
          const conflictCount = this.countConflicts(queens, row, col);
          if (conflictCount < minConflicts) {
            minConflicts = conflictCount;
            minConflictCol = col;
          }
        }
        if (minConflictCol !== -1) {
          queens.push([row, minConflictCol]);
        }
      }
      return queens;
    }
  
    countConflicts(queens, row, col) {
      let conflicts = 0;
      for (let i = 0; i < queens.length; i++) {
        const [qRow, qCol] = queens[i];
        if (qCol === col || qRow - qCol === row - col || qRow + qCol === row + col) {
          conflicts++;
        }
      }
      return conflicts;
    }
  

  // Check if there is a conflict between queens on the board
  conflict(queens) {
    for (let i = 1; i < queens.length; i++) {
      for (let j = 0; j < i; j++) {
        const [a, b] = queens[i];
        const [c, d] = queens[j];
        if (a === c || b === d || Math.abs(a - c) === Math.abs(b - d)) {
          return true;
        }
      }
    }
    return false;
  }

  solveIDDFS() {
    if (this.size < 1) {
      return [];
    }
  
    let depth = 0;
    let solutions = [];
  
    while (solutions.length === 0 && depth <= this.size) {
      solutions = this.dfsWithDepthLimit([], depth);
      depth++;
    }
  
    return solutions;
  }
  
  // Modify the DFS method to work with depth limits
  dfsWithDepthLimit(solution, depthLimit) {
    const solutions = [];
    const stack = [{ queens: solution, depth: 0 }];
  
    while (stack.length > 0) {
      const { queens, depth } = stack.pop();
  
      if (depth > depthLimit) {
        continue;
      }
  
      if (this.conflict(queens)) {
        continue;
      }
  
      const row = queens.length;
  
      if (row === this.size) {
        solutions.push([...queens]);
        continue;
      }
  
      for (let col = 0; col < this.size; col++) {
        const queen = [row, col];
        const newQueens = [...queens, queen];
        stack.push({ queens: newQueens, depth: depth + 1 });
      }
    }
  
    return solutions;
  } 

  // Print the board with queens placed
  print(queens) {
    for (let i = 0; i < this.size; i++) {
      console.log(" ---".repeat(this.size));
      for (let j = 0; j < this.size; j++) {
        const p = queens.some((queen) => queen[0] === i && queen[1] === j)
          ? "Q"
          : " ";
        process.stdout.write(`| ${p} `);
      }
      console.log("|");
    }
    console.log(" ---".repeat(this.size));
  }
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(".: N-Queens Problem :.");
  rl.question("Please enter the size of the board: ", (size) => {
    size = parseInt(size);
    const nQueens = new NQueens(size);

    const dfsSolutions = nQueens.solveDFS();
    const bfsSolutions = nQueens.solveBFS();
    const ucsSolutions = nQueens.solveUCS();
    const aStarSolutions = nQueens.solveAStar();
    const greedySolutions = nQueens.solveGreedy(); 
    const iddfsSolutions = nQueens.solveIDDFS();

    console.log("Depth-First Search (DFS) Solutions:");
    dfsSolutions.forEach((solution, i) => {
      console.log(`DFS Solution ${i + 1}:`);
      nQueens.print(solution);
    });

    console.log("Iterative Deepening DFS (IDDFS) Solutions:");
    iddfsSolutions.forEach((solution, i) => {
      console.log(`IDDFS Solution ${i + 1}:`);
      nQueens.print(solution);
    });

    console.log("Breadth-First Search (BFS) Solutions:");
    bfsSolutions.forEach((solution, i) => {
      console.log(`BFS Solution ${i + 1}:`);
      nQueens.print(solution);
    });

    console.log("Uniform Cost Search (UCS) Solutions:");
    ucsSolutions.forEach((solution, i) => {
      console.log(`UCS Solution ${i + 1}:`);
      nQueens.print(solution);
    });

    console.log("A* Search Solutions:");
    aStarSolutions.forEach((solution, i) => {
      console.log(`A* Solution ${i + 1}:`);
      nQueens.print(solution);
    });

    console.log("Greedy Algorithm Solutions:");
    greedySolutions.forEach((solution, i) => {
      console.log(`Greedy Solution ${i + 1}:`);
      nQueens.print(solution);
    });


    console.log(`Total DFS solutions: ${dfsSolutions.length}`);
    console.log(`Total BFS solutions: ${bfsSolutions.length}`);
    console.log(`Total UCS solutions: ${ucsSolutions.length}`);
    console.log(`Total A* solutions: ${aStarSolutions.length}`);
    console.log(`Total Greedy solutions: ${greedySolutions.length}`);
    console.log(`Total IDDFS solutions: ${iddfsSolutions.length}`);


    rl.close();
  });
}

main();