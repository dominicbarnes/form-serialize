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

serialize(form, [transformer])

Takes the given `form` element and collects the values of all of the
[submittable](https://github.com/yields/submittable)
elements into a single JS object

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

If multiple fields are found using the same name, then an array will be created for those values:

```html
<input type="checkbox" name="test" value="0" checked>
<input type="checkbox" name="test" value="1" checked>
<input type="checkbox" name="test" value="2" checked>
```

```js
{
    test: [ "0", "1", "2" ]
}
```

The `transformer` parameter (a `Function`) can be used to transform the field values during
serialization. (eg: parse numbers, dates, etc) This function receives 3 arguments: the `name`
of the field, the input's `value` and the `element` itself.

```html
<input type="text" name="username" value="testuser">
<input type="number" name="number" value="1.23">
<input type="date" name="date" value="2014-06-25">
<input type="text" name="empty">
```

```js
serialize(form, function (name, value, element) {
    switch (name) {
    case "number": return parseFloat(value);
    case "date":   return el.valueAsDate;
    case "empty":  return null;
    default:       return value; // catch-all
    }
});
```

**NOTE:** if using `transformer`, you *should* always return *something*, because the return
value will clobber whatever other value was retrieved.
