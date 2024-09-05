
import { StringRule, IntegerRule, FloatRule, BooleanRule, ArrayRule, DateRule } from "./rules";
import Validator from "./validator";

const rules = {
    "username": new StringRule(true, null, 20, new RegExp("^[a-zA-Z0-9]+$")),
    "age": new IntegerRule(false),
    "salary": new FloatRule(true, 2),
    "active": new BooleanRule(),
    "ids": new ArrayRule(new ArrayRule(new ArrayRule(new FloatRule()))),
    "startDate": new DateRule(true),
    "endDate": new DateRule(true, new Date("2021-01-01"), new Date("2021-01-30")),
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
    ],
    "startDate": 1725536105796,
    "endDate": new Date("2021-01-30"),
}

const validator = new Validator(data, rules)
try {
    console.log(validator.validate())
    console.log(validator.cleanedData())
}
catch (e) {
    console.log(e)
}
