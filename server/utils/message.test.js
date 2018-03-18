var expect=require('expect');
var {generateMessage}=require('./message');
describe('generateMessage',()=>{
  it('It should generate test message',()=>{
    var from='shivam';
    var text='bc';
    var message=generateMessage(from,text);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });
});
