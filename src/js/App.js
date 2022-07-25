import Breadcrumb from './Breadcrumb.js';
import Nodes from './Nodes.js';
import ImageView from './ImageView.js';
import api from './api.js';
import Loading from './Loading.js';

const App = async () => {
    const appElement = document.querySelector('.App');
    let catsData = [];
    let pathsData = [];
    let clickedImageView = '';
    const loading = new Loading();

    // 맨 처음 애플리케이션 로드시
    const breadcrumb = new Breadcrumb();
    pathsData.push('root');
    breadcrumb.setState('root');
    breadcrumb.render();


    // api 초기 요청 이후 데이터 셋팅.
    loading.setState(true);
    catsData = await api.fetchRoot();
    loading.setState(false);


    const handleOnBackClick = async () => {
        pathsData.pop();

        let nodeId = pathsData[pathsData.length - 1];
        if(nodeId === 'root') {
            nodeId = '';
        }

        breadcrumb.setState();
        breadcrumb.render();

        loading.setState(true);
        catsData = await api.fetchDirectory(nodeId);
        loading.setState(false);

        nodes.setState(catsData);
        nodes.render();
    }

    const nodes = new Nodes(catsData, (node) => handleNodeOnClick(node), handleOnBackClick);
    nodes.render();

    const handleNodeOnClick = async (node) => {
        if(node.type === 'DIRECTORY') {
            pathsData.push(node.id);
            breadcrumb.setState(node.name);
            breadcrumb.render();
            // 요청한 api 기반으로 nodes 컴포넌트 다시 그려주기.
            loading.setState(true);
            catsData = await api.fetchDirectory(node.id);
            loading.setState(false);

            nodes.setState(catsData);
            nodes.render();
        } else if(node.type === 'FILE') {
            // ImageView Popup 띄우기.
            clickedImageView = new ImageView(appElement, node.filePath);
            clickedImageView.render();
        }
    }

    const handleOutSideClick = ({ target }) => {
        if(target.classList.contains('Modal')) {
            document.querySelector('.Modal').remove();
        }
        return;
    }

    appElement.addEventListener('click', handleOutSideClick);
}

export default App;