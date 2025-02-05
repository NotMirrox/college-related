export class TreeNode<T> {
	private left?: TreeNode<T>
	private right?: TreeNode<T>

	constructor(private value: T) {}

	public insert(value: T) {
		if (value < this.value) {
			this.left?.insert(value)
			this.left ??= new TreeNode(value)
			return this
		}

		this.right?.insert(value)
		this.right ??= new TreeNode(value)
		return this
	}

	public traverseInOrder() {
		this.left?.traverseInOrder()
		console.log(this.value)
		this.right?.traverseInOrder()
	}

	public traversePreOrder() {
		console.log(this.value)
		this.left?.traversePreOrder()
		this.right?.traversePreOrder()
	}

	public traversePostOrder() {
		this.left?.traversePostOrder()
		this.right?.traversePostOrder()
		console.log(this.value)
	}

	public delete(value: T) {
		if (value < this.value) {
			this.left = this.left?.delete(value)
		} else if (value > this.value) {
			this.right = this.right?.delete(value)
		} else {
			if (!this.left) {
				return this.right
			}
			if (!this.right) {
				return this.left
			}

			const successor = this.getSuccessor()
			if (!successor) return this

			this.value = successor.value
			this.right = this.right.delete(successor.value)
		}

		return this
	}

	private getSuccessor() {
		let current = this.right
		while (current?.left) {
			current = current.left
		}
		return current
	}
}
