jest.mock('../services/auth');
const { login, logout, join } = require('./auth');
const { join: joinService } = require('../services/auth');

// describe('login', () => {

//   const req = {
//     login: jest.fn(),
//   }
//   const res = {
//     redirect: jest.fn(),
//     render: jest.fn(),
//   };
//   const next = jest.fn();

//   test('로그인을 시도후 성공함', async() => {
//     login(req, res, next);
//     expect(res.redirect).toBeCalledWith('/');
//   });

//   test('로그인을 시도후 로그인 에러', async() => {
//     const authError = false;
//     const user = true;
//     const loginError = 'loginError';
//     login(req, res, next);
//     expect(newt).toBeCalledWith(loginError);
//   });

//   test('로그인을 시도후 서버실패', async() => {
//     const authError = true;
//     const user = true;
//     const loginError = false;
//     login(req, res, next);
//     expect(next).toBeCalledWith(authError);
//   });

//   test('로그인을 시도후 로직실패', async() => {
//     const authError = false;
//     const user = false;
//     const loginError = false;
//     const info = {
//       message: 'logicError',
//     }
//     login(req, res, next);
//     expect(res).toBeCalledWith(`/?loginError=${info.message}`);
//   });

// });

describe('logout', () => {
  
  const res = {
    redirect: jest.fn(),
  };
  const req = {
    logout: jest.fn(() => res.redirect('/')),
  };
  

  test('로그아웃', async() => {
    logout(req, res);
    expect(res.redirect).toBeCalledWith('/');
  });

});

describe('join', () => {

  const req = {
    body: {
      nick: 123,
      email: '123@naver.com',
      password: 123,
    },
  };
  const res = {
    redirect: jest.fn(),
  };
  const next = jest.fn();
  console.error = jest.fn();

  test('유저를 찾아보고 없으면 회원가입', async() => {
    joinService.mockReturnValue('user');
    await join(req, res, next);
    expect(res.redirect).toBeCalledWith('/');
  });

  test('유저를 찾아보고 있으면 에러', async() => {
    joinService.mockReturnValue('error');
    await join(req, res, next);
    expect(res.redirect).toBeCalledWith('/join?error=exist');
  });

  test('DB에서 에러가 발생하면 next(error)를 호출함', async() => {
    const message = 'DB에러';
    joinService.mockReturnValue(Promise.reject(message));
    await join(req, res, next);
    expect(next).toBeCalledWith(message);
  });

});