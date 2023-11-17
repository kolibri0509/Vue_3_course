<template>
    <div class="app">
         <h1>Страница с постами</h1>
         <my-input v-model="searchQuery" placeholder="Поиск..." v-focus></my-input>
         <div class="app__btns">
            <my-button @click="showDialog" style="margin:15px 0">Создать пост</my-button>
            <my-select v-model="selectedSort"
            :options="sortOptions" style="min-height:37px"></my-select>
         </div>
        <my-button @click="fetchPosts" style="margin-top:15px">Получить посты</my-button>

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
        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>   
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import axios from 'axios'
export default {
    data(){
        return{
          posts:[],
          dialogVisible:false,
          isPostsLoading:false,
          selectedSort:'',
          searchQuery:'',
          page:0,
          limit:10,
          totalPages:0,
          sortOptions:[
            {value:'title',name:'По заголовку'},
            {value:'body',name:'По содержимому'}
          ],
        }
    },
    components:{
        PostForm,PostList
    },
    methods:{
        createPost(post){
          this.posts.push(post)  
          this.dialogVisible = false
        },
        removePost(post){
            this.posts = this.posts.filter(p=> p.id !== post.id)
        },
        showDialog(){
            this.dialogVisible=true
        },
        // changePage(pageNumber){
        //     this.page=pageNumber
        //     this.fetchPosts()
        // },
        async fetchPosts(){
            try{
                this.isPostsLoading=true;
            setTimeout(async()=>{
                const response= await axios.get("https://jsonplaceholder.typicode.com/posts?",{
                    params:{
                        _page:this.page,
                        _limit:this.limit,
                    }
                })
                this.totalPages=Math.ceil(response.headers['x-total-count']/this.limit)
                this.posts = response.data;
                this.isPostsLoading=false;  
            },1000)                                                     
            }catch(err){
                alert('Ошибка')
            }
        },
        async loadMorePosts(){
            try{
                this.page += 1;
                // this.isPostsLoading=true;
            // setTimeout(async()=>{
                const response= await axios.get("https://jsonplaceholder.typicode.com/posts?",{
                    params:{
                        _page:this.page,
                        _limit:this.limit,
                    }
                })
                this.totalPages=Math.ceil(response.headers['x-total-count']/this.limit)
                this.posts = [...this.posts,...response.data];
                // this.isPostsLoading=false;  
            // },1000)                                                     
            }catch(err){
                alert('Ошибка')
            }
        }
    },
    mounted(){
        this.fetchPosts()
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
        sortedPosts(){
            return [...this.posts].sort((post1,post2)=> post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchedPosts(){
            return this.sortedPosts.filter(post=>post.title.toLowerCase().includes(this.searchQuery))
        }      
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
</style>