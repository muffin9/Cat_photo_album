const API_IMAGE_END_POINT = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public'

export default class ImageView {
    constructor({$appElement, state}) {
        this.state = state;
        this.wrapperElement = document.createElement('div');
        this.wrapperElement.className = 'Modal ImageView';

        $appElement.appendChild(this.wrapperElement);
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        this.wrapperElement.innerHTML = `
            <div class="content">
                ${this.state ? `<img src="${API_IMAGE_END_POINT}${this.state}"/>` : ''}
            </div>
        `
        this.wrapperElement.style.display = this.state ? 'block' : 'none';
    }
}