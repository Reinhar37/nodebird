jest.mock('../models/user');
const User = require('../models/user');
const { follow, unFollow, like, unLike, updateProfile } = require('./user');

describe('follow', () => { // 테스트 그룹묶기, 비슷한것끼리 describe로 묶을 수 있다.

  test('사용자를 찾아 팔로잉을 추가하고 success를 응답해야함', async() => {
    User.findOne.mockReturnValue({ //DB안가고 가짜로 만들기
      addFollowing(id) {
        return Promise.resolve(true);
      },
    });
    const result = await follow(1, 2);
    expect(result).toEqual('ok');
  });

  test('사용자를 찾지 못하면 res.status(404).send(no user)를 호출함', async() => {
    
    const next = jest.fn();
    User.findOne.mockReturnValue(null); //DB안가고 가짜로 만들기
    const result = await follow(1, 2);
    expect(result).toEqual('no user');
  });
});

describe('unFollow', () => { // 테스트 그룹묶기, 비슷한것끼리 describe로 묶을 수 있다.

  test('사용자를 찾아 팔로잉을 삭제하고 success를 응답해야함', async() => {
    User.findOne.mockReturnValue({ //DB안가고 가짜로 만들기
      removeFollowing(id) {
        return Promise.resolve(true);
      },
    });
    const result = await unFollow(1, 2);
    expect(result).toEqual('ok');
  });

  test('사용자를 찾지 못하면 res.status(404).send(no user)를 호출함', async() => {
    
    const next = jest.fn();
    User.findOne.mockReturnValue(null); //DB안가고 가짜로 만들기
    const result = await unFollow(1, 2);
    expect(result).toEqual('no user');
  });
});

describe('like', () => { // 테스트 그룹묶기, 비슷한것끼리 describe로 묶을 수 있다.

  test('사용자를 찾아 좋아요를 하고 success를 응답해야함', async() => {
    User.findOne.mockReturnValue({ //DB안가고 가짜로 만들기
      addLikeMe(id) {
        return Promise.resolve(true);
      },
    });
    const result = await like(1, 2);
    expect(result).toEqual('ok');
  });

  test('사용자를 찾지 못하면 res.status(404).send(no user)를 호출함', async() => {
    
    const next = jest.fn();
    User.findOne.mockReturnValue(null); //DB안가고 가짜로 만들기
    const result = await like(1, 2);
    expect(result).toEqual('no user');
  });
});

describe('unLike', () => { // 테스트 그룹묶기, 비슷한것끼리 describe로 묶을 수 있다.

  test('사용자를 찾아 좋아요를 취소하고 success를 응답해야함', async() => {
    User.findOne.mockReturnValue({ //DB안가고 가짜로 만들기
      removeLikeMe(id) {
        return Promise.resolve(true);
      },
    });
    const result = await unLike(1, 2);
    expect(result).toEqual('ok');
  });

  test('사용자를 찾지 못하면 res.status(404).send(no user)를 호출함', async() => {
    
    const next = jest.fn();
    User.findOne.mockReturnValue(null); //DB안가고 가짜로 만들기
    const result = await unLike(1, 2);
    expect(result).toEqual('no user');
  });
});

describe('updateProfile', () => { // 테스트 그룹묶기, 비슷한것끼리 describe로 묶을 수 있다.

  test('사용자를 찾아 정보를 업데이트하고 success를 응답해야함', async() => {
    User.findOne.mockReturnValue({ //DB안가고 가짜로 만들기
      update(id) {
        return Promise.resolve(true);
      },
    });
    const result = await updateProfile(1, 2);
    expect(result).toEqual('ok');
  });

  test('사용자를 찾지 못하면 res.status(404).send(no user)를 호출함', async() => {
    
    const next = jest.fn();
    User.findOne.mockReturnValue(null); //DB안가고 가짜로 만들기
    const result = await updateProfile(1, 2);
    expect(result).toEqual('no user');
  });

});