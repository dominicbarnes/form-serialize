var dot = require("dot");
var reduce = require("reduce");
var value = require("value");
var submittable = require("submittable");

module.exports = function (form, loose) {
    return reduce(form.elements, function (acc, el) {
        if ((loose && el.name) || submittable(el)) {
            dot.set(acc, el.name, value(el));
        }
        return acc;
    }, {});
};
