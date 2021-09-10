const state = {
    currentPath: '',//用户当前所在的存储路径
    fileList: []
}

const mutation = {
    setCurrentPath(state, currentPath) {
        state.currentPath = currentPath;
    }
}

const actions = {
    setCurrentPath(commit, currentPath) {
        commit("setCurrentPath", currentPath)
    }
}

export default {
    namespaced: true,
    state,
    mutation,
    actions
}