import { StringRule, IntegerRule, FloatRule, BooleanRule, ArrayRule, DateRule, JSONRule } from './rules/index';
import Validator from './index';

const API_RULES = {
	username: new StringRule(true, null, 20, new RegExp('^[a-zA-Z0-9]+$')),
	age: new IntegerRule(false),
	salary: new FloatRule(true, 2),
	active: new BooleanRule(),
	ids: new ArrayRule(new ArrayRule(new ArrayRule(new FloatRule()))),
	startDate: new DateRule(true),
	endDate: new DateRule(true, new Date('2021-01-01'), new Date('2021-01-30')),
	status: new StringRule(true, null, null, null, ['abc', '123', '2323']),
	dict: new JSONRule(true, {
		email: new StringRule(false, null, 20, new RegExp('^[a-z]+@(gmail|xyz).com$')),
		age: new IntegerRule(false),
	}),
	data: new JSONRule(false, {}),
};

const validator = new Validator(API_RULES, {
	username: 'testuser',
	extra: 'data: [1, 2, 3, 4]',  // this field will be removed
	dangerousField: 'Virus Code Here !!!',  // this field will be removed
	salary: '12000.2378787878',
	active: true,
	ids: [[1, 2, 3, 4], [1, 2, 3], [1]],
	startDate: 1725536105796,
	endDate: new Date('2021-01-30'),
	status: 'abc',
	dict: {
		email: 'abc@gmail.com',
		age: 23,
	},
});

try {
	console.log(validator.validate(true));
	console.log(validator.cleanedData());
} catch (e) {
	console.log(e);
}
