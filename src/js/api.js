const API_END_POINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

const request = async (nodeId) => {
    try{
        const response = await fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`);
        return response.json();
    } catch(error) {
        throw new Error(error.message);
    }
}

const api = {
    fetchRoot() {
        return request();
    },

    fetchDirectory(nodeId) {
        return request(nodeId);
    }
}

export default api;