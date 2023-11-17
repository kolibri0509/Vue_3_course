<template>
    <div class="app">
        <!-- <h1>{{ $store.state.isAuth ? "Пользователь авторизован" : "Авторизуйтесь,чтобы использовать сервис"}}</h1>
         <h1> {{ $store.state.likes }} </h1>
         <div class="like">
            <my-button @click="$store.commit('incrementLikes')"
            style="margin-right:15px">Лайк</my-button>
            <my-button @click="$store.commit('decrementLikes')">Дизлайк</my-button>
        </div> -->
         <h1>Страница с постами</h1>
         <my-input :model-value="searchQuery"
         @update:model-value="setSearchQuery" placeholder="Поиск..." v-focus></my-input>
         <div class="app__btns">
            <my-button @click="showDialog" style="margin:15px 0">Создать пост</my-button>
            <my-select :model-value="selectedSort"
            @update:model-value="setSelectedSort"
            :options="sortOptions" style="min-height:37px"></my-select>
         </div>
        <!-- <my-button @click="fetchPosts" style="margin-top:15px">Получить посты</my-button> -->

        <my-dialog v-model:show='dialogVisible'>
            <post-form @create="createPost"></post-form>
        </my-dialog>
        
        <post-list :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"></post-list>

        <div style="margin-top:15px" v-else>Идёт загрузка...</div>
        <!-- <div class="page__wrapper">
            <div v-for="pageNumber in totalPages" 
            :key="pageNumber" class="page"
            :class="{'current-page': page==pageNumber}"
            @click="changePage(pageNumber)">{{ pageNumber }}</div>
        </div> -->
        <!-- создание бесконечной пагинации -->
        <!-- когда пользователь долистал до конца страницы,подгружаем новые посты -->
        <div v-intersection="loadMorePosts" class="observer">

        </div>
    </div>   
</template>

<script>
import axios from 'axios'
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyButton from '@/components/UI/MyButton.vue'
import MySelect from '@/components/UI/MySelect.vue'
import MyInput from '@/components/UI/MyInput.vue'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
    data(){
        return{
          dialogVisible:false,
        }
    },
    components:{
        MyInput,
        MySelect,
        MyButton,
        PostForm,PostList
    },
    methods:{
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
        }),
        ...mapActions({
            fetchPosts: 'post/fetchPosts',
            loadMorePosts: 'post/loadMorePosts',           
        }),
        createPost(post){
          this.posts.push(post)  
          this.dialogVisible = false
        },
        // removePost(post){
        //     this.posts = this.posts.filter(p=> p.id !== post.id)
        // },
        showDialog(){
            this.dialogVisible=true
        },
        // changePage(pageNumber){
        //     this.page=pageNumber
        //     this.fetchPosts()
        // },
        
    },
    mounted(){
        this.fetchPosts();
        // console.log(this.$refs.observer)
        // const options = {
        //         rootMargin: "0px",
        //         threshold: 1.0,
        //         };
        // const callback = (entries, observer) => {
        // entries.forEach((entry) => {
        //    if(entry.isIntersecting && this.page < this.totalPages){
        //     this.loadMorePosts();
        //    }
        // });
        // };
        // let observer = new IntersectionObserver(callback, options);
        // // за каким элементом нужно следить
        // observer.observe(this.$refs.observer)
    },
    computed:{
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading:state => state.post.isPostsLoading,
            selectedSort:state => state.post.selectedSort,
            searchQuery:state => state.post.searchQuery,
            page:state => state.post.page,
            limit:state => state.post.limit,
            totalPages:state => state.post.totalPages,
            sortOptions:state => state.post.sortOptions,
            id:state => state.post.id,
        }),
        ...mapGetters({
            sortedPosts:'post/sortedPosts',
            sortedAndSearchedPosts:'post/sortedAndSearchedPosts',
            removePost:'post/removePost'
        })
    },
    // watch:{
    //     selectedSort(newValue){
    //         this.posts.sort((post1,post2)=>{
    //             return post1[newValue]?.localeCompare(post2[newValue])
    //         })
    //     }
    // }
}
</script>
    
<style>
   .app__btns{
    display: flex;
    justify-content: space-between;
    align-items: center;
   }
   .page__wrapper{
    display: flex;
    margin-top: 15px;
    justify-content: center;
   }
   .page{
    border: 1px solid black;
    padding: 5px 10px;
    margin-right: 2px;
   }
   .current-page{
    border: 2px solid teal;
    background: rgb(213, 248, 248);
   }
   .observer{
    height: 30px;
    background-color: green;
   }
   /* .like{
    display: flex;
   } */
</style>