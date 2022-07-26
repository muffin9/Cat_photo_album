export default class Loading {
    constructor({$appElement, state}) {
        this.wrapperElement = document.createElement('div');
        this.state = state;

        this.wrapperElement.className = 'Loading Modal';
        $appElement.appendChild(this.wrapperElement);
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        this.wrapperElement.innerHTML = `
            <div class="Modal">
                <img src='./assets/nyan-cat.gif' />
            </div>
            `
        this.wrapperElement.style.display = this.state ? 'block' : 'none';
    };
}