import Header from '@/components/header/header.vue';
import layout from '@/components/layout/layout.vue';

// const test = () => import('@/components/material/test.vue');
// const simulator = () => import('@/components/simulator/simulator.vue');
// const componentStructure = () => import('@/components/component-structure/component-structure.vue');
// const page = () => import('@/components/page/page.vue');
const EditData = () => import('@/components/edit-data/edit-data.vue');
const ComponentLibrary = () => import('@/components/component-library/component-library.vue');

export const routes = [
	{
		path: '/',
		components: {
			Header,
			// 先加载 layout， layout 的命名视图才会被加载
			layout,
		},
		children: [
			{
				path: '',
				redirect: '/componentLibrary/simulator/page/data',
			},
			{
				path: '/:materialArea/:simulatorArea/:nodeTreeArea/:editArea',
				name: 'main',
				// 给各区域组件渲染内容组件 routerContent
				components: {
					// materialArea
					ComponentLibrary,
					// components: test,
					// components2: test,
					// components3: test,
					// // simulatorArea
					// simulator,
					// // nodeTreeArea
					// componentStructure,
					// page,
					// // editArea
					EditData,
					// operator: test,
					// style: test,
				},
			}
		]
	},
];
