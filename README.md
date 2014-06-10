# form-serialize

Serializes an HTML form's inputs into a single JS object.


## Usage

```html
<form id="my-form">
    <input type="hidden" name="id" value="123456">
    <input type="text" name="username" value="dominicbarnes">
</form>
```

```js
var serialize = require("form-serialize");
var form = document.querySelector("#my-form");

serialize(form);
// => { id: "123456", username: "dominicbarnes" }
```


## API

serialize(form, [loose])

Takes the given `form` element and collects the values of all it's elements into a single JS object

By default, **only** [submittable](https://github.com/yields/submittable) fields will be included.
However, if the `loose` parameter is provided, *all* inputs will be included.

Fields can be grouped by using dots (.) to separate the name. For example:

```html
<input type="hidden" name="id" value="1">
<input type="text" name="user.name" value="dominic">
<input type="url" name="user.website" value="http://dbarnes.info/">
```

```js
{
    id: "1",
    user: {
        name: "dominic",
        website: "http://dbarnes.info/"
    }
}
```
