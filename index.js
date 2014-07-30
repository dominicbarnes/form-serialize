// dependencies
var controls = require("form-controls");
var dot = require("dot");
var reduce = require("reduce");
var value = require("value");
var submittable = require("submittable");


/**
 * Retrieves a single JS object representing the values filled in
 * the `form` element's controls.
 *
 * @param  {HTMLElement} form      @see dominicbarnes/form-controls
 * @param  {Function} transformer  Allows intercepting and transforming values
 * @return {Object}
 */

module.exports = function (form, transformer) {
    return reduce(controls(form), function (acc, el) {
        if (!submittable(el)) return acc;

        var current = dot.get(acc, el.name);

        var val = value(el);
        if (transformer) {
            val = transformer(el.name, val, el);
        }

        if (typeof current === "undefined" ) {
            dot.set(acc, el.name, val);
        } else if (Array.isArray(current)) {
            dot.set(acc, el.name, current.concat(val));
        } else {
            dot.set(acc, el.name, [ current, val ]);
        }

        return acc;
    }, {});
};
