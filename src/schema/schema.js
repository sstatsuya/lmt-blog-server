const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    username: String
    password: String
    token: String
    level: Int
    avatar: String
  }
  type Type {
    _id: ID
    name: String
    recipes: [Recipe]
  }

  type Ingredient {
    name: String
    amount: String
  }

  input IngredientInput {
    name: String
    amount: String
  }

  type Recipe {
    _id: ID
    name: String
    intro: String
    time: Int
    number: Int
    level: String
    tutorial: [String]
    ingredients: [Ingredient]
    types: [String]
    typeList: [Type]
    image: [String]
  }

  type Query {
    #User
    login(username: String, password: String): User
    getUserInfo(token: String): User

    #Type
    types: [Type]
    type(id: ID!): Type

    #Recipe
    recipes: [Recipe]
  }

  type Mutation {
    #Type
    addType(_id: ID!, name: String): Type
    editType(_id: ID!, name: String): Type
    deleteType(_id: ID!): Type

    #Recipe
    addRecipe(
      _id: ID!
      name: String
      intro: String
      time: Int
      number: Int
      level: String
      tutorial: [String]
      ingredients: [IngredientInput]
      types: [String]
      image: [String]
    ): Recipe
    deleteRecipe(_id: ID!): Recipe
    editRecipe(
      _id: ID!
      name: String
      intro: String
      time: Int
      number: Int
      level: String
      tutorial: [String]
      ingredients: [IngredientInput]
      types: [String]
      image: String
    ): Recipe
  }
`;
module.exports = typeDefs;
