
export interface Page {
  name: string,
  path: string,
  id: string,
  // 叶子节点， true 代表是页面，false 代表文件夹
  isLeaf: boolean,
  children?: Page[],
  // 是否在 tag 页面打开
  openTag?: boolean,
}