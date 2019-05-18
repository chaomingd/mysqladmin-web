import { observable,action } from 'mobx';
import database from '../models/database';

class DatabaseStore {
	@observable databases = [];
	@action.bound
	getDatabases() {
		return database.get()
		.then(action(({status,data}) => {
			if(status !== 200) return;
			this.databases = data.data;
		}))
	}
}

export default new DatabaseStore();