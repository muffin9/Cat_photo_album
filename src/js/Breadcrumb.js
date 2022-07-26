export default class Breadcrumb {
    constructor({$appElement, state}) {
        this.state = state;
        this.wrapperElement = document.createElement('nav');
        this.wrapperElement.className = 'Breadcrumb';
        $appElement.appendChild(this.wrapperElement);
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        this.wrapperElement.innerHTML = `
        <div>root</div>
            ${this.state.map((node) => {
                return `<div>${node.name}</div>`
            }).join("")}
        `
    }
}