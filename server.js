const {client, syncAndSeed} = require('./db')
const express = require('express');
const path = require('path')

const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));

 app.get('/', async(req, res, next) => {
     try{
         const response = await client.query('SELECT * FROM books;');
         const books = response.rows;
         res.send(`
            <html>
                <head>
                    <link rel='stylesheet' href='/public/styles.css'/>
                </head>
                <body>
                    <h1>BOOKS </h1>
                    <div id='book' >
                        ${
                            books.map(book => `
                            <a href='/books/${book.id}'>
                                <img src= ${ book.image} />
                                <p>${ book.title}</p>
                            </a>
                            `).join('')
                        }
                    </div>
                </body>
            </html>
           `);
        }
     catch(ex){
         next(ex)
     }
 });

 app.get('/books/:id', async(req, res, next) => {
    try{
        const response = await client.query(`
        SELECT books.title, books.ISBN, books.image, books.published_date, publishers.name AS publisher_name, authors.name AS author_name 
        FROM (((books 
        INNER JOIN publishers ON publishers.id = books.publisherId) 
        INNER JOIN books_authors ON books_authors.bookId = books.id)
        INNER JOIN authors ON authors.id = books_authors.authorId)
        WHERE (books.id =$1 and books.publisherId = (SELECT books.publisherId FROM books WHERE id=$1)); 
        `, [req.params.id]);
        const book = response.rows[0];
       res.send(`
            <html>
                <head>
                    <link rel='stylesheet' href='/public/styles.css'/>
                </head>
                <body>
                    <h1>Book Information </h1>
                    <h2><a href='/'>Book</a> (${book.title})</h2>
                        <img src= "${book.image}"/>
                        <div id='bookInfo'>
                        <h4>Title: <span>${book.title}</span></h4>
                        <h4>ISBN: <span>${book.isbn}<span></h4>
                        <h4>Published_date: <span>${book.published_date}</span></h4>
                        <h4>Publisher_name: <span>${book.publisher_name}</span></h4>
                        <h4>Author_name: <span>${book.author_name}</span></h4>
                        </div>
                </body>
            </html>
       `);
    }
    catch(ex){
        next(ex)
    }
});

const port = process.env.PORT || 1337;

const setUp = async() =>{
    try{
        await client.connect();
        await syncAndSeed();
        console.log('Connected to database');
        app.listen(port, ()=> console.log(`Listening on port ${port}`));
    }
    catch(ex){
        console.log(ex)
    }
}

setUp();