
import { opComponents, opComponents } from "op-kit";


export default {
	install(app: App) {
    console.log('opComponents', opComponents);
		// app.component('SoldOut', SoldOut);
    Object.entries(opComponents).forEach(([key, value]) => {
      console.log('key, value', key, value);
      app.component(key, value);
    });
	}
};