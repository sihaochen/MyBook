function kset(key, value) {
	console.log("key" + key + "value" + value);
	window.localStorage.setItem(key, value);
}
function kget(key) {
	console.log(key);
	return window.localStorage.getItem(key);
}
function kremove(key) {
	window.localStorage.removeItem(key);
}
function kclear() {
	window.localStorage.clear();
}
function kupdate(key, value) {
	window.localStorage.removeItem(key);
	window.localStorage.setItem(key, value);
}

var TempCache = {
	cache : function(value) {
		localStorage.setItem("EasyWayTempCache", value);
	},
	getCache : function() {
		return localStorage.getItem("EasyWayTempCache");
	},
	setItem : function(key, value) {
		localStorage.setItem(key, value);
	},
	getItem : function(key) {
		return localStorage.getItem(key);
	},
	removeItem : function(key) {
		return localStorage.removeItem(key);
	}
};