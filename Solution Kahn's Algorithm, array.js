
/**
 * Applying Kahn's algorithm, applying the JS in-built array.
 * 
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {

    this.adjacencyList = [];
    this.nodesIndegree = [];
    initialize_nodesIndegree(numCourses, prerequisites);
    initialize_adjacencyList(numCourses, prerequisites);

    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (nodesIndegree[i] === 0) {
            queue.push(i);
        }
    }

    const scheduledCourses_topologicallySorted = new Array(numCourses);
    let index_scheduledCourses = 0;

    while (queue.length > 0) {

        let current = queue.shift();
        scheduledCourses_topologicallySorted[index_scheduledCourses++] = current;

        const nextCourses = adjacencyList[current];
        for (let course of nextCourses) {
            nodesIndegree[course]--;
            if (nodesIndegree[course] === 0) {
                queue.push(course);
            }
        }
    }

    return index_scheduledCourses === numCourses ? scheduledCourses_topologicallySorted : [];
};


function initialize_adjacencyList(numCourses, prerequisites) {

    let size = prerequisites.length;
    for (let i = 0; i < numCourses; i++) {
        this.adjacencyList[i] = new Set();
    }

    for (let i = 0; i < size; i++) {
        let from = prerequisites[i][1];
        let to = prerequisites[i][0];
        this.adjacencyList[from].add(to);
    }
}

function initialize_nodesIndegree(numCourses, prerequisites) {
    this.nodesIndegree = new Array(numCourses).fill(0);

    let size = prerequisites.length;
    for (let i = 0; i < size; i++) {
        let to = prerequisites[i][0];
        this.nodesIndegree[to]++;
    }
}
