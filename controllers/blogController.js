const Blog = require('../modals/blogs');
const path = require('path');
const all_blogs = (req,res) =>{
    Blog.find().sort({ createdAt: -1 })
    .then((result)=>{
        res.render('index',{title:'All Blogs',blogs:result})
    })
    .catch((err)=>{
        console.log(err);
    })
}

const blog_details = (req,res) =>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result=>{
        res.render('details',{blog:result,title:'Blog Details'})
    })
    .catch(err=>{
        res.status(404).sendFile(path.join(__dirname, '../views/404.html'));
    })
}

const blog_create_get = (req,res) =>{
    res.render('create',{title:'Create a new Blog'});
}

const blog_create_post = (req,res) =>{
    const blog = new Blog(req.body);

    blog.save()
    .then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    })
}

const blog_delete = (req,res) =>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.redirect('/blogs');
    })
}

module.exports = {
    all_blogs,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}