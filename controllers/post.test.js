jest.mock('../services/post');
const { uploadPost, deletePost, afterUploadImage } = require('./post');
const { uploadPost: uploadPostService, deletePost: deletePostService } = require('../services/post');

describe('afterUploadImage', () => {

  const req = {
    file: { filename: 123,},
  };
  const res = {
    json: jest.fn(),
  };

  test('글을 삭제하고 redirect("/")를 응답해야함', async() => {
    
    const url = {url: `/img/123`};
    afterUploadImage(req, res);
    expect(res.json).toBeCalledWith(url);
  });

});

describe('uploadPost', () => {

  const req = {
    body: { content: 123, url: '/img/106557669_p01695275535065.jpg', },
    user: { id: 2 },
  };
  const res = {
    redirect: jest.fn(),
  };
  const next = jest.fn();
  console.error = jest.fn();

  test('글을 업로드하고 redirect("/")를 응답해야함', async() => {
    
    uploadPostService.mockReturnValue('ok');
    await uploadPost(req, res, next);
    expect(res.redirect).toBeCalledWith('/');
  });

  test('DB에서 에러가 발생하면 next(error)를 호출함', async() => {
    const message = 'DB에러';
    uploadPostService.mockReturnValue(Promise.reject(message));
    await uploadPost(req, res, next);
    expect(next).toBeCalledWith(message);
  });

});

describe('deletePost', () => {

  const req = {
    user: { id: 2,},
    params: { id: 2 },
  };
  const res = {
    redirect: jest.fn(),
  };
  const next = jest.fn();
  console.error = jest.fn();

  test('글을 삭제하고 redirect("/")를 응답해야함', async() => {
    
    deletePostService.mockReturnValue('ok');
    await deletePost(req, res, next);
    expect(res.redirect).toBeCalledWith('/');
  });

  test('DB에서 에러가 발생하면 next(error)를 호출함', async() => {
    const message = 'DB에러';
    deletePostService.mockReturnValue(Promise.reject(message));
    await deletePost(req, res, next);
    expect(next).toBeCalledWith(message);
  });

});

