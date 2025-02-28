export class Node<T> {
	public adjacent: Node<T>[] = []

	constructor(public data: T) {}

	public addAdjacent(node: Node<T>) {
		this.adjacent.push(node)
	}

	public removeAdjacent(data: T) {
		const index = this.adjacent.findIndex((node) => node.data === data)
		if (index === -1) return
		return this.adjacent.splice(index, 1)[0]
	}
}

export class Graph<T> {
	public nodes = new Map<T, Node<T>>()

	public addNode(data: T) {
		let node = this.nodes.get(data)
		if (node) return node

		node = new Node(data)
		this.nodes.set(data, node)
		return node
	}

	public removeNode(data: T) {
		const toRemove = this.nodes.get(data)
		if (!toRemove) return

		for (const node of this.nodes.values()) {
			node.removeAdjacent(toRemove.data)
		}
		this.nodes.delete(data)

		return toRemove
	}

	public addEdge(source: T, destination: T) {
		const sourceNode = this.addNode(source)
		const destinationNode = this.addNode(destination)
		sourceNode.addAdjacent(destinationNode)
	}

	public removeEdge(source: T, destination: T) {
		const sourceNode = this.nodes.get(source)
		if (!sourceNode) return
		sourceNode.removeAdjacent(destination)
	}

	public findPath(start: Node<T>, end: Node<T>) {
		const visited = new Set<Node<T>>()
		const path: T[] = []

		function visit(node: Node<T>) {
			if (node === end) {
				path.push(node.data)
				return true
			}

			visited.add(node)
			for (const adjacent of node.adjacent) {
				if (visited.has(adjacent) || !visit(adjacent)) continue
				path.push(node.data)
				return true
			}

			return false
		}

		return visit(start) ? path.reverse() : []
	}

	public topologicalSort() {
		const visited = new Set<Node<T>>()
		const stack: T[] = []

		function visit(node: Node<T>) {
			visited.add(node)
			for (const adjacent of node.adjacent) {
				if (!visited.has(adjacent)) visit(adjacent)
			}
			stack.push(node.data)
		}

		for (const node of this.nodes.values()) {
			if (!visited.has(node)) visit(node)
		}

		return stack.reverse()
	}
}
