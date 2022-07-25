export default class Nodes {
    constructor(isRoot, nodes, onClick, onBackClick) {
        this.wrapperElement = document.querySelector('.Nodes');
        this.state = {
            nodes: nodes,
            isRoot: isRoot
        };
        this.onClick = onClick;
        this.onBackClick = onBackClick;
    }

    setState = (state) => {
        this.state = state;
    }

    handleOnClick = ({ target }) => {
        const nodeElement = target.closest('.Node');

        if(nodeElement) {
            const { nodeId } = nodeElement.dataset;

            if(!nodeId) {
                this.onBackClick();
                return;
            }

            const clickedNode = this.state.nodes.find(node => node.id === nodeId);

            if(clickedNode) this.onClick(clickedNode);
        }
    }

    render() {
        // 뒤로가기 버튼 처리
        this.wrapperElement.innerHTML = `
            ${!this.state.isRoot ? `<div class="Node">
                <img src="./assets/prev.png" />
            </div>` : ''}
            ${this.state.nodes.map((node) => {
                const fileType = node.type === 'DIRECTORY' ? 'directory' : 'file';
                return `<div class="Node" data-node-id=${node.id}>
                            <img src="./assets/${fileType}.png" />
                            ${node.name}
                        </div>`
            }).join("")}
        `
        this.wrapperElement.addEventListener('click', this.handleOnClick);
    }
}