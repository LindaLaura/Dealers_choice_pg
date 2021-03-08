TRUNCATE TABLE books, authors, publishers, books_authors;

INSERT INTO publishers(name) VALUES('Harper Festival');
INSERT INTO publishers(name) VALUES('Square Fish');
INSERT INTO publishers(name) VALUES('Abdo');
INSERT INTO publishers(name) VALUES('Bloomsbury');
INSERT INTO publishers(name) VALUES('Mondadori');

INSERT INTO books(title, ISBN, publisherId, published_date) VALUES('Butterfly Wishes', '978-1-68119-373-1',(SELECT id FROM publishers where name ='Bloomsbury'), NOW());
INSERT INTO books(title, ISBN, publisherId, published_date) VALUES('The Infinity years of Avalon James', '978-1-250-12951-2',(SELECT id FROM publishers where name ='Square Fish'), NOW());
INSERT INTO books(title, ISBN, publisherId, published_date) VALUES('La Bella e la Bestia', '88-04-36266-9',(SELECT id FROM publishers where name ='Mondadori'), NOW());
INSERT INTO books(title, ISBN, publisherId, published_date) VALUES('A Streak of Tigers', '978-1-61783-542-1',(SELECT id FROM publishers where name ='Abdo'),NOW());
INSERT INTO books(title, ISBN, publisherId, published_date) VALUES('Spotted Dolphins', '978-1-61613-415-0',(SELECT id FROM publishers where name ='Abdo'), NOW());
INSERT INTO books(title, ISBN, publisherId, published_date) VALUES('Thanksgiving Helper', '978-0-06-218774-1',(SELECT id FROM publishers where name ='Harper Festival'), NOW());
INSERT INTO books(title, ISBN, publisherId, published_date) VALUES('Crazy Hair Day', '978-0-06-218768-0',(SELECT id FROM publishers where name ='Harper Festival'), NOW());


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
INSERT INTO books_authors(bookId, authorId) VALUES((SELECT id FROM books where title ='Butterfly Wishes'), (SELECT id FROM authors where name ='Jennifer Castle'));
INSERT INTO books_authors(bookId, authorId) VALUES((SELECT id FROM books where title ='The Infinity years of Avalon James'), (SELECT id FROM authors where name ='Dana Middleton'));


-- SELECT books.title, books.ISBN, books.published_date, publishers.name AS publisher_name, authors.name AS author_name 
-- FROM (((books 
-- INNER JOIN publishers ON publishers.id = books.publisherId) 
-- INNER JOIN books_authors ON books_authors.bookId = books.id)
-- INNER JOIN authors ON authors.id = books_authors.authorId)
-- WHERE (books.id = 1 and books.publisherId = 4);
