const { Member, Question, QuestionDetail, Message, RandomDie } = require('../model/model.js');
const getUUID = require('uuid/v4');
var fakeDatabase = {};
var root = {
  getMembers: () => {
    return [];
  },
  getMember: ({id}) => {
    return Member
            .findById(id)
            .then(x => {
              return new Member(x.Item.id, {name: x.Item.name, email: x.Item.email})
            }, err => {
              console.log('err', err);
              return new Member(undefined, {});
            })
  },
  createMember: function ({input}) {
    const uuid = getUUID();
    const m = new Member(uuid, input);
    const p = Member.saveMember(m);
    return new Promise((resolve, reject) => {
      p.then( x=> {
        Member.findById(uuid)
          .then(x => {
            const m = new Member(x.Item.id, {name: x.Item.name, email: x.Item.email})
            resolve(m);
          });
      }, err => {
        reject(err);
      });
    });
  },
  // createQuestion(input: QuestionInput): Question
  createQuestion: ({input}) => {
    const q = new Question(input.id, input.jobName, input.questionDetails);
    return new Promise((resolve, reject) => {
      return Question.createQuestion(q)
        .then(x => {
          resolve(q);
        }, err => {
          reject(err);
        });
    });
  }, 

  /* below is samples */
  hello: () => {
    return 'Hello world!';
  },
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
  rollDice: function ({numDice, numSides}) {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  },
  getDie: ({numSides}) => {
    return new RandomDie(numSides || 6);
  },
  setMessage: ({message}) => {
    fakeDatabase.message = message;
    return message
  },
  getMessage: () => {
    return fakeDatabase.message;
  },
  getMessage: function ({id}) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    return new Message(id, fakeDatabase[id]);
  },
  createMessage: function ({input}) {
    // Create a random id for our "database".
    var id = require('crypto').randomBytes(10).toString('hex');
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  updateMessage: function ({id, input}) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
};
module.exports = root;