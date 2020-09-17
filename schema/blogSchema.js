var {  buildSchema } = require('graphql');

var BlogSchema = buildSchema(`
  type Blog {
    _id : ID
    title: String
    content: String
    date : String
  }

  input BlogInput {
    title: String!
    content: String!
    date : String
  }

  type RootQuery {
    blogs : [Blog!]!
  }

  type RootMutation {
    createBlog(blogInput : BlogInput) :Blog
  }

  schema {
    query : RootQuery
    mutation : RootMutation
  }
`);


module.exports = BlogSchema;
