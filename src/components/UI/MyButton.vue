<template>
  <div>
    <button class="btn">
        <!--slot- Содержимое кнопки определяет родительский компонент -->
        <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
      name:'my-button'
}
</script>

<style>
.btn{
    align-self: flex-end;
    padding: 10px 15px;
    background: none;
    border: 1px solid teal;
    color: teal;
}
</style>