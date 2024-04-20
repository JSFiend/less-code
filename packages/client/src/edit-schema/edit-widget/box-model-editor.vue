<template>
  <el-form-item :label="schema.title">
    <div class="layout-style-container">
      <div class="layout-box-container">
        <div class="margin-top-div">
          <span class="next-input next-medium next-noborder"
            ><input height="100%" v-model="style.marginTop"
          /></span>
        </div>
        <div class="margin-right-div">
          <span class="next-input next-medium next-noborder"
            ><input height="100%" v-model="style.marginRight"
          /></span>
        </div>
        <div class="margin-bottom-div">
          <span class="help-txt">MARGIN</span
          ><span class="next-input next-medium next-noborder"
            ><input height="100%" v-model="style.marginBottom"
          /></span>
        </div>
        <div class="margin-left-div">
          <span class="next-input next-medium next-noborder"
            ><input height="100%" v-model="style.marginLeft"
          /></span>
        </div>
        <div class="padding-top-div">
          <span class="next-input next-medium next-noborder"
            ><input height="100%" v-model="style.paddingTop"
          /></span>
        </div>
        <div class="padding-right-div">
          <span class="next-input next-medium next-noborder"
            ><input pheight="100%" v-model="style.paddingRight"
          /></span>
        </div>
        <div class="padding-bottom-div">
          <span class="help-txt">PADDING</span
          ><span class="next-input next-medium next-noborder"
            ><input height="100%" v-model="style.paddingBottom"
          /></span>
        </div>
        <div class="padding-left-div">
          <span class="next-input next-medium next-noborder"
            ><input height="100%" v-model="style.paddingLeft"
          /></span>
        </div>
      </div>
    </div>
  </el-form-item>

  <el-form-item label="宽度" label-position="right">
    <el-input v-model="style.width" placeholder="请输入宽度"></el-input>
  </el-form-item>
  <el-form-item label="高度">
    <el-input v-model="style.height" placeholder="请输入高度"></el-input>
  </el-form-item>
</template>

<script setup lang="ts">
const arrow = ["top", "right", "bottom", "left"];
const style = defineModel<{
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  width: string;
  height: string;
}>({ required: true });

const schema = defineModel("schema");

onMounted(() => {
  // 获取 #simulator .selected 的 margin 和  padding 值
  const selectedEl = document.querySelector("#simulator .selected")!;
  const selectedStyle = window.getComputedStyle(selectedEl);

  console.log("selectedStyle", selectedStyle);
  window.selectedStyle = selectedStyle;
  // 提取margin和padding值
  style.value.marginTop = style.value.marginTop || selectedStyle.marginTop;
  style.value.marginRight = style.value.marginRight || selectedStyle.marginRight;
  style.value.marginBottom = style.value.marginBottom || selectedStyle.marginBottom;
  style.value.marginLeft = style.value.marginLeft || selectedStyle.marginLeft;
  style.value.paddingTop = style.value.paddingTop || selectedStyle.paddingTop;
  style.value.paddingRight = style.value.paddingRight || selectedStyle.paddingRight;
  style.value.paddingBottom = style.value.paddingBottom || selectedStyle.paddingBottom;
  style.value.paddingLeft = style.value.paddingLeft || selectedStyle.paddingLeft;
  style.value.width = style.value.width || selectedStyle.width;
  style.value.height = style.value.height || selectedStyle.height;
});
</script>

<style lang="scss" scoped>
.layout-style-container {
  position: relative;
  width: 100%;
  height: 150px;
}
.layout-style-container .layout-box-container {
  position: relative;
  width: 100%;
  height: 150px;

  $list: right left;
  @each $i in $list {
    .margin-#{$i}-div {
      &:hover {
        border-#{$i}: 40px solid var(--op-color-primary-light-3);
      }
    }
    .padding-#{$i}-div {
      &:hover {
        border-#{$i}: 40px solid var(--op-color-primary-light-3);
      }
    }
  }
  $list2: top bottom;
  @each $i in $list2 {
    .margin-#{$i}-div {
      &:hover {
        border-#{$i}: 20px solid var(--op-color-primary-light-3);
      }
    }
    .padding-#{$i}-div {
      &:hover {
        border-#{$i}: 20px solid var(--op-color-primary-light-3);
      }
    }
  }
  .margin-top-div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-top: 20px solid var(--op-color-primary-light-5);
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    .next-input.next-medium {
      position: absolute;
      left: 0;
      right: 0;
      top: -20px;
      height: 20px;
      background: transparent;
      width: 100%;
      input {
        text-align: center;
        line-height: 20px;
        height: 20px;
        padding: 0;
      }
    }
  }
  .margin-right-div {
    position: absolute;
    top: 5px;
    bottom: 5px;
    right: 0;
    width: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-right: 40px solid var(--op-color-primary-light-5);
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    .next-input.next-medium {
      position: absolute;
      top: 0;
      bottom: 0;
      right: -40px;
      width: 40px;
      margin: auto;
      background: transparent;
      input {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 40px;
        height: 20px;
        line-height: 20px;
        text-align: center;
      }
    }
  }
  .margin-bottom-div {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-bottom: 20px solid var(--op-color-primary-light-5);
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    .next-input.next-medium {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -20px;
      height: 20px;
      background: transparent;
      input {
        text-align: center;
        line-height: 20px;
        height: 20px;
        padding: 0;
      }
    }
  }
  .margin-left-div {
    position: absolute;
    top: 5px;
    bottom: 5px;
    left: 0;
    width: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 40px solid var(--op-color-primary-light-5);
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    .next-input.next-medium {
      position: absolute;
      top: 0;
      bottom: 0;
      left: -40px;
      width: 40px;
      margin: auto;
      background: transparent;
      input {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 40px;
        height: 20px;
        line-height: 20px;
        text-align: center;
      }
    }
  }
  .padding-top-div {
    position: absolute;
    top: 25px;
    left: 45px;
    right: 45px;
    height: 0;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-top: 20px solid var(--op-color-primary-light-5);
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    .next-input.next-medium {
      position: absolute;
      left: 0;
      right: 0;
      top: -20px;
      height: 20px;
      background: transparent;
      width: 100%;
      input {
        text-align: center;
        line-height: 20px;
        height: 20px;
        padding: 0;
      }
    }
  }
  .padding-right-div {
    position: absolute;
    top: 30px;
    bottom: 30px;
    right: 45px;
    width: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-right: 40px solid var(--op-color-primary-light-5);
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    .next-input.next-medium {
      position: absolute;
      top: 0;
      bottom: 0;
      right: -40px;
      width: 40px;
      margin: auto;
      background: transparent;
      input {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 40px;
        height: 20px;
        line-height: 20px;
        text-align: center;
      }
    }
  }
  .padding-bottom-div {
    position: absolute;
    bottom: 25px;
    left: 45px;
    right: 45px;
    height: 0;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-bottom: 20px solid var(--op-color-primary-light-5);
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    .next-input.next-medium {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -20px;
      height: 20px;
      background: transparent;
      width: 100%;
      input {
        text-align: center;
        line-height: 20px;
        height: 20px;
        padding: 0;
      }
    }
  }
  .padding-left-div {
    position: absolute;
    top: 30px;
    bottom: 30px;
    left: 45px;
    width: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 40px solid var(--op-color-primary-light-5);
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    .next-input.next-medium {
      position: absolute;
      top: 0;
      bottom: 0;
      left: -40px;
      width: 40px;
      margin: auto;
      background: transparent;
      input {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 30px;
        height: 20px;
        line-height: 20px;
        text-align: center;
      }
    }
  }
  .help-txt {
    float: left;
    margin-left: -40px;
    -webkit-transform: scale(0.75);
    -ms-transform: scale(0.75);
    transform: scale(0.75);
  }
}
.next-input {
  line-height: 20px;
}
.next-input input,
.next-input textarea {
  width: 100%;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  font-weight: 400;
  vertical-align: middle;
  background-color: transparent;
  color: #eee;
  font-size: 12px;
}
</style>
