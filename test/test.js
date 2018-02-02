const {assert} = require('chai');
const {graphql, dynamoDB} = require('./init.js');
const {Member} = require('../src/model/model.js');

describe('graphql', function() {
  describe('hello world', function() {
    it('test', function() {
      const data = {query: '{hello}'};
      return graphql(data).then(x => {
        assert.deepEqual(x, {data: { hello: 'Hello world!'}});
      })
    });
  })

  describe('#member', function() {
    it('getMember', function() {
      const id = "6ef37fe1-0bb9-44f3-ab31-ac07ce962c20";
      const data = {query: `{getMember(id: \"${id}\") {id name email}}`}
      return graphql(data).then(x => {
        console.log(x);
        assert.deepEqual(x.data.getMember.id, id);
      });
    })

    it('createMember', function() {
      const uuid = require('uuid').v4();
      const assertValue = 'test';
      const data = { 
        query: `mutation {
          createMember(input: { 
             name: \"test\" 
             email: \"email@email.com\", 
             password: \"1234\"
            }) { 
              id name email 
            }       
          }`
      };
      return graphql(data).then(x => {
        assert.equal(x.data.createMember.name, 'test');

        // delete test data
        const id = x.data.createMember.id;
        Member.deleteMember(id)
          .then(x => {
            assert.isTrue(true);
          }, err => { 
            assert.isTrue(false, err);
          })
      });
    })
  })

  describe('#question', function() {
    it('createQuestion', function() {
      const id = '89abdd6b-6815-48cc-ab36-425c958ff24a';
      const jobName = "test job name"
      const data = {query: `
        mutation {
          createQuestion(input: {
            id: \"${id}\"
            jobName: \"${jobName}\"
            questionDetails: []
          }) {
            jobName
            questionDetails {
              question
              orderNumber
            }
          }
        }`}
      return graphql(data).then(x => {
        assert.deepEqual(x.data.createQuestion.jobName, jobName);
      });
    })
  });
})