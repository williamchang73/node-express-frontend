function SWSController() {};
SWSController.prototype.init = function() {};
SWSController.prototype.initWidget = function() {};
SWSController.prototype.initBinding = function() {};
SWSController.prototype.exec = function() {};
SWSController.prototype.initialize = function() {
	try {
		this.init();
		this.initWidget();
		this.initBinding();
		this.exec();
	}
	catch(x) {
		//console.error(x.message);
	}
};