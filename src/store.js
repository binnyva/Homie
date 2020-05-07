import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		blocks: []
	},

	mutations: {
		SET_BLOCKS (state, blocks) {
			Vue.set(state, 'blocks', blocks);
        },
        
        SET_BLOCK_BY_INDEX (state, index, block) {
            let blocks = state.blocks;
            blocks[index] = block;
			Vue.set(state, 'blocks', blocks);
        },
        
        ADD_BLOCK (state, block) {
            let blocks = state.blocks;
            blocks.push(block);
			Vue.set(state, 'blocks', blocks);
        },
        
        ADD_ITEM (state, { block_index, item }) {
            let blocks = state.blocks;
            blocks[block_index].items.push(item);
            Vue.set(state, 'blocks', blocks);
        },

        SET_ITEM (state, { block_index, item_index, item }) {
            let blocks = state.blocks;
            blocks[block_index].items[item_index] = item;
            Vue.set(state, 'blocks', blocks);
        }
	},

	actions: {
		SET_BLOCK_BY_INDEX (state, { index, block }) {
            state.commit('SET_BLOCK_BY_INDEX', index, block);
            state.dispatch('SAVE');
        },
        
        ADD_BLOCK (state, block) {
            state.commit('ADD_BLOCK', block);
            state.dispatch('SAVE');
        },

        ADD_ITEM (state, { block_index, item }) {
            state.commit('ADD_ITEM', { block_index, item });
            state.dispatch('SAVE');
        },
        
        SET_ITEM (state, { block_index, item_index, item }) {
            state.commit('SET_ITEM', { block_index, item_index, item });
            state.dispatch('SAVE');
        },

        SAVE (state) {
            window.localStorage.setItem("blocks", JSON.stringify(state.state.blocks))
        },

        LOAD (state) {
            let blocks = JSON.parse(window.localStorage.getItem("blocks"))
            state.commit("SET_BLOCKS", blocks)
        }
	},

	getters: {
		getAllBlocks: (state) => () => {
			return state.blocks;
        },
        
        getBlockByIndex: (state) => (index) => {
			return state.blocks[index];
		}
	}
})

export default store;