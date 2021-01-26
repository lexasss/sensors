import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface StorageData {
    data: any;
}

interface StorageState extends StorageData {
    isConnected: boolean;
}

let url: string;

const store = new Vuex.Store({
    state: {
        data: null,
        isConnected: false,
    } as StorageState,

    mutations: {
        setData( state, data: any ) {
            state.data = data;
        },
    },

    actions: {
        connect({ commit, state }, _url: string ) {
            if (!state.isConnected) {
                url = _url;

                if (url === 'local') {
                    const storageData = localStorage.getItem( 'e-q' );
                    if (storageData) {
                        const data = JSON.parse( storageData ) as StorageData;
                        commit( 'setData', data.data );
                    }
                    state.isConnected = true;
                } else {
                    throw new Error('Storage: this URL is not supported');
                }
            }
        },
        save({ commit, state }) {
            if (url === 'local') {
                localStorage.setItem( 'sensors', JSON.stringify({
                    data: state.data,
                }));
            }
        },
    },
});

export default store;
