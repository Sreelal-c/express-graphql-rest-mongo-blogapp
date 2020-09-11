const { graphqlHTTP } = require('express-graphql');
var { graphql, buildSchema } = require('graphql');

var MyGraphQLSchema = buildSchema(`
  type Query {
    blog: String
  }
`);

var root = { hello: () => 'Hello world!' };

graphql(MyGraphQLSchema, '{ blog }', root).then((response) => {
  console.log(response);
});

const graphQLRouter = graphqlHTTP({
    schema: MyGraphQLSchema,
    rootValue:root,
    graphiql: true,
  });

  module.exports = graphQLRouter;