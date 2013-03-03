/**
 * Module dependencies.
 */

var mongoose = require('mongoose'), Schema = mongoose.Schema

/**
 * Company Schema
 */

var CompanySchema = new Schema({
name		: {type : String, default : '', trim : true}, data		: { type : String, default : '', trim : true}, createdAt  : { type : Date, default :
		Date.now
	}, updatedAt  : { type : Date, default :
		Date.now
	}
});

/**
 * Validations
 */

CompanySchema.path('name').validate(function(name) {
	return name.length > 0
}, 'name cannot be blank');

CompanySchema.path('data').validate(function(data) {
	return data.length > 0
}, 'data cannot be blank');

/**
 * Pre-remove hook
 */

CompanySchema.pre('remove', function(next) {
	next();
})
/**
 * Methods
 */

CompanySchema.methods = {

}

/**
 * Statics
 */
CompanySchema.statics = {

	/**
	 * Find company by id
	 *
	 * @param {ObjectId} id
	 * @param {Function} cb
	 * @api public
	 */

	load : function(id, cb) {
		this.findOne({
			_id : id
		}).populate('id', 'data').populate('comments.user').exec(cb)
	},

	findByName : function(name, cb) {
		this.findOne({
			name : name
		}, cb);
	},

	/**
	 * search companies
	 *
	 * @param {Object} options
	 * @param {Function} cb
	 * @api public
	 */

	search : function(options, cb) {
		var criteria = options.criteria || {}

		this.find(criteria).populate('id', 'data').sort({
			'createdAt' : -1
		})// sort by date
		.exec(cb);
		/*
		 .limit(options.perPage)
		 .skip(options.perPage * options.page)
		 .exec(cb)*/
	}
}

mongoose.model('Company', CompanySchema);
