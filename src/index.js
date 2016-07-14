/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Robert Krüger
*/
var path = require("path");
var fs = require("fs");
var _ = require("lodash");
var less = require("less");

var loaderUtils = require('loader-utils');

module.exports = function (source) {
	var query = loaderUtils.parseQuery(this.query);
	var camelCase = query.camelCase || false;
	var prefix = query.ignoreWithPrefix || null;

	var callback = this.async();
	this.cacheable && this.cacheable();

	var str = source,
		lessVars = {},
		config = {};

	if (query.sourceMap) {
		config.sourceMap = {
			outputSourceFiles: true
		};
	}
	less.parse(str, config, function (err, root, imports, options) {
		if (err) return callback(err);
		try {
			var evalEnv = new less.contexts.Eval(options);
			var evaldRoot = root.eval(evalEnv);
			var ruleset = evaldRoot.rules;
			ruleset.forEach(function (rule) {
				if (rule.variable === true) {
					var name;
					if (camelCase === false) {
						name = rule.name.substr(1);
					} else {
						name = convertToCamelcase(rule.name.substr(1));
					}

					if (!prefix || name.substr(0, prefix.length) !== prefix) {
						var value = rule.value;
						lessVars[name] = value.toCSS(options);
					}
				}
			});
		} catch (err) {
			return callback(err);
		}
		callback(lessVars);
	});
};

function convertToCamelcase(input) {
	return input.toLowerCase().replace(/-(.)/g, function (match, group) {
		return group.toUpperCase();
	});
};