var fs = require('fs');
var path = require('path');

var chai = require('chai');
var expect = chai.expect;

var loader = require('../../src/index');

describe("less to json loader test:", function () {
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
			addContextDependency: emptFn,
			cacheable: emptFn,
			resource: path.join(__dirname, "../data/test.less")
		}
		testContent = fs.readFileSync(path.join(__dirname, "../data/test.less"), 'utf8');
		done();
	});

	afterEach(function (done) {
		done();
	});
	// </SETUP> ///////////////////////////////////////


	// <TESTS> ///////////////////////////////////////
	it("should parse the less file", function (done) {
		currentCallback = function (res) {
			var json = eval(res);
			expect(json.test).to.equal('20rem');
			expect(json.test2).to.equal('10rem');
			done();
		};
		loader.call(thisScope, testContent);
	});
});