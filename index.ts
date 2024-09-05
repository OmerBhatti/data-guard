
import { StringRule, IntegerRule, FloatRule, BooleanRule, ArrayRule } from "./rules";
import Validator from "./validator";

const rules = {
    "username": new StringRule(true, null, 20, new RegExp("^[a-zA-Z0-9]+$")),
    "age": new IntegerRule(false),
    "salary": new FloatRule(true, 2),
    "active": new BooleanRule(),
    "ids": new ArrayRule(new ArrayRule(new ArrayRule(new FloatRule()))),
}

const data = {
    "username": "omer",
    "extra": "data",
    "dangerousField": "data",
    "salary": "12000.2378787878",
    "active": 0,
    "ids": [
        [1, 2, 3, 4],
        [1, 2, 3],
        [1]
    ]
}

const validator = new Validator(data, rules)
try {
    console.log(validator.validate(true))
    console.log(validator.cleanedData())
}
catch (e) {
    console.log(e)
}
