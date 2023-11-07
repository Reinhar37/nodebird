jest.mock('../services/page');
const { renderProfile, renderJoin, renderMain, renderHashtag, renderNick } = require('./page');
const { renderMain: renderMainService, renderHashtag: renderHashtagService, renderNick: renderNickService } = require('../services/page');

describe('renderProfile', () => {

  const res = {
    render: jest.fn(),
  };

  test('내 프로필을 호출함', async() => {
    renderProfile(null, res);
    expect(res.render).toBeCalledWith('profile', { title: '내 정보 - NodeBird' });
  });

});

describe('renderJoin', () => {

  const res = {
    render: jest.fn(),
  };

  test('회원가입 화면을 호출함', async() => {
    renderJoin(null, res);
    expect(res.render).toBeCalledWith('join', { title: '회원 가입 - NodeBird' });
  });

});

describe('renderMain', () => {

  const res = {
    render: jest.fn(),
  };
  const next = jest.fn();
  console.error = jest.fn();

  test('메인 화면을 호출함', async() => {
    renderMainService.mockReturnValue('포스트');
    await renderMain(null, res, next);
    expect(res.render).toBeCalledWith('main', {
      title: 'NodeBird',
      twits: '포스트',
    });
  });

  test('DB에서 에러가 발생하면 next(error)를 호출함', async() => {
    const message = 'DB에러';
    renderMainService.mockReturnValue(Promise.reject(message));
    await renderMain(null, res, next);
    expect(next).toBeCalledWith(message);
  });

});

describe('renderHashtag', () => {

  const req = {
    query: { hashtag: 123,},
  };
  const res = {
    redirect: jest.fn(),
    render: jest.fn(),
  };
  const next = jest.fn();
  console.error = jest.fn();

  test('해시태그를 검색했을때 일치하는 해시태그들이 있으면 그 그들을 호출함', async() => {
    renderHashtagService.mockReturnValue('포스트');
    await renderHashtag(req, res, next);
    expect(res.render).toBeCalledWith('main', {
      title: `123 | NodeBird`,
      twits: '포스트',
    });
  });

  test('해시태그를 검색했을때 일치하는 해시태그들이 없으면 돌아감', async() => {
    renderHashtagService.mockReturnValue('no hashtag');
    await renderHashtag(req, res, next);
    expect(res.redirect).toBeCalledWith('/');
  });

  test('DB에서 에러가 발생하면 next(error)를 호출함', async() => {
    const message = 'DB에러';
    renderHashtagService.mockReturnValue(Promise.reject(message));
    await renderHashtag(req, res, next);
    expect(next).toBeCalledWith(message);
  });

});

describe('renderMain', () => {

  const req = {
    query: { nick: 123,},
  };
  const res = {
    redirect: jest.fn(),
    render: jest.fn(),
  };
  const next = jest.fn();
  console.error = jest.fn();

  test('닉네임을 검색했을때 일치하는 닉네임들이 있으면 그 그들을 호출함', async() => {
    renderNickService.mockReturnValue('포스트');
    await renderNick(req, res, next);
    expect(res.render).toBeCalledWith('main', {
      title: `123 | NodeBird`,
      twits: '포스트',
    });
  });

  test('닉네임을 검색했을때 일치하는 닉네임들이 없으면 돌아감', async() => {
    renderNickService.mockReturnValue('no nick');
    await renderNick(req, res, next);
    expect(res.redirect).toBeCalledWith('/');
  });

  test('DB에서 에러가 발생하면 next(error)를 호출함', async() => {
    const message = 'DB에러';
    renderNickService.mockReturnValue(Promise.reject(message));
    await renderNick(req, res, next);
    expect(next).toBeCalledWith(message);
  });

});