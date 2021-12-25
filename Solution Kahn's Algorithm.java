
import java.util.Queue;
import java.util.Set;
import java.util.HashSet;
import java.util.LinkedList;

public class Solution {

    Set<Integer>[] adjacencyList;
    int[] nodesIndegree;

    //Applying Kahn's algorithm.
    public int[] findOrder(int numCourses, int[][] prerequisites) {

        initialize_adjacencyList(numCourses, prerequisites);
        initialize_nodesIndegree(numCourses, prerequisites);
        Queue<Integer> queue = new LinkedList<>();

        //Initialize queue with nodes that have no incoming edges(indegree = 0).
        for (int i = 0; i < numCourses; i++) {
            if (nodesIndegree[i] == 0) {
                queue.add(i);
            }
        }

        if (queue.isEmpty()) {
            return new int[0];
        }

        int[] scheduledCourses_topologicallySorted = new int[numCourses];
        int index_scheduledCourses = 0;

        while (!queue.isEmpty()) {

            int current = queue.poll();
            scheduledCourses_topologicallySorted[index_scheduledCourses++] = current;

            Set<Integer> nextCourses = adjacencyList[current];
            for (int course : nextCourses) {
                nodesIndegree[course]--;
                if (nodesIndegree[course] == 0) {
                    queue.add(course);
                }
            }
        }
        return index_scheduledCourses == numCourses ? scheduledCourses_topologicallySorted : new int[0];
    }

    public void initialize_adjacencyList(int numCourses, int[][] prerequisites) {

        adjacencyList = new Set[numCourses];
        int size = prerequisites.length;

        for (int i = 0; i < numCourses; i++) {
            adjacencyList[i] = new HashSet<>();
        }

        for (int i = 0; i < size; i++) {
            int from = prerequisites[i][1];
            int to = prerequisites[i][0];
            adjacencyList[from].add(to);
        }
    }

    public void initialize_nodesIndegree(int numCourses, int[][] prerequisites) {

        nodesIndegree = new int[numCourses];
        int size = prerequisites.length;
        for (int i = 0; i < size; i++) {
            int to = prerequisites[i][0];
            nodesIndegree[to]++;
        }
    }
}
