import Breadcrumb from './Breadcrumb.js';
import Nodes from './Nodes.js';
import ImageView from './ImageView.js';
import api from './api.js';
import Loading from './Loading.js';

const App = async () => {
    const appElement = document.querySelector('.App');
    const memo = {};
    const pathsData = [];
    const loading = new Loading();
    let catsData = [];

    // 맨 처음 애플리케이션 로드시
    const breadcrumb = new Breadcrumb();
    pathsData.push('root');
    breadcrumb.setState('root');
    breadcrumb.render();


    // api 초기 요청 이후 데이터 셋팅.
    loading.setState(true);
    catsData = await api.fetchRoot();
    memo['root'] = catsData;
    loading.setState(false);


    const handleOnBackClick = async () => {
        pathsData.pop();

        let nodeId = pathsData[pathsData.length - 1];

        breadcrumb.setState();
        breadcrumb.render();

        loading.setState(true);
        if(memo[nodeId]) {
            catsData = memo[nodeId];
        } else {
            catsData = await api.fetchDirectory(nodeId);
            memo[nodeId] = catsData;
        }
        loading.setState(false);

        // isRoot 처리
        nodes.setState({nodes: catsData, isRoot: nodeId === 'root' ? true: false});
        nodes.render();
    }

    const nodes = new Nodes(true, catsData, (node) => handleNodeOnClick(node), handleOnBackClick);
    nodes.render();

    const handleNodeOnClick = async (node) => {
        if(node.type === 'DIRECTORY') {
            const nodeId = node.id;
            if(!nodeId) return;

            pathsData.push(nodeId);
            breadcrumb.setState(node.name);
            breadcrumb.render();
            // 요청한 api 기반으로 nodes 컴포넌트 다시 그려주기.
            loading.setState(true);
            console.log(memo);
            if(memo[nodeId]) {
                catsData = memo[nodeId];
            } else {
                catsData = await api.fetchDirectory(node.id);
                memo[nodeId] = catsData;
            }
            loading.setState(false);

            nodes.setState({nodes: catsData, isRoot: false});
            nodes.render();
        } else if(node.type === 'FILE') {
            // ImageView Popup 띄우기.
            const clickedImageView = new ImageView(appElement, node.filePath);
            clickedImageView.render();
        }
    }

    const handleOutSideClick = ({ target }) => {
        const targetElement = target.closest('.ImageViewer');
        if(targetElement) {
            document.querySelector('.ImageViewer').remove();
        }
        return;
    }

    appElement.addEventListener('click', handleOutSideClick);
}

export default App;