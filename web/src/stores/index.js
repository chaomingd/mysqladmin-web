let stores = {}

const requireFn = require.context(
  // Look for files in the current directory
  './',
  // Do not look in subdirectories
  false,
  // Only include .jpg files
  /.js$/
)

requireFn.keys().forEach(key => {
	let storeName = key.slice(2,-3);
	if(storeName === 'index') return;
	stores[storeName] = requireFn(key).default;
})

export default stores;