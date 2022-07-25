export default class Nodes {
    constructor(nodes, onClick, onBackClick) {
        this.wrapperElement = document.querySelector('.Nodes');
        this.state = nodes;
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

            const clickedNode = this.state.find(node => node.id === nodeId);

            if(clickedNode) this.onClick(clickedNode);
        }
    }

    render() {
        this.wrapperElement.innerHTML = `
            <div class="Node">
                <img src="./assets/prev.png" />
            </div>
            ${this.state.map((node) => {
                const fileType = node.type === 'DIRECTORY' ? 'directory' : 'file';
                return `<div class="Node" data-node-id=${node.id}>
                            <img src="./assets/${fileType}.png"} />
                            ${node.name}
                        </div>`
            }).join("")}
        `
        this.wrapperElement.addEventListener('click', this.handleOnClick);
    }
}