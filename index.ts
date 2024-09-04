
import { StringRule, IntegerRule } from "./rules";
import Validator from "./validator";

const rules = {
    "username": new StringRule(true, null, 10, new RegExp("^[a-zA-Z0-9]+$")),
    "age": new IntegerRule()
}

const data = {
    "username": "omermerma",
    "extra": "data",
    "age": 12
}

const validator = new Validator(data, rules)

try {
    console.log(validator.validate(true))
    console.log(validator.cleanedData())
}
catch (e) {
    console.log(e)
}
