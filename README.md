# couchpkgs

A helper to get all packages from a npm registry. Written mainly for usage with [smart-private-npm](https://github.com/nodejitsu/smart-private-npm)

## Install

```
$ npm install couchpkgs
```

## Test

```
$ npm test
```

### Usage

```js
var couchpkgs = require('couchpkgs')
```

### API

#### getPkgs(opts, cb)

##### Params

| Name | Type | Description |
| ---- | ---- | ----------- |
| opts | Object | Options |
| cb | Function | `function(err, pkgs)` |

Opts can contain the following keys:

 - registry {String} required
 - fullUrl  {Boolean} don't modify the registry url
 - filter   {Function} filters the results (should return true/false)

**NOTE:** If `fullUrl` is true, the url should point to /<db>/_all_docs

##### Example

```js
var opts = {
    registry: 'https://npm.curapps.com'
  , filter: function(a) {
    return (~a.indexOf('pkg'))
  }
}

couchpkgs.getPkgs(opts, function(err, res) {
  if (err) throw err
  console.log(res)
  // => ['pkg-1', 'pkg-2']
})
```

### License

MIT

### Author

Evan Lucas
