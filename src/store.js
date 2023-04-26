import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
        blocks: [],
        edit_mode: false
	},

	mutations: {
		SET_BLOCKS (state, { blocks }) {
			Vue.set(state, 'blocks', blocks);
        },
        
        SET_BLOCK_BY_INDEX (state, { index, block }) {
            let blocks = state.blocks;
            blocks[index] = block;
			Vue.set(state, 'blocks', blocks);
        },
        
        ADD_BLOCK (state, { block }) {
            let blocks = state.blocks;
            blocks.push(block);
			Vue.set(state, 'blocks', blocks);
        },

        DELETE_BLOCK (state, { block_index }) {
            let blocks = state.blocks;
            blocks.splice(block_index, 1);
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
        },

        DELETE_ITEM (state, { block_index, item_index}) {
            let blocks = state.blocks;
            blocks[block_index].items.splice(item_index, 1);
            Vue.set(state, 'blocks', blocks);
        },

        SET_EDIT_MODE(state, { edit_mode }) {
            Vue.set(state, 'edit_mode', edit_mode)
        }
	},

	actions: {
        SET_BLOCKS (state, { blocks }) {
            state.commit('SET_BLOCKS', { blocks });
            state.dispatch('SAVE');
        },

		SET_BLOCK_BY_INDEX (state, { index, block }) {
            state.commit('SET_BLOCK_BY_INDEX', { index, block });
            state.dispatch('SAVE');
        },
        
        ADD_BLOCK (state, { block }) {
            state.commit('ADD_BLOCK', { block });
            state.dispatch('SAVE');
        },

        DELETE_BLOCK (state, { block_index }) {
            state.commit('DELETE_BLOCK', { block_index });
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

        DELETE_ITEM (state, { block_index, item_index}) {
            state.commit('DELETE_ITEM', { block_index, item_index });
            state.dispatch('SAVE');
        },

        SET_EDIT_MODE (state, { edit_mode }) {
            state.commit('SET_EDIT_MODE', { edit_mode })
        },

        SAVE (state) {
            window.localStorage.setItem("blocks", JSON.stringify(state.state.blocks))
        },

        LOAD (state) {
            let blocks = JSON.parse(window.localStorage.getItem("blocks"))
            state.commit("SET_BLOCKS", { blocks })
        }
	},

	getters: {
		getAllBlocks: (state) => () => {
			return state.blocks;
        },
        
        getBlockByIndex: (state) => (index) => {
			return state.blocks[index];
        },
        
        getEditMode: (state) => () => {
            return state.edit_mode
        }
	}
})

export default store;