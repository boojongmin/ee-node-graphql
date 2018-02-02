var { buildSchema } = require('graphql');

var schema = buildSchema(`
  input MemberInput {
    name: String
    email: String
    password: String
    questions: [QuestionInput]
  }

  input QuestionInput {
    id: ID!
    jobName: String
    questionDetails: [QuestionDetailInput]
  }

  input QuestionDetailInput {
    question: String
    orderNumber: Int
  }

  type Question {
    jobName: String
    questionDetails: [QuestionDetail]
  }

  type QuestionDetail {
    question: String
    orderNumber: Int
  }

  type Member {
    id: ID!
    name: String
    email: String
    questions: [QuestionDetail]
  }

  input MessageInput {
    content: String
    author: String
  }
  
  type Message {
    id: ID!
    content: String
    author: String
  }

  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    hello: String
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
    rollDice(numDice: Int!, numSides: Int): [Int]
    getDie(numSides: Int): RandomDie
    getMessage(id: ID!): Message
    getMembers: [Member]
    getMember(id: ID!): Member
  }

  type Mutation {
    createMember(input: MemberInput): Member
    createQuestion(input: QuestionInput): Question
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`)

// export { schema };
module.exports = schema;
