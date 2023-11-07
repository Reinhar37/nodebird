jest.mock('../models/post');
jest.mock('../models/hashtag');
jest.mock('../models/user');
const Post = require('../models/post');
const User = require('../models/user');
const Hashtag = require('../models/hashtag');
const { renderMain, renderHashtag, renderNick } = require('./page');

describe('renderMain', () => { // 테스트 그룹묶기, 비슷한것끼리 describe로 묶을 수 있다.

  test('화면을 보여준다', async() => {
    Post.findAll.mockReturnValue('123');
    result = await renderMain();
    expect(result).toEqual('123');
  });

});

describe('renderHashtag', () => { // 테스트 그룹묶기, 비슷한것끼리 describe로 묶을 수 있다.

  test('검색한 해시태그가 있으면 해시태그가 포함된 글을 돌려준다', async() => {
    Hashtag.findOne.mockReturnValue({
      getPosts(posts) {
        return Promise.resolve('234');
      },
    });
    result = await renderHashtag('#123');
    expect(result).toEqual('234');
  });

  test('검색한 해시태그가 없으면 no hashtag 돌려준다', async() => {
    result = await renderHashtag();
    expect(result).toEqual('no hashtag');
  });

});

describe('renderNick', () => { // 테스트 그룹묶기, 비슷한것끼리 describe로 묶을 수 있다.

  test('검색한 닉네임이 있으면 그 유저의 글을 돌려준다', async() => {
    User.findOne.mockReturnValue({
      getPosts(posts) {
        return Promise.resolve('234');
      },
    });
    result = await renderNick('123');
    expect(result).toEqual('234');
  });

  test('검색한 해시태그가 없으면 no nick 돌려준다', async() => {
    result = await renderNick();
    expect(result).toEqual('no nick');
  });

});