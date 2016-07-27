# less-to-json-loader

Sometime there is a need to know some variables you've specified in your less files within the scope of your javascript as well.
Maintaining them both in two seperate files is a tedious task and getting them upfront via elements which are just injected into the DOM for this purpose does not seem as pure as one would wish for.

This loader comes to the rescue, assuming you are using the awesome [webpack](https://webpack.github.io/) as well.

## Usage

Install
```javascript
npm install less-to-json-loader
```

Because you most likely just need to load a few of those ressource files, the normal usecase is to override the default loader for your less files for this specific require call! Therefore be carefull to prepend the extra "!" to your require string!

dimensions.less
```css
@test: 20rem;
@test2: @test/2;
```

usage in the application
```javascript
var lessVars = require("!less-to-json-loader!./../../assets/styles/dimensions.less");

console.log(lessVars.test); //>20rem
console.log(lessVars.test2); //>10rem
```

Note: the loader does the math for you as expected.
