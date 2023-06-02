import { App } from 'vue';
import {
	SoldOut,
	DishDot,
	TakeawayBox,
	DataLine,
	Plus,
	Minus,
	Folder,
	Tickets,
} from '@element-plus/icons-vue';


export default {
	install(app: App) {

		app.component('SoldOut', SoldOut);
		app.component('Tickets', Tickets);
		app.component('Plus', Plus);
		app.component('Minus', Minus);
		app.component('Folder', Folder);
		app.component('DishDot', DishDot);
		app.component('TakeawayBox', TakeawayBox);
		app.component('DataLine', DataLine);
	}
};