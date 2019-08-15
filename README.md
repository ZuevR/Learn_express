<p align="center">
    <h1 align="center">Study Express Project</h1>
    <br>
</p>

A small blog site with the ability to register new users, add and view posts. And also with the ability to subscribe to existing users
Installation
------------
INSTALLATION
------------

### Install via Npm
- Make directory and clone the repository via following commands
~~~
mkdir dirname
cd dirname
~~~
~~~
git clone https://github.com/ZuevR/Learn_express.git .
~~~
- Then You should install required dependencies
~~~
npm intall
~~~

If you do not have [npm](https://www.npmjs.com/), you may install Node.js by following the instructions
at [nodejs.org](https://nodejs.org).

CONFIGURATION
-------------

### Database

Create and edit the file `db/config.js` with real data, for example:

```js
module.exports = {
  user: 'postgres',
  host: 'localhost',
  database: 'your_data_base',
  password: '****',
  port: 5432,
};
```
Initialization
-------------
### Database

Run the migration script to create the database structure
~~~
npm migrate
~~~
If you want to put some test data into your database run the following command
~~~
npm fake
~~~