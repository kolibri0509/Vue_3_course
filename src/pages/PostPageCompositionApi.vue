<template>
    <div class="app">
         <h1>Страница с постами</h1>
         <my-input v-model="searchQuery" 
         style="margin-bottom:15px"
         placeholder="Поиск..." v-focus></my-input>
         
         <div class="app__btns">
            <my-select v-model="selectedSort"
            :options="sortOptions" style="min-height:37px"></my-select>
         </div>

        <my-dialog v-model:show='dialogVisible'>
            <post-form></post-form>
        </my-dialog>
        
        <post-list :posts="sortedAndSearchedPosts"
        v-if="!isPostsLoading"></post-list>

        <div style="margin-top:15px" v-else>Идёт загрузка...</div>
       
    </div>   
</template>

<script>
import axios from 'axios'
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyButton from '@/components/UI/MyButton.vue'
import MySelect from '@/components/UI/MySelect.vue'
import MyInput from '@/components/UI/MyInput.vue'
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";
import {ref} from 'vue'
export default {
    components: {
        MyInput,
        MySelect,
        MyButton,
        PostForm,
        PostList
    },
    data(){
        return{
          dialogVisible:false,
          sortOptions:[
            {value:'title',name:'По заголовку'},
            {value:'body',name:'По содержимому'}
          ],
        }
    },
    setup(props){
       const {posts, totalPages, isPostsLoading} = usePosts(100)
       const {selectedSort, sortedPosts} = useSortedPosts(posts)
       const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
       return{
            posts, totalPages, isPostsLoading, selectedSort, sortedPosts,
            searchQuery, sortedAndSearchedPosts
       }
    }
    
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