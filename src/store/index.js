import { createStore } from "vuex";
import { postModule } from "@/store/postModule";

// ядро Vuex
export default createStore({
    modules:{
        post: postModule,
    },
    //  состояния
    state:{
        // likes:0,
        isAuth: false,
    },
    // // вычисляемые свойства, наподобии computed
    // getters:{
    //     doubleLikes(state){
    //         return state.likes * 2
    //     }
    // },
    // // функции для изменения какого-то поля в состоянии
    // mutations:{
    //     incrementLikes(state){
    //         state.likes += 1
    //     },
    //     decrementLikes(state){
    //         state.likes -= 1
    //     }
    // },
    // // функции,которые внутри себя используют мутации
    // actions:{

    // },
    // части Vuex со своими состояниями,свойствами и функциями
    
})