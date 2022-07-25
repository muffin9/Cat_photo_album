export default class Breadcrumb {
    constructor() {
        this.wrapperElement = document.querySelector('.Breadcrumb');
        this.state = [];
    }

    setState(path) {
        if(!path) {
            this.state.pop();
        } else {
            this.state.push(path);
        }
    }

    render() {
        this.wrapperElement.innerHTML = `
            ${this.state.map((path) => {
                return `<div>${path}</div>`
            }).join("")}
        `
    }
}