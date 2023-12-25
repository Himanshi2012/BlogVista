const express = require('express');
const { default: mongoose } = require('mongoose');
const morgan = require('morgan');
const blogRoutes= require('./routes/blogRoutes');

const app = express();

const dbURI = 'mongodb+srv://e70681583:Himanshi@cluster0.tln2nav.mongodb.net/mon?retryWrites=true&w=majority';
mongoose.connect(dbURI).then((result)=>app.listen(5000)).catch((err)=>console.log(err));
//set view engine
app.set('view engine','ejs');
//if want to give another name to views
//app.set('views','myviews)

//app.listen(5000);

app.use((req,res,next)=>{
    console.log('new request made:');
    console.log('host: ',req.hostname);
    console.log('path: ',req.path);
    console.log('method: ', req.method);
    next();
})

app.use(morgan('dev'));

app.use(express.static('public'));

app.use(morgan('tiny'));

app.use(express.urlencoded({extended:true}));

/*app.get('/add-blog',(req,res)=>{
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    })
    blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    });
})

app.get('/single-blog',(req,res)=>{
    Blog.findById('6582fe66422321896ec054f3')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    })
})*/

/*app.get('/',(req,res)=>{
    const blogs = [
        {title:'Himanshi is girl',snippet:'Himanshi is good girl'},
        {title:'Divyansh is boy',snippet:'Divyansh is bad girl'},
        {title:'Himanshi is girl',snippet:'Himanshi is good girl'},
    ]
    res.render('index',{title:'Home',blogs});
})*/

app.get('/',(req,res)=>{
    res.redirect('/blogs');
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
})

app.get('/about-us',(req,res)=>{
    res.redirect('/about');
})

app.use('/blogs',blogRoutes);

app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{root:__dirname});
})