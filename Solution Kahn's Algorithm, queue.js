
/**
 * Applying Kahn's algorithm, applying queue.
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

    const head = new QueueNode();
    let tail = head;

    //Initialize queue with nodes that have no incoming edges(indegree = 0).
    for (let i = 0; i < numCourses; i++) {
        if (nodesIndegree[i] === 0) {
            tail.next = new QueueNode(i);
            tail = tail.next;
        }
    }

    const scheduledCourses_topologicallySorted = new Array(numCourses);
    let index_scheduledCourses = 0;

    while (head.next !== null) {

        let current = head.next;

        scheduledCourses_topologicallySorted[index_scheduledCourses++] = current.value;

        const nextCourses = adjacencyList[current.value];
        for (let course of nextCourses) {
            nodesIndegree[course]--;
            if (nodesIndegree[course] === 0) {
                tail.next = new QueueNode(course);
                tail = tail.next;
            }
        }
        head.next = head.next.next;
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

function QueueNode(value = 0) {
    this.value = value;
    this.next = null;
}
