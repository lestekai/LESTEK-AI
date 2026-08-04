const fs = require('fs');
let code = fs.readFileSync('firestore.rules', 'utf8');

code = code.replace(
  /function isValidProfile\(data, isCreate\) \{[\s\S]*?\}/,
  `function isValidProfile(data, isCreate) {
      return (isCreate ? data.keys().hasAll(['id', 'name', 'username', 'email', 'role', 'status']) : true) &&
             (!('id' in data) || (data.id is string && data.id.size() <= 128)) &&
             (!('name' in data) || (data.name is string && data.name.size() <= 100)) &&
             (!('username' in data) || (data.username is string && data.username.size() <= 100)) &&
             (!('email' in data) || (data.email is string && data.email.size() <= 150)) &&
             (!('role' in data) || (data.role in ['user', 'admin'])) &&
             (!('status' in data) || (data.status in ['active', 'banned']));
    }`
);

fs.writeFileSync('firestore.rules', code);
