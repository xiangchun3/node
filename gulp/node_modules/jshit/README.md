# jShit

🚧 WIP. The last library for dirty DOM manipulations if you can avoid that.

## Install

First:

```bash
npm install jshit --save
```

Then:

```javascript
// using CommonJS and Webpack with babel-loader
import { $, $$, dom } from 'jshit'

// loaded directly from CDN
// $/$$/dom ... will be automatically exposed as global vars.
```

## API

### Selector

```javascript
// for a single dom element
$('elmement')

// for a dom array
$$('elemements')

// remember that $/$$ is just a shorthand
// for document.querySelector/querySelectorAll
```

### Search

```javascript
// .find is a short hand for querySelectors in its parent element
// it works for `dom` function set globally by jShit
var el = dom($('element'))
el.find('li')
// return something like : DOM {el: NodeList[5]}
// which is your `li` array
```

## Loop

```javascript
// if you got a dom array using $$
// for using dom.find() method
// you can iterate over each dom element
var els = dom($('element')).find('li')
els.each(function (el, index) {
  console.log(el, index)
})
```

## License

MIT.
