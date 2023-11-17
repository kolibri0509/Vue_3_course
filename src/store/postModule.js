import axios from 'axios'
export const postModule={
    state:()=>({
            posts:[],
            isPostsLoading:false,
            selectedSort:'',
            searchQuery:'',
            page:0,
            id:'',
            limit:10,
            totalPages:0,
            sortOptions:[
              {value:'title',name:'По заголовку'},
              {value:'body',name:'По содержимому'}
            ],
    }),
    getters:{
        sortedPosts(state){
            return [...state.posts].sort((post1,post2)=> post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters){
            return getters.sortedPosts.filter(post=>post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        },
           // !!!
        removePost(state, id) {
            return state.posts = state.posts.filter(p=> p.id !== id)
          },
        //   !!!
    },
    mutations:{
        setPosts(state, posts){
            state.posts = posts;
        },
        setPostsLoading(state, bool){
            state.isPostsLoading = bool;
        },
        setSelectedSort(state, selectedSort){
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state, searchQuery){
            state.searchQuery = searchQuery;
        },
        setPage(state, page){
            state.page = page;
        },
        setTotalPages(state, totalPages){
            state.totalPages = totalPages;
        },
        setId(state,id){
            state.id = id;
        }
    },
    actions:{
        async fetchPosts({state, commit}){
            try{
                commit('setPostsLoading', true);
            setTimeout(async()=>{
                const response= await axios.get("https://jsonplaceholder.typicode.com/posts?",{
                    params:{
                        _page:state.page,
                        _limit:state.limit,
                    }
                })
                commit('setTotalPages',Math.ceil(response.headers['x-total-count']/state.limit))
                commit('setPosts', response.data)
            },1000)                                                     
            }catch(err){
                console.log(err)
            }finally{
                commit('setPostsLoading', false);
            }
        },
        async loadMorePosts({state, commit}){
            try{
                commit('setPage', state.page + 1)   ;
                // this.isPostsLoading=true;
            // setTimeout(async()=>{
                const response= await axios.get("https://jsonplaceholder.typicode.com/posts?",{
                    params:{
                        _page:state.page,
                        _limit:state.limit,
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count']/state.limit))
                commit('setPosts',[...state.posts,...response.data]);
                // this.isPostsLoading=false;  
            // },1000)                                                     
            }catch(err){
                console.log(err)
            }
        },
        // !!!
        // async deletePostDb({state,commit}) {
        //     try{
        //         const post = await axios.get("http://jsonplaceholder.typicode.com/posts?", {
        //             params:{
        //                 _page:state.page,
        //                 _limit:state.limit,
        //             }
        //           })
        //           commit('deletePost', state.id)
        //     }catch(err){
        //         console.log(err)
        //     }
        //   }
    },
    namespaced:true,
}