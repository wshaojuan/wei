<template>
<div class="phone-body">
    <!-- 第一步展示内容 -->
     <div class="feed" v-if="step === 1" v-dragscroll>
         <vuegramPost 
          v-for = "(post,index) in posts"
          :key = "index"
          :post="post">
         </vuegramPost>
     </div>
    <!-- 第二步展示内容 -->
     <div v-if="step === 2">
        <div 
        class="selected-image"
        :class="selectFilter"
        :style="{backgroundImage:'url('+image+ ')'}"
        >
        </div>
        <div class="filter-container"   v-dragscroll> 
            <FilterType
            v-for="filter in filters"
            :key="filter.name"
            :filter = "filter"
            :image = "image"
            ></FilterType>
        </div>
     </div>
  <!-- 第三步展示内容 -->
     <div v-if="step === 3" >
        <div 
            class="selected-image"
            :class="selectFilter"
            :style="{backgroundImage:'url('+image+ ')'}"
        >
        </div>
        <dir class="caption-container">
            <textarea
                placeholder="Write a caption..."
                :value="value"
                @input="inputText"
            ></textarea>
        </dir>
     </div>
</div>
</template>

<script>
import vuegramPost from "./vuegramPost"
import FilterType from "./FilterType"

export default {
    props:{
        posts:Array,
        filters:Array,
        step:Number,
        image:String,
        selectFilter:String,
        value:String
      

    },
    components:{
        vuegramPost,
        FilterType
    },
    methods:{
        inputText(event){
            this.$emit("input",event.target.value)
        }
    }
   
}
</script>

<style lang="scss" src="../styles/phone-body.scss">
</style>



