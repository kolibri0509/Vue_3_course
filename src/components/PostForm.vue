<template>
    <div>
        <form @submit.prevent>
                <h4>Создание поста</h4>

                <my-input v-model="post.title"
                type="text"
                v-focus
                placeholder="Название"></my-input>

                <my-input v-model="post.body"
                type="text" 
                placeholder="Описание"></my-input> 

                <my-button 
                style="align-self:flex-end;margin-top: 15px" 
                @click="createPost">Опубликовать</my-button> 
            </form>       
    </div>
</template>

<script>
export default {
   data(){
    return {
        post:{
            title:'',
            body:'',
        }
    }
   },
   methods:{
    createPost(){  
               this.post.id=Date.now() 
            if(!this.post.title && !this.post.body){
                this.$emit.prevent
            }         
            else if(!this.post.title || !this.post.body){
                alert('Заполните все поля')       
            }else{
                this.$emit('create',this.post)
                this.post = {
                    title :'',
                    body : '',
                }                
            }
    }
   },
//    пример глубокого отслеживания наблюдателя
   watch:{
    post:{
        handler(newValue){
            console.log(newValue)
        },
        deep:true
    }
   }
}
</script>

<style scoped>
 form{
    display: flex;
    flex-direction: column;
   }
</style>
