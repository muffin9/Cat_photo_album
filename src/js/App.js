import Breadcrumb from './Breadcrumb.js';
import Nodes from './Nodes.js';
import api from './api.js';

const App = async () => {
    let catsData = [];
    let pathsData = [];

    // 맨 처음 애플리케이션 로드시
    const breadcrumb = new Breadcrumb();
    pathsData.push('root');
    breadcrumb.setState('root');
    breadcrumb.render();


    // api 초기 요청 이후 데이터 셋팅.
    catsData = await api.fetchRoot();

    const handleOnBackClick = async () => {
        if(pathsData.length === 1) return;

        pathsData.pop();
        breadcrumb.setState();
        breadcrumb.render();

        catsData = await api.fetchDirectory(pathsData[pathsData.length - 1]);
        nodes.setState(catsData);
        nodes.render();
    }

    const nodes = new Nodes(catsData, (node) => handleNodeOnClick(node), handleOnBackClick);
    nodes.render();

    const handleNodeOnClick = async (node) => {
        if(node.type === 'DIRECTORY') {
            pathsData.push(node.name);
            breadcrumb.setState(node.name);
            breadcrumb.render();
            // 요청한 api 기반으로 nodes 컴포넌트 다시 그려주기.
            catsData = await api.fetchDirectory(node.id);
            nodes.setState(catsData);
            nodes.render();
        } else if(node.type === 'FILE') {
            // ImageView Popup 띄우기.
        }
    }
}

export default App;