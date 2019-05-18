import Axios from '../Axios'

export default {
	get() {
		return Axios.get('/databases')
	}
}