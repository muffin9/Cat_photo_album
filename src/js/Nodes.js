export default class Nodes {
    constructor({$appElement, state, onClick, onBackClick}) {
        this.state = state
        this.onClick = onClick;
        this.onBackClick = onBackClick;
        this.wrapperElement = document.createElement('ul');
        this.wrapperElement.className = 'Nodes';
        $appElement.appendChild(this.wrapperElement);
    }

    setState = (nextState) => {
        this.state = nextState;
        this.render();
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
                return `<li class="Node" data-node-id=${node.id}>
                            <img src="./assets/${fileType}.png" />
                            ${node.name}
                        </li>`
            }).join("")}
        `
        this.wrapperElement.addEventListener('click', this.handleOnClick);
    }
}