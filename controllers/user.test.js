jest.mock('../services/user');
const { follow, unFollow, like, unLike, updateProfile } = require('./user');
const { follow: followService, unFollow: unFollowService, like: likeService, unLike: unLikeService, updateProfile: updateProfileService } = require('../services/user');

describe('follow', () => {

  const req = {
    user: { id: 1, },
    params: { id: 2 },
  };
  const res = {
    status: jest.fn(()=> res),
    send: jest.fn(),
  };
  const next = jest.fn();
  console.error = jest.fn();

  test('사용자를 찾아 팔로잉을 추가하고 success를 응답해야함', async() => {
    
    followService.mockReturnValue('ok');
    await follow(req, res, next);
    expect(res.send).toBeCalledWith('success');
  });

  test('사용자를 못 찾으면 res.status(404).send(no user)를 호출함', async() => {
    
    followService.mockReturnValue('no user');
    await follow(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith('no user');
  });

  test('DB에서 에러가 발생하면 next(error)를 호출함', async() => {
    const message = 'DB에러';
    followService.mockReturnValue(Promise.reject(message));
    await follow(req, res, next);
    expect(next).toBeCalledWith(message);
  });

});

describe('unFollow', () => {

  const req = {
    user: { id: 1, },
    params: { id: 2 },
  };
  const res = {
    status: jest.fn(()=> res),
    send: jest.fn(),
  };
  const next = jest.fn();
  console.error = jest.fn();

  test('사용자를 찾아 언팔로잉하고 success를 응답해야함', async() => {
    
    unFollowService.mockReturnValue('ok');
    await unFollow(req, res, next);
    expect(res.send).toBeCalledWith('success');
  });

  test('사용자를 못 찾으면 res.status(404).send(no user)를 호출함', async() => {
    
    unFollowService.mockReturnValue('no user');
    await unFollow(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith('no user');
  });

  test('DB에서 에러가 발생하면 next(error)를 호출함', async() => {
    const message = 'DB에러';
    unFollowService.mockReturnValue(Promise.reject(message));
    await unFollow(req, res, next);
    expect(next).toBeCalledWith(message);
  });

});

describe('like', () => {

  const req = {
    user: { id: 1, },
    params: { post: 2 },
  };
  const res = {
    status: jest.fn(()=> res),
    send: jest.fn(),
  };
  const next = jest.fn();
  console.error = jest.fn();

  test('사용자를 찾아 like하고 success를 응답해야함', async() => {
    
    likeService.mockReturnValue('ok');
    await like(req, res, next);
    expect(res.send).toBeCalledWith('success');
  });

  test('사용자를 못 찾으면 res.status(404).send(no user)를 호출함', async() => {
    
    likeService.mockReturnValue('no user');
    await like(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith('no user');
  });

  test('DB에서 에러가 발생하면 next(error)를 호출함', async() => {
    const message = 'DB에러';
    likeService.mockReturnValue(Promise.reject(message));
    await like(req, res, next);
    expect(next).toBeCalledWith(message);
  });

});

describe('unLike', () => {

  const req = {
    user: { id: 1, },
    params: { post: 2 },
  };
  const res = {
    status: jest.fn(()=> res),
    send: jest.fn(),
  };
  const next = jest.fn();
  console.error = jest.fn();

  test('사용자를 찾아 unLike하고 success를 응답해야함', async() => {
    
    unLikeService.mockReturnValue('ok');
    await unLike(req, res, next);
    expect(res.send).toBeCalledWith('success');
  });

  test('사용자를 못 찾으면 res.status(404).send(no user)를 호출함', async() => {
    
    unLikeService.mockReturnValue('no user');
    await unLike(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith('no user');
  });

  test('DB에서 에러가 발생하면 next(error)를 호출함', async() => {
    const message = 'DB에러';
    unLikeService.mockReturnValue(Promise.reject(message));
    await unLike(req, res, next);
    expect(next).toBeCalledWith(message);
  });

});

describe('updateProfile', () => {

  const req = {
    user: { id: 1, },
    body: { nick: 342 },
  };
  const res = {
    status: jest.fn(()=> res),
    send: jest.fn(),
  };
  const next = jest.fn();
  console.error = jest.fn();

  test('사용자를 찾아 유저정보를 업데이트하고 success를 응답해야함', async() => {
    
    updateProfileService.mockReturnValue('ok');
    await updateProfile(req, res, next);
    expect(res.send).toBeCalledWith('success');
  });

  test('사용자를 못 찾으면 res.status(404).send(no user)를 호출함', async() => {
    
    updateProfileService.mockReturnValue('no user');
    await updateProfile(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith('no user');
  });

  test('DB에서 에러가 발생하면 next(error)를 호출함', async() => {
    const message = 'DB에러';
    updateProfileService.mockReturnValue(Promise.reject(message));
    await updateProfile(req, res, next);
    expect(next).toBeCalledWith(message);
  });

});








//service 사용 전 테스트
// describe('follow', () => { // 테스트 그룹묶기, 비슷한것끼리 describe로 묶을 수 있다.

//   test('사용자를 찾아 팔로잉을 추가하고 success를 응답해야함', async() => {
//     const req = {
//       user: { id: 1, },
//       params: { id: 2 },
//     };
//     const res = {
//       send: jest.fn(),
//     };
//     const next = jest.fn();
//     User.findOne.mockReturnValue({ //DB안가고 가짜로 만들기
//       addFollowing(id) {
//         return Promise.resolve(true);
//       },
//     });
//     await follow(req, res, next);
//     expect(res.send).toBeCalledWith('success');
//   });

//   test('사용자를 찾지 못하면 res.status(404).send(no user)를 호출함', async() => {
//     const req = {
//       user: { id: 1, },
//       params: { id: 2 },
//     };
//     const res = {
//       status: jest.fn(() => res),
//       send: jest.fn(),
//     };
//     const next = jest.fn();
//     User.findOne.mockReturnValue(null); //DB안가고 가짜로 만들기
//     await follow(req, res, next);
//     expect(res.status).toBeCalledWith(404);
//     expect(res.send).toBeCalledWith('no user');
//   });

//   test('DB에서 에러가 발생하면 next(error)를 호출함', async() => {
//     const req = {
//       user: { id: 1, },
//       params: { id: 2 },
//     };
//     const res = {};
//     const next = jest.fn();
//     const message = 'DB에러';
//     User.findOne.mockReturnValue(Promise.reject(message));
//     await follow(req, res, next);
//     expect(next).toBeCalledWith(message);
//   });
// });

