<p align="center"><img width="250" alt="image" src="https://github.com/user-attachments/assets/b67151e7-43f9-464c-88d7-c52304e0f46f"></p>
<p align="center"><b>Data Guard</b> is a TypeScript library for validating and sanitizing data, inspired by Django Rest Serializer. It helps ensure the integrity of your API data by applying validation rules and cleaning unnecessary fields. </p>

### Features
 - **Flexible Validation Rules:** Validate various data types including strings, integers, floats, booleans, arrays, and dates.
 - **Nested Rules:** Apply validation rules to nested structures and arrays.
 - **Customizable:** Define your own validation rules and customize the behavior.
 - **TypeScript Support:** Strong typing ensures better development experience and fewer runtime errors.

### Installation
You can install Data Guard via npm:
```bash
npm install @omerbhatti/data-guard
```

### Usage
Here's a basic example of how to use Data Guard:

1. Define Your Rules
Create a set of validation rules for your API data:
```typescript
import {
    StringRule, IntegerRule, FloatRule, BooleanRule, ArrayRule, DateRule, JSONRule
} from '@omerbhatti/data-guard';

const USER_API_RULES = {
  username: new StringRule(true, null, 20, new RegExp('^[a-zA-Z0-9]+$')),
  age: new IntegerRule(false),
  salary: new FloatRule(true, 2),
  active: new BooleanRule(),
  ids: new ArrayRule(new ArrayRule(new ArrayRule(new FloatRule()))),
  startDate: new DateRule(true),
  endDate: new DateRule(true, new Date('2021-01-01'), new Date('2021-01-30')),
  status: new StringRule(true, null, null, null, ['draft', 'pending', 'in progress']),
  dict: new JSONRule(true, {
    email: new StringRule(false, null, 20, new RegExp('^[a-z]+@(gmail|xyz).com$')),
    age: new IntegerRule(false),
  }),
  data: new JSONRule(false, {}),
};
```
2. Create a Validator Instance
```typescript
import Validator from '@omerbhatti/data-guard';

const validator = new Validator(USER_API_RULES, {
  username: 'test_user',
  extra: 'data: [1, 2, 3, 4]',
  dangerousField: 'Virus Code Here !!!',
  salary: '12000.2378787878',
  active: true,
  ids: [[1, 2, 3, 4], [1, 2, 3], [1]],
  startDate: '2024-09-05',
  endDate: new Date('2021-01-30'),
  status: 'draft',
  dict: {
    email: 'abc@gmail.com',
    age: 23,
  },
});
```
3. Validate Data
```typescript
try {
  console.log("errors: " + validator.validate(true));  // Outputs validation results
  console.log("cleanedData: " + validator.cleanedData());   // Outputs cleaned data
} catch (e) {
  console.error(e);  // Handle validation errors
}
```

### Output
```bash
errors: {}
cleanedData: {
  username: 'testuser',
  salary: 12000.24,
  active: true,
  ids: [ [ 1, 2, 3, 4 ], [ 1, 2, 3 ], [ 1 ] ],
  startDate: 2024-09-05T00:00:00.000Z,
  endDate: 2021-01-30T00:00:00.000Z,
  status: 'draft',
  dict: { email: 'abc@gmail.com', age: 23 }
}
```

### API
#### Validation Rules
`StringRule:` Validates strings with optional length and regex constraints.<br/>
`IntegerRule:` Validates integers.<br/>
`FloatRule:` Validates floating-point numbers with optional precision.<br/>
`BooleanRule:` Validates boolean values.<br/>
`ArrayRule:` Validates arrays with optional nested rules.<br/>
`DateRule:` Validates date values with optional min and max constraints.<br/>
`JSONRule:` Validates JSON objects with optional schema validation.<br/>

### Contact
For any inquiries, please reach out to omerbhatti34@gmail.com
