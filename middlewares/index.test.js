const { isLoggedIn, isNotLoggedIn } = require('./');

describe('isLoggedIn', () => { //비슷한것끼리 describe로 묶을 수 있다.

  //가짜로 만들어서 넣어야한다.
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };
  const next = jest.fn(); //일반함수는 toBeCalledTimes가 인식못하므로 이런식으로 넣는다.

  test('로그인 되어 있으면 isLoggedIn이 next를 호출해야함', () => {

    //가짜로 만들어서 넣어야한다.
    const req = {
      isAuthenticated: jest.fn(() => true), //jest에서 함수를 true로 만드는 방법
    };

    isLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test('로그인 되어 있지 않으면 isLoggedIn이 에러를 응답해야함', () => {

    //가짜로 만들어서 넣어야한다.
    const req = {
      isAuthenticated: jest.fn(() => false), //jest에서 함수를 true로 만드는 방법
    };

    isLoggedIn(req, res, next);
    expect(res.status).toBeCalledWith(403);
    expect(res.send).toBeCalledWith('로그인 필요');

  });

});

describe('isNotLoggedIn', () => {

  //가짜로 만들어서 넣어야한다.
  const res = {
    redirect: jest.fn(),
  };
  const next = jest.fn(); //일반함수는 toBeCalledTimes가 인식못하므로 이런식으로 넣는다.

  test('로그인 되어 있으면 isNotLoggedIn이 에러를 응답해야함', () => {

    const req = {
      isAuthenticated: jest.fn(() => true), //jest에서 함수를 true로 만드는 방법
    };

    isNotLoggedIn(req, res, next);
    const message = encodeURIComponent('로그인한 상태입니다.');
    expect(res.redirect).toBeCalledWith(`/?error=${message}`);
    
  });

  test('로그인 되어 있지 않으면 isNotLoggedIn이 next를 호출해야함', () => {

    const req = {
      isAuthenticated: jest.fn(() => false), //jest에서 함수를 true로 만드는 방법
    };

    isNotLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1);

  });

});