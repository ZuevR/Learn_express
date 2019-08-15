const db = require('../db');

db.query(`
    INSERT INTO users (id, name, password, email)
    VALUES ('1', 'demo', '$2b$04$a6Zwxk95nQwvJbs5gPy5TuE5Q2vqKa..OGBD3ZhLahx4TgYnkx47C', 'demo@mail.ru');

    INSERT INTO posts (title, text, author_id, date)
    VALUES ('Lorem ipsum',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus ultricies tristique nulla aliquet. Odio aenean sed adipiscing diam donec adipiscing. Scelerisque fermentum dui faucibus in ornare quam viverra. Elit sed vulputate mi sit.',
            '1',
            '2019-08-15 22:45:00.654321'),
           ('Ornate arcu',
            'Ornare arcu dui vivamus arcu felis bibendum ut. Donec pretium vulputate sapien nec. Cursus eget nunc scelerisque viverra mauris in aliquam sem.', 
            '1',
            '2019-08-14 22:45:00.654321'),
           ('Pharetra vel turpis nunc eget lorem',
            'Dolor sed viverra ipsum nunc. Aliquet porttitor lacus luctus accumsan tortor. Condimentum lacinia quis vel eros donec ac odio tempor orci. Condimentum lacinia quis vel eros donec ac odio tempor. Mauris cursus mattis molestie a iaculis at.',
            '1',
            '2019-08-13 22:45:00.654321'),
           ('Vel turpis eget ',
            'Dolor sed viverra ipsum nunc. Aliquet porttitor lacus luctus accumsan tortor. Condimentum lacinia quis vel eros donec ac odio tempor orci. Condimentum lacinia quis vel eros donec ac odio tempor. Mauris cursus mattis molestie a iaculis at.',
            '1',
            '2019-08-12 22:45:00.654321'),
           ('Eget lorem',
            'Amet cursus sit amet dictum. Eget dolor morbi non arcu risus quis varius quam quisque. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim.',
            '1',
            '2019-08-13 22:45:00.654321');`
);