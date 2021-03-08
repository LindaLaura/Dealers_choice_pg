const pg = require('pg');



const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_pg_db');

const syncAndSeed = async() =>{
    const SQL =  `
        DROP TABLE IF EXISTS books_authors;
        DROP TABLE IF EXISTS authors;
        DROP TABLE IF EXISTS books;
        DROP TABLE IF EXISTS publishers;

        CREATE TABLE publishers(
            id SERIAL PRIMARY KEY,
            name  varchar(255) NOT NULL
        );

        CREATE TABLE books(
            id SERIAL PRIMARY KEY,
            title  varchar(255) NOT NULL,
            ISBN  varchar(255) NOT NULL,
            publisherId INTEGER REFERENCES publishers(id) NOT NULL,
            published_date timestamp DEFAULT now(),
            image TEXT DEFAULT NULL
        );

        CREATE TABLE authors(
            id SERIAL PRIMARY KEY,
            name  varchar(255) NOT NULL
        );

        CREATE TABLE books_authors(
            bookId INTEGER REFERENCES books(id) NOT NULL,
            authorId INTEGER REFERENCES authors(id) NOT NULL
        );

        INSERT INTO publishers(name) VALUES('Harper Festival');
        INSERT INTO publishers(name) VALUES('Square Fish');
        INSERT INTO publishers(name) VALUES('Abdo');
        INSERT INTO publishers(name) VALUES('Bloomsbury');
        INSERT INTO publishers(name) VALUES('Mondadori');

        INSERT INTO books(title, ISBN, publisherId, published_date, image) VALUES('Butterfly Wishes: Tiger streak of Tale', '978-1-68119-373-1',(SELECT id FROM publishers where name ='Bloomsbury'), '12-26-2017', 'https://media.bloomsbury.com/rep/bj/9781681194929.jpg');
        INSERT INTO books(title, ISBN, publisherId, published_date, image) VALUES('The Infinity years of Avalon James', '978-1-250-12951-2',(SELECT id FROM publishers where name ='Square Fish'), '10-11-2016' , 'https://m.media-amazon.com/images/I/51IpMOOSO0L._SL500_.jpg');
        INSERT INTO books(title, ISBN, publisherId, published_date, image) VALUES('La Bella e la Bestia', '88-04-36266-9',(SELECT id FROM publishers where name ='Mondadori'), '01-01-2002', 'https://m.media-amazon.com/images/I/81zDvzLLHhL._SS500_.jpg');
        INSERT INTO books(title, ISBN, publisherId, published_date, image) VALUES('A Streak of Tigers', '978-1-61783-542-1',(SELECT id FROM publishers where name ='Abdo'),'08-01-2012', 'https://images-na.ssl-images-amazon.com/images/I/61aNQluzx9L.jpg');
        INSERT INTO books(title, ISBN, publisherId, published_date, image) VALUES('Spotted Dolphins', '978-1-61613-415-0',(SELECT id FROM publishers where name ='Abdo'), '09-01-2010', 'https://images-na.ssl-images-amazon.com/images/I/51FcgHbhzwL.jpg');
        INSERT INTO books(title, ISBN, publisherId, published_date, image) VALUES('Thanksgiving Helper', '978-0-06-218774-1',(SELECT id FROM publishers where name ='Harper Festival'), '08-01-2014', 'https://s3-us-west-2.amazonaws.com/tabs.web.media/b/c/bcgr/bcgr-square-400.jpg');
        INSERT INTO books(title, ISBN, publisherId, published_date, image) VALUES('Crazy Hair Day', '978-0-06-218768-0',(SELECT id FROM publishers where name ='Harper Festival'), '05-13-2014', 'https://images-na.ssl-images-amazon.com/images/I/51eptMSo45L.jpg');


        INSERT INTO authors(name) VALUES('Alex Kuskowski');
        INSERT INTO authors(name) VALUES('Dana Middleton');
        INSERT INTO authors(name) VALUES('Jennifer Castle');
        INSERT INTO authors(name) VALUES('Claudia Conti');
        INSERT INTO authors(name) VALUES('Megan M. Gunderson');
        INSERT INTO authors(name) VALUES('Victoria Kann');


        INSERT INTO books_authors(bookId, authorId) VALUES((SELECT id FROM books where title ='Crazy Hair Day'), (SELECT id FROM authors where name ='Victoria Kann'));
        INSERT INTO books_authors(bookId, authorId) VALUES((SELECT id FROM books where title ='Thanksgiving Helper'), (SELECT id FROM authors where name ='Victoria Kann'));
        INSERT INTO books_authors(bookId, authorId) VALUES((SELECT id FROM books where title ='Spotted Dolphins'), (SELECT id FROM authors where name ='Megan M. Gunderson'));
        INSERT INTO books_authors(bookId, authorId) VALUES((SELECT id FROM books where title ='La Bella e la Bestia'), (SELECT id FROM authors where name ='Claudia Conti'));
        INSERT INTO books_authors(bookId, authorId) VALUES((SELECT id FROM books where title ='A Streak of Tigers'), (SELECT id FROM authors where name ='Alex Kuskowski'));
        INSERT INTO books_authors(bookId, authorId) VALUES((SELECT id FROM books where title ='Butterfly Wishes: Tiger streak of Tale'), (SELECT id FROM authors where name ='Jennifer Castle'));
        INSERT INTO books_authors(bookId, authorId) VALUES((SELECT id FROM books where title ='The Infinity years of Avalon James'), (SELECT id FROM authors where name ='Dana Middleton'));
    `;
    await client.query(SQL);
};

module.exports = {
    client,
    syncAndSeed
}