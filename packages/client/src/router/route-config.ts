// import Header from '@/components/header/header.vue';
import layout from '@/components/layout/layout.vue';

// const test = () => import('@/components/material/test.vue');
// const simulator = () => import('@/components/simulator/simulator.vue');
// const componentStructure = () => import('@/components/component-structure/component-structure.vue');
// const page = () => import('@/components/page/page.vue');

export const routes = [
	{
		path: '/',
		components: {
			// Header,
			// 先加载 layout， layout 的命名视图才会被加载
			layout,
		},
		children: [
			{
				path: '',
				redirect: '/components/simulator/page/data',
			},
			{
				path: '/:materialArea/:simulatorArea/:nodeTreeArea/:editArea',
				name: 'main',
				// 给各区域组件渲染内容组件 routerContent
				components: {
					// materialArea
					// components: test,
					// components2: test,
					// components3: test,
					// // simulatorArea
					// simulator,
					// // nodeTreeArea
					// componentStructure,
					// page,
					// // editArea
					// data: test,
					// operator: test,
					// style: test,
				},
			}
		]
	},
];
