const graphql = require("graphql");

const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: graphql.GraphQLString },
    firstName: { type: GraphQLString },
    age: {
      type: graphql.GraphQLInt,
    },
  },
});
