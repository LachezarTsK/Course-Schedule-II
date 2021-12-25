
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
    this.scheduledCourses_topologicallySorted = new Array(numCourses);
    this.index_scheduledCourses = numCourses - 1;//due to the recursion, the array is filled from back to front.
    this.adjacencyList = new Array(numCourses);
    this.nodeStatus = new Array(numCourses).fill(0);
    this.NOT_VISITED = 0;
    this.VISITED = 1;
    this.ACYCLIC = 2;

    initialize_adjacencyList(numCourses, prerequisites);

    for (let node = 0; node < numCourses; node++) {
        if (nodeStatus[node] === NOT_VISITED) {
            depthFirstSearch(node);

        }
    }

    //'index_scheduledCourses == -1' i.e. filled the array from back to front all the courses have been visited.
    return index_scheduledCourses === -1 ? scheduledCourses_topologicallySorted : [];
};

function depthFirstSearch(node) {

    this.nodeStatus[node] = this.VISITED;
    const nextCourses = this.adjacencyList[node];

    for (let course of nextCourses) {
        if (this.nodeStatus[course] === this.NOT_VISITED) {
            depthFirstSearch(course);
        } else if (this.nodeStatus[course] === this.VISITED) {
            return;
        }
    }

    this.scheduledCourses_topologicallySorted[this.index_scheduledCourses--] = node;
    this.nodeStatus[node] = this.ACYCLIC;
}

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
