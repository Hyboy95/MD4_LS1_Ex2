const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const upload = multer();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const arrayEmployees = [];
app.get('/', (req, res) => {
    res.render('create');
});

let countID = 0;

app.post('/view', upload.none(), (req, res) => {
    let {name, department} = req.body
    if (name && department) {
        const employee = {
            id: ++countID,
            name: name,
            department: department
        };
        arrayEmployees.push(employee);
        console.log(arrayEmployees);
        res.redirect('/view');
    } else {
        res.render('error');
    }
});

app.get('/delete', (req, res) => {
    let id = req.query.id;
    if (id) {
        let index = arrayEmployees.findIndex(item => item.id === +id);
        if (index !== -1) arrayEmployees.splice(index, 1);
        res.redirect('/view');
    }
})

app.get('/view', (req, res) => {
    res.render('view', {data: arrayEmployees});
})

app.listen(PORT, 'localhost', () => console.log(`Server is running at http://localhost:${PORT}`));