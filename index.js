var dot = require("dot");
var reduce = require("reduce");
var value = require("value");
var submittable = require("submittable");

module.exports = function (form) {
    return reduce(form.elements, function (acc, el) {
        if (submittable(el)) dot.set(acc, el.name, value(el));
        return acc;
    }, {});
};
