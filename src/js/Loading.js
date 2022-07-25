export default class Loading {
    constructor() {
        this.wrapperElement = document.querySelector('.loading');
        this.state = false;
    }

    setState(state) {
        this.state = state;
        this.render();
    }

    render() {
        if(this.state) {
            this.wrapperElement.innerHTML = `
            <div class="Modal">
                <img src='./assets/nyan-cat.gif' />
            </div>
            `
        } else {
            this.wrapperElement.innerHTML = '';
        }
    };
}