### What is it?

Small object to cache object data using localStorage

### Usage

``` javascript
/**
* Cache the object for an hour
**/
  localCache.setItem('key',{name: 'Juan', age: 33, Lorem: 'ipsum'}, 3600);

/**
* Return the object from the cache. If the key has expired, return null
**/
localCache.getItem('key');
```

### IE
For IE users you need a localStorage polyfill https://gist.github.com/remy/350433