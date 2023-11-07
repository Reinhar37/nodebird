jest.mock('../models/post');
jest.mock('../models/hashtag');
const Post = require('../models/post');
const Hashtag = require('../models/hashtag');
const { uploadPost, deletePost } = require('./post');

describe('uploadPost', () => { // 테스트 그룹묶기, 비슷한것끼리 describe로 묶을 수 있다.

  test('해시태그없이 글을 작성한다', async() => {
    result = await uploadPost('412421', '/img/106557669_p01695275535065.jpg', '1');
    expect(result).toEqual('ok');
  });

  test('작성한 글에 해시태그있을때', async() => {
    Post.create.mockReturnValue({ //DB안가고 가짜로 만들기
      addHashtags(hashtag) {
        return Promise.resolve(true);
      },
    });
    Hashtag.findOrCreate.mockReturnValue([])
    result = await uploadPost('#44122 4124', '/img/106557669_p01695275535065.jpg', '1');
    expect(result).toEqual('hashtag ok');
  });

});


describe('deletePost', () => { // 테스트 그룹묶기, 비슷한것끼리 describe로 묶을 수 있다.

  test('글을 삭제한다 하면 ok를 보내준다', async() => {
    result = await deletePost('1');
    expect(result).toEqual('ok');
  });

});