
import java.util.Set;
import java.util.HashSet;

public class Solution {

    int[] scheduledCourses_topologicallySorted;
    int index_scheduledCourses;
    Set<Integer>[] adjacencyList;
    int[] nodeStatus;
    final int NOT_VISITED = 0;
    final int VISITED = 1;
    final int ACYCLIC = 2;

    public int[] findOrder(int numCourses, int[][] prerequisites) {

        initialize_adjacencyList(numCourses, prerequisites);
        scheduledCourses_topologicallySorted = new int[numCourses];
        nodeStatus = new int[numCourses];
        index_scheduledCourses = numCourses - 1;//due to the recursion, the array is filled from back to front.

        for (int node = 0; node < numCourses; node++) {
            if (nodeStatus[node] == NOT_VISITED) {
                depthFirstSearch(node);

            }
        }
        //'index_scheduledCourses == -1' i.e. filled the array from back to front all the courses have been visited.
        return index_scheduledCourses == -1 ? scheduledCourses_topologicallySorted : new int[0];
    }

    public void depthFirstSearch(int node) {

        nodeStatus[node] = VISITED;
        Set<Integer> nextCourses = adjacencyList[node];

        for (int course : nextCourses) {
            if (nodeStatus[course] == NOT_VISITED) {
                depthFirstSearch(course);
            } else if (nodeStatus[course] == VISITED) {
                return;
            }
        }
        scheduledCourses_topologicallySorted[index_scheduledCourses--] = node;
        nodeStatus[node] = ACYCLIC;
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
}
