var dot = require("dot");
var reduce = require("reduce");
var value = require("value");
var submittable = require("submittable");

module.exports = function (form, loose, transformer) {
    if (typeof loose === "function") {
        transformer = loose;
        loose = false;
    }

    return reduce(form.elements, function (acc, el) {
        if ((loose && el.name) || submittable(el)) {
            var current = dot.get(acc, el.name);

            var val = value(el);
            if (transformer) val = transformer(el.name, val, el);

            if (typeof current === "undefined" ) {
                dot.set(acc, el.name, val);
            } else if (Array.isArray(current)) {
                dot.set(acc, el.name, current.concat(val));
            } else {
                dot.set(acc, el.name, [ current, val ]);
            }
        }
        return acc;
    }, {});
};
