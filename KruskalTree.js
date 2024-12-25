function initializeSet(parent, rank, n) {
    for (let i = 0; i < n; i++) {
        parent[i] = i;
        rank[i] = 0;
    }
}

function findRoot(parent, component) {
    if (parent[component] === component) {
        return component;
    }
    return parent[component] = findRoot(parent, parent[component]);
}

function mergeSets(u, v, parent, rank, n) {
    u = findRoot(parent, u);
    v = findRoot(parent, v);

    if (rank[u] < rank[v]) {
        parent[u] = v;
    } else if (rank[u] > rank[v]) {
        parent[v] = u;
    } else {
        parent[v] = u;
        rank[u]++;
    }
}

function kruskalMST(n, edges) {
    edges.sort((a, b) => a[2] - b[2]);

    let parent = new Array(n);
    let rank = new Array(n);

    initializeSet(parent, rank, n);

    let minCost = 0;

    console.log("Following are the edges in the constructed MST:");
    for (let i = 0; i < n; i++) {
        let root1 = findRoot(parent, edges[i][0]);
        let root2 = findRoot(parent, edges[i][1]);
        let weight = edges[i][2];

        if (root1 !== root2) {
            mergeSets(root1, root2, parent, rank, n);
            minCost += weight;
            console.log(edges[i][0] + " -- " + edges[i][1] + " == " + weight);
        }
    }

    console.log("Minimum Cost Spanning Tree:", minCost);
}

let edges = [
    [0, 1, 10],
    [0, 2, 6],
    [0, 3, 5],
    [1, 3, 15],
    [2, 3, 4]
];

kruskalMST(5, edges);