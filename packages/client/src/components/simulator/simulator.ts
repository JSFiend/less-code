

/**
 * 改变选中元素的样式
 */
export function changeSelectedWrapperStyle() {
  nextTick(() => {
    const targetElement = document.querySelector("#simulator .selected");
    const selectWrapper = document.querySelector("#simulator #select-wrapper")! as HTMLElement;


    if (!targetElement) {
      selectWrapper.style.display = "none";
      return;
    }


    // 获取目标元素的位置和大小信息
    const targetRect = targetElement.getBoundingClientRect();

    // 获取指定的父级元素的位置和大小信息
    // 假设你想要相对于 ID 为 'specificParent' 的元素
    const parentElement = document.getElementById("simulator");
    if (!parentElement) return; // 如果没有找到父级元素，直接返回
    const parentRect = parentElement.getBoundingClientRect();

    // 计算相对于父级元素的 top 和 left
    const top = targetRect.top - parentRect.top;
    const left = targetRect.left - parentRect.left;

    // 从 targetRect 中直接获取 width 和 height
    const width = targetRect.width;
    const height = targetRect.height;

    selectWrapper.style = `
      position: absolute;
      top: ${top}px;
      left: ${left}px;
      width: ${width}px;
      height: ${height}px;
      pointerEvents: "none";
    `;
  });
}