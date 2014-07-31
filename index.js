// dependencies
var controls = require("form-controls");
var reduce = require("reduce");
var square = require("square");
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
        var val = transformer ? transformer.call(form, el.name, value(el), el) : value(el);
        return square.set(acc, el.name, val);
    }, {});
};
