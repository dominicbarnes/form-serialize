var assert = require("assert");
var control = require("form-element");
var domify = require("domify");
var serialize = require("form-serialize");

describe("serialize(form, [transformer])", function () {
    describe("simple", function () {
        var form = domify(require("form-serialize/test/simple.html"));
        var data = serialize(form);

        it("should serialize all the inputs", function () {
            assert.deepEqual(data, {
                username: "dominicbarnes",
                password: "123456"
            });
        });
    });

    describe("unsubmittable", function () {
        var form = domify(require("form-serialize/test/unsubmittable.html"));
        var data = serialize(form);

        it("should return an empty object (sanity check)", function () {
            assert.deepEqual(data, {});
        });

        it("should ignore disabled fields", function () {
            assert(!data.username);
        });

        it("should ignore other unsubmittable types", function () {
            assert(!data.sub);
            assert(!data.btn);
            assert(!data.img);
        });

        it("should ignore fields that are missing a name attribute", function () {
            assert(!data[""]);
        });
    });

    describe("nested fields", function () {
        var form = domify(require("form-serialize/test/nested.html"));
        var data = serialize(form);

        it("should support nesting fields when separated by dots", function () {
            assert.deepEqual(data.user, {
                id: "abc123",
                name: "Dominic Barnes"
            });
        });

        it("should not clobber other fields", function () {
            assert.equal(data.counter, 5);
        });
    });

    describe("multiple fields with same name", function () {
        var form = domify(require("form-serialize/test/multiple.html"));
        var data = serialize(form);

        it("should support multiple fields by creating an array", function () {
            assert.deepEqual(data.test, [ "0", "2", "4" ]);
        });
    });

    describe("transforming values during serialize", function () {
        var form = domify(require("form-serialize/test/transform.html"));
        var data = serialize(form, function (name, value, el) {
            switch (name) {
            case "number": return parseFloat(value);
            case "empty":  return null;
            default:       return value;
            }
        });

        it("should transform values correctly", function () {
            assert.strictEqual(data.username, "testuser");
            assert.strictEqual(data.number, 1.23);
            assert.strictEqual(data.empty, null);
        });
    });

    describe("fieldsets", function () {
        var form = domify(require("form-serialize/test/nested.html"));
        var fieldset = control(form, "user");

        it("should only serialize the controls in the fieldset", function () {
            var data = serialize(fieldset);

            assert.deepEqual(data, {
                user: {
                    id: "abc123",
                    name: "Dominic Barnes"
                }
            });
        });
    });
});
