var fs = require('fs');
var path = require('path');

var chai = require('chai');
var expect = chai.expect;

var loader = require('../../src/index');

describe("less to json loader import test:", function () {
	var testContent = "";
	var currentCallback;
	// <SETUP> ///////////////////////////////////////
	beforeEach(function (done) {
		//mock webpack loader this scope
		var emptFn = function () {};
		thisScope = {
			addDependency: emptFn,
			async: function () {
				return currentCallback;
			},
			query:'?path=./test/data/sub',
			addContextDependency: emptFn,
			cacheable: emptFn,
			resource: path.join(__dirname, "../data/testImport.less")
		}
		testContent = fs.readFileSync(path.join(__dirname, "../data/testImport.less"), 'utf8');
		done();
	});

	afterEach(function (done) {
		done();
	});
	// </SETUP> ///////////////////////////////////////


	// <TESTS> ///////////////////////////////////////
	it("should parse import directives properly", function (done) {
		currentCallback = function (err, res) {
			var json = eval(res);
			expect(json.testImport).to.equal('4em');
			done();
		};
		loader.call(thisScope, testContent);
	});
});