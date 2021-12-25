
#include<vector>
using namespace std;

class Solution {
    
public:
    vector<int> scheduledCourses_topologicallySorted;
    int index_scheduledCourses;
    vector<vector<int>> adjacencyList;
    vector<int> nodeStatus;
    const int NOT_VISITED = 0;
    const int VISITED = 1;
    const int ACYCLIC = 2;

    vector<int> findOrder(int numCourses, vector<vector<int>>&prerequisites) {

        initialize_scheduledCourses_topologicallySorted(numCourses);
        initialize_adjacencyList(numCourses, prerequisites);
        initialize_nodeStatus(numCourses);
        index_scheduledCourses = numCourses - 1; //due to the recursion, the array is filled from back to front.

        for (int node = 0; node < numCourses; node++) {
            if (nodeStatus[node] == NOT_VISITED) {
                depthFirstSearch(node);
            }
        }

        //'index_scheduledCourses == -1' i.e. filled the array from back to front, all the courses have been visited.
        return index_scheduledCourses == -1 ? scheduledCourses_topologicallySorted : vector<int>(0);
    }

    void depthFirstSearch(int node) {

        nodeStatus[node] = VISITED;
        vector<int> nextCourses = adjacencyList[node];

        for (auto& course : nextCourses) {
            if (nodeStatus[course] == NOT_VISITED) {
                depthFirstSearch(course);
            } else if (nodeStatus[course] == VISITED) {
                return;
            }
        }
        scheduledCourses_topologicallySorted[index_scheduledCourses--] = node;
        nodeStatus[node] = ACYCLIC;
    }

    void initialize_scheduledCourses_topologicallySorted(int numCourses) {
        for (int i = 0; i < numCourses; i++) {
            scheduledCourses_topologicallySorted.push_back(0);
        }
    }

    void initialize_nodeStatus(int numCourses) {
        for (int i = 0; i < numCourses; i++) {
            nodeStatus.push_back(NOT_VISITED);
        }
    }

    void initialize_adjacencyList(int numCourses, vector<vector<int>>&prerequisites) {

        int size = prerequisites.size();

        for (int i = 0; i < numCourses; i++) {
            vector<int> v;
            adjacencyList.push_back(v);
        }

        for (int i = 0; i < size; i++) {
            int from = prerequisites[i][1];
            int to = prerequisites[i][0];
            adjacencyList[from].push_back(to);
        }
    }
};
