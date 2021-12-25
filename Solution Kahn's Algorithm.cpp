
#include<vector>
#include <queue>
using namespace std;

class Solution {
    
public:
    vector<vector<int>> adjacencyList;
    vector<int> nodesIndegree;

    //Applying Kahn's algorithm.
    vector<int> findOrder(int numCourses, vector<vector<int>>&prerequisites) {

        initialize_adjacencyList(numCourses, prerequisites);
        initialize_nodesIndegree(numCourses, prerequisites);
        queue<int> queueNodes;

        //Initialize queue with nodes that have no incoming edges(indegree = 0).
        for (int i = 0; i < numCourses; i++) {
            if (nodesIndegree[i] == 0) {
                queueNodes.push(i);
            }
        }

        if (queueNodes.empty()) {
            return vector<int>(0);
        }

        vector<int> scheduledCourses_topologicallySorted(numCourses);
        int index_scheduledCourses = 0;

        while (!queueNodes.empty()) {

            int current = queueNodes.front();

            queueNodes.pop();
            scheduledCourses_topologicallySorted[index_scheduledCourses] = current;
            index_scheduledCourses++;

            vector<int> nextCourses = adjacencyList[current];
            for (auto &course : nextCourses) {
                nodesIndegree[course]--;
                if (nodesIndegree[course] == 0) {
                    queueNodes.push(course);
                }
            }
        }
        return index_scheduledCourses == numCourses ? scheduledCourses_topologicallySorted : vector<int>(0);
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

    void initialize_nodesIndegree(int numCourses, vector<vector<int>>&prerequisites) {

        for (int i = 0; i < numCourses; i++) {
            nodesIndegree.push_back(0);
        }

        int size = prerequisites.size();
        for (int i = 0; i < size; i++) {
            int to = prerequisites[i][0];
            nodesIndegree[to]++;
        }
    }
};
