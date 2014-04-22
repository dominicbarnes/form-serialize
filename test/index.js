var assert = require("assert");
var serialize = require("form-serialize");

describe("simple", function () {
    var form = document.getElementById("test-simple");
    var data = serialize(form);

    it("should serialize all the inputs", function () {
        assert.deepEqual(data, {
            username: "dominicbarnes",
            password: "123456"
        });
    });
});

describe("unsubmittable", function () {
    var form = document.getElementById("test-unsubmittable");
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
    var form = document.getElementById("test-nested");
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
