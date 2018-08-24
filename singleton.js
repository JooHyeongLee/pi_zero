var SingletonClass = (function() {
	var url;
	var count;
	var name;
	function SingletonClass() { }
	//setter
	this.__defineSetter__("url",function(val){this.url=val;});
	this.__defineSetter__("count",function(val){this.count=val;});
	this.__defineSetter__("name",function(val){this.count=name;});
	//getter
	this.__defineGetter__("url",function(){return url;});
	this.__defineGetter__("count",function(){return count;});
	this.__defineGetter__("name",function(){return name;});
	return {
		getInstance: function() {
			if(instance == undefined) {
			instance = new SingletonClass();
			instance.constructor = null;
			}
			return instance;
		}
	};
})();
