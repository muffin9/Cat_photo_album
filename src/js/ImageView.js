const API_IMAGE_END_POINT = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public'

export default class ImageView {
    constructor(appElement, filePath) {
        this.appElement = appElement;
        this.filePath = filePath;
    }

    render() {
        const modalElement = document.createElement('div');
        modalElement.classList.add('Modal');
        modalElement.classList.add(this.filePath ? 'ImageViewer' : 'Loading');
        const imagePath = this.filePath ? `${API_IMAGE_END_POINT}${this.filePath}` : "./assets/nyan-cat.gif";
        modalElement.innerHTML = `
            <div class="content">
                <img src="${imagePath}"/>
            </div>
        `
        this.appElement.appendChild(modalElement);
    }
}