const { graphqlHTTP } = require('express-graphql');
var { graphql } = require('graphql');
var Schema = require('../schema/blogSchema.js');
var BlogModel = require('../models/blog')
const Blog =  [{'title' : 'Blog Title', 'content' : 'Blog Content' , 'date':'Blog Date'} ];
var root = { 
  blogs: async () => {
    try {
      const blogs = await BlogModel.find();
      return blogs.map(blog => {
        return transformBlog(blog);
      });
    } catch (err) {
      throw err;
    }
  },
   createBlog : args => {
     const blog = new BlogModel({
       title: args.blogInput.title,
       content: args.blogInput.content,
       date: Date.now
     });

     return blog.save()
          .then(result => {
                  console.log('written to db')
                  console.log(result)
                  return {...result._doc };
            })
          .catch(err => {
                console.log(err)
           });
   }
  
};

// graphql(Schema, '{ blog }', root).then((response) => {
//   console.log(response);
// });

const transformBlog = blog => {
  return {
    ...blog._doc,
    _id: blog.id,
    date: blog._doc.createdDate.toISOString(),
  };
};

const graphQLRouter = graphqlHTTP({
    schema: Schema,
    rootValue:root,
    graphiql: true,
  });

  module.exports = graphQLRouter;