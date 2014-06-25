var dot = require("dot");
var reduce = require("reduce");
var value = require("value");
var submittable = require("submittable");

module.exports = function (form, loose) {
    return reduce(form.elements, function (acc, el) {
        if ((loose && el.name) || submittable(el)) {
            var current = dot.get(acc, el.name);

            if (typeof current === "undefined" ) {
                dot.set(acc, el.name, value(el));
            } else if (Array.isArray(current)) {
                dot.set(acc, el.name, current.concat(value(el)));
            } else {
                dot.set(acc, el.name, [ current, value(el) ]);
            }
        }
        return acc;
    }, {});
};
