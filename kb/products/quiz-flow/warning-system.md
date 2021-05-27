# Mosu: Warning System

We need a way to dynamically add "rules" so that the builder can properly detect incompatibilities in the systems.

Similar to the Pipeline reporting system, we'll have fields that can be dynamically filtered on.

## Examples
The rules we contain will test for incompatibilities between :
- products and user preferences
- products and other products in the build

### Example 1
A is a 40% keyboard,
User has indicated they want a numpad

User-preference based warnings will be easy:
- Each preference will have a resolution cascade to enable custom resolution behavior.
- For example, if the user is OKAY with a 60% keyboard, they may also be okay with a 65% keyboard. If the user is okay with wireless, they'd also be okay with a keyboard that has both wireless/wired modes. Each attribute will have it's own `test()` like so:

```
const testRGB = (product) => {
	// If they require RGB, only use RGB, since it's unique
	if(userPreference.RGB){
		return product.lighting_type === RGB
	}
	
	However, if they wanted white, then RGB can handle that as well.
	
	Also, both White and RGB can turn off, effectively being a "no-lighting" keyboard.
	
	Therefore, we only need to filter the keyboards if the user requires RGB.
	
	// However, backlit and white-lit are the same.
	return true
}

```

By creating a list of functions and running our products through them, we can reduce a product list down, then run it through a `generate()` function to spit out a build, OR use the set as the "master list" and have the user walk through the configurator using those options.

Creating a list of functions to filter our sets down functionally:
```
const filters = [];
filters.append(testRGB) // the testRGB() function from earlier
filters.append((products) => return true) // a filter for size
filters.append((products) => return true) // a filter for w.e
filters.append((products) => return true) // a filter for w.e
filters.append((products) => return true) // a filter for w.e


let filteredSet = filters.reduce(() =>, [])
```

## How it will work
Each product will be flattened before comparison.

So, something like this:
```javascript
{
	name: "whatever",
	config: {
		a: "someValue",
		b: "someValue",
	}
}
```

will be flattened to just:

```
{
	name: "whatever",
	
}
```