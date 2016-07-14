# less-to-json-loader

Sometime there is a need to know some variables you've specified in your less files within the scope of your javascript as well.
Maintaining them both in two seperate files is a tedious task and getting them upfront via elements which are just injected into the DOM for this purpose does not seem as pure as one would wish for.

This loader comes to the rescue, assuming you are using the awesome [webpack](https://webpack.github.io/) as well.

## Usage

Because you most likely just need to load a few of those ressource files, the normal usecase is to override the default loader for your less files for this specific require call! Therefore be carefull to prepend the extra "!" to your require string!

```javascript
	var lessVars = require("!less-to-json-loader!./../../assets/styles/dimensions.less");
```

dimensions.less
```less
@test: 20rem;
@test2: @test/2;
```
Note: the loader does the math for you as expected.