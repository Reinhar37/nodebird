jest.mock('../models/user');
const User = require('../models/user');
const { join } = require('./auth');

describe('join', () => { // 테스트 그룹묶기, 비슷한것끼리 describe로 묶을 수 있다.

  test('회원 가입을 시도했을때 이메일이 중복되지않으면 success를 돌려준다', async() => {
    User.findOne.mockReturnValue(null);
    result = await join('123', '123@naver.com', '123' );
    expect(result).toEqual('success');
  });

  test('회원 가입을 시도했을때 이메일이 중복되면 error를 돌려준다', async() => {
    User.findOne.mockReturnValue(true);
    result = await join('123', '123@naver.com', '321' );
    expect(result).toEqual('error');
  });

});
