const { assert } = require('chai');
var { Member, MemberInput, Question } = require('../../src/model/model.js');

describe('#Member', function() {
  it('findById', function() {
    const id = '89abdd6b-6815-48cc-ab36-425c958ff24a';
    const p = Member.findById(id);
    return p.then(x => {
      console.log(x);
      assert.isTrue(x.Item.id === id, 'select success')
    }, err => {
      console.log(err);
      assert.isTrue(false, 'select failed');
    });
  })

  it('saveMember', function() {
    const id = '89abdd6b-6815-48cc-ab36-425c958ff24a';
    const m = new Member(id, {name: 'test', email: 'test@test.com', password: '1234'});
    const p = Member.saveMember(m);
    p.then(x => {
      console.log(x);
      assert.isTrue(true, 'save success')
    }, x => {
      console.log(x)
      assert.isTrue(false, 'save failed');
    })
  })
});


describe('#Question', function() {
  it.only('createQuestion', function() {
    const id = '89abdd6b-6815-48cc-ab36-425c958ff24a';
    const p = Question.createQuestion({id: id, jobName: 'test job name', questionDetails: []})
    p.then(x=> {
      console.log(x);
    }, err => {
      console.log(err);
    });
  })
});