
module.exports = {
    development: {
		db: 'mongodb://localhost/aboutus_dev',
		//db : 'mongodb://nodejitsu_williamchang:70gnad0u0900bvs8m0a12bkpcj@ds051947.mongolab.com:51947/nodejitsu_williamchang_nodejitsudb6621728064'		
    }
  	, test: {
		db: 'mongodb://localhost/aboutus_test'
    }
  	, production: {
		db: 'mongodb://localhost/aboutus'
    }
}
