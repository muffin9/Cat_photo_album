import Breadcrumb from './Breadcrumb.js';
import Nodes from './Nodes.js';
import ImageView from './ImageView.js';
import api from './api.js';
import Loading from './Loading.js';

const memo = {};

function App($appElement) {
    this.state = {
        isRoot: false,
        depth: [],
        loading: false,
        nodes: [],
        selectedImage: null
    }

    this.setState = (nextState) => {
        this.state = nextState
        breadcrumb.setState(this.state.depth);
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        });
        imageView.setState(this.state.selectedImage);
        loading.setState(this.state.isLoading);
    }

    const loading = new Loading({$appElement, state: this.state.loading});

    const breadcrumb = new Breadcrumb({
        $appElement,
        state: this.state.depth
    });

    const handleNodeOnClick = async (node) => {
        try {   
            if(node.type === 'DIRECTORY') {
                this.setState({
                    ...this.state,
                    isLoading: true
                });
                if(memo[node.id]) {
                    this.setState({
                        ...this.state,
                        isRoot: false,
                        depth: [...this.state.depth, node],
                        nodes: memo[node.id]
                    });
                } else {
                    const nextNodes = await api.fetchDirectory(node.id);
                    this.setState({
                        ...this.state,
                        isRoot: false,
                        depth: [...this.state.depth, node],
                        nodes: nextNodes
                    });
                    memo[node.id] = nextNodes;
                }
            } else if(node.type === 'FILE') {
                // ImageView Popup 띄우기.
                this.setState({
                    ...this.state,
                    selectedImage: node.filePath
                })
            }
        } catch(e) {
            throw new Error(e.message);
        } finally {
            this.setState({
                ...this.state,
                isLoading: false
            })
        }
    };

    const handleOnBackClick = async () => {
        try{
            const nextState = { ...this.state }
            nextState.depth.pop();

            const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id;

            this.setState({
                ...this.state,
                isLoading: true
            })
            if(prevNodeId == null) {
                this.setState({
                    ...nextState,
                    isRoot: true,
                    nodes: memo.root
                });
            } else {
                this.setState({
                    ...nextState,
                    isRoot: false,
                    nodes: memo.prevNodeId
                })
            }

        } catch(e) {
            throw new Error(e.message);
        } finally {
            this.setState({
                ...this.state,
                isLoading: false
            })
        }
    };

    const nodes = new Nodes({
        $appElement,
        state:{
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        },
        onClick : (node) => handleNodeOnClick(node),
        onBackClick: () => handleOnBackClick()
    });

    const imageView = new ImageView({
        $appElement,
        state: this.state.selectedImage
    });

    const handleOutSideClick = ({ target }) => {
        const targetElement = target.closest('.ImageView');
        if(targetElement) {
            this.setState({
                ...this.state,
                selectedImage: null
            })
        }
        return;
    };

    const init = async () => {
        try {
            $appElement.addEventListener('click', handleOutSideClick);
            // api 초기 요청 이후 데이터 셋팅.
            this.setState({
                ...this.state,
                isLoading: true
            })
            const rootNodes = await api.fetchRoot();
            this.setState({
                ...this.state,
                isRoot: true,
                nodes: rootNodes,
            })
            memo.root = rootNodes;
        } catch(e) {
            throw new Error(e.message);
        } finally {
            this.setState({
                ...this.state,
                isLoading: false
            })
        }
    };

    init();
}

export default App;