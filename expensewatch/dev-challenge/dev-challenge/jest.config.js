module.exports = {
	"transformIgnorePatterns": [
      "node_modules/(?!@ngrx|ngx-socket-io)",
      "<rootDir>/site/",
	],
	"testPathIgnorePatterns": [
			"<rootDir>/node_modules/",
			"<rootDir>/blackcatmq/",
			"<rootDir>/devserve/",
      "<rootDir>/es6/",
      "<rootDir>/site/",
	]
};