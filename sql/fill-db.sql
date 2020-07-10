
INSERT INTO avatars (id, original_name)
  VALUES ('v2itK', 'avatar-2.png');

INSERT INTO passwords (id, password)
  VALUES (DEFAULT, 'ThamoayMsarm');

INSERT INTO users (email, avatar_id, password_id, firstname, lastname)
  VALUES (
    'maryam.otahsm@gmail.com',
    'v2itK',
    currval('passwords_id_seq'),
    'Maryam',
    'Thomas'
    );

INSERT INTO avatars (id, original_name)
  VALUES ('qbpj7', 'adorable-5.png');

INSERT INTO passwords (id, password)
  VALUES (DEFAULT, 'HraynerthyaB');

INSERT INTO users (email, avatar_id, password_id, firstname, lastname)
  VALUES (
    'harry.ytebnha@gmail.com',
    'qbpj7',
    currval('passwords_id_seq'),
    'Harry',
    'Bethany'
    );

INSERT INTO avatars (id, original_name)
  VALUES ('xogST', 'adorable-4.png');

INSERT INTO passwords (id, password)
  VALUES (DEFAULT, 'yenHidiaR');

INSERT INTO users (email, avatar_id, password_id, firstname, lastname)
  VALUES (
    'heidi.anry@gmail.com',
    'xogST',
    currval('passwords_id_seq'),
    'Heidi',
    'Ryan'
    );

INSERT INTO avatars (id, original_name)
  VALUES ('3210S', 'adorable-7.png');

INSERT INTO passwords (id, password)
  VALUES (DEFAULT, 'leIsxaetDr');

INSERT INTO users (email, avatar_id, password_id, firstname, lastname)
  VALUES (
    'dexter.lisa@gmail.com',
    '3210S',
    currval('passwords_id_seq'),
    'Dexter',
    'Isla'
    );

INSERT INTO avatars (id, original_name)
  VALUES ('CaIJW', 'adorable-4.png');

INSERT INTO passwords (id, password)
  VALUES (DEFAULT, 'AlFeniorleecc');

INSERT INTO users (email, avatar_id, password_id, firstname, lastname)
  VALUES (
    'florence.lceai@gmail.com',
    'CaIJW',
    currval('passwords_id_seq'),
    'Florence',
    'Alice'
    );

INSERT INTO categories (id, name) VALUES 
(DEFAULT, 'Деревья'), (DEFAULT, 'За жизнь'), (DEFAULT, 'Без рамки'), (DEFAULT, 'Разное'), (DEFAULT, 'IT'), (DEFAULT, 'Музыка'), (DEFAULT, 'Кино'), (DEFAULT, 'Программирование'), (DEFAULT, 'Железо');
INSERT INTO pictures (id, original_name) VALUES ('XRrMz', '0.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'dexter.lisa@gmail.com',
    'XRrMz',
    '2020-05-05T06:26:27.354Z',
    'Вниз по кроличьей норе',
    'Он выдумывал не только сказки - он выдумывал головоломки, загадки, игрушки, игры, да еще какие! В некоторые из них играют и до сих пор.
Как вдруг в один прекрасный день я прочитал письмо Льюиса Кэрролла театральному режиссеру, который решил поставить',
    'Как вдруг в один прекрасный день я прочитал письмо Льюиса Кэрролла театральному режиссеру, который решил поставить сказку про Алису на сцене.
И все это - выдумки, игры, загадки, головоломки, сюрпризы, пародии и фокусы,- все это есть в его сказке про девочку Алису.
МОРЕ в ГОРУ.
Вот маленький пример.
Я надеюсь, что я вас не слишком запугал.
Но если вы ему скажете, что Ихтиозавр говорит: "Ах, батюшки мои!" -
Это один из лучших рок-музыкантов.
Начнем с начала, как советует Червонный Король (вам предстоит с ним скоро встретиться).
Из под его пера вышло 8 платиновых альбомов.
Освоить вёрстку несложно. Возьмите новую книгу и закрепите все упражнения на практике.
МОРЕ в ГОРУ.
Он начал рассказывать сказку о приключениях одной девочки, которую тоже почему-то звали Алисой!
Читал я ее по-английски: скажу по секрету, что ради нее-то я и выучил английский язык.
Ну уж, на худой конец: "Алиска в Расчудесии".
И еще - доверчивая, готовая поверить в самую невозможную небыль и принять ее с безграничным до'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-07-07T20:58:30.617Z',
      'Это где ж такие красоты?'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-24T05:53:00.947Z',
      'Хотел бы я так же написать'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-05-21T07:48:55.411Z',
      'Это где ж такие красоты?'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-06-09T20:22:16.577Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-01T04:20:30.967Z',
      'Это где ж такие красоты?'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-05-21T00:30:55.684Z',
      'Это где ж такие красоты?'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-05-13T08:19:40.993Z',
      'Совсем немного...'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-02T18:02:53.366Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-18T23:02:51.037Z',
      'Мой кот понятнее излагает.'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-05-16T02:51:41.976Z',
      'Плюсую, но слишком много буквы!'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-05-26T14:09:53.463Z',
      'Плюсую, но слишком много буквы!'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-06-18T10:04:57.351Z',
      'Я тоже могу так написать...'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-05-12T03:24:25.433Z',
      'Планируете записать видосик на эту тему?'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-22T22:00:45.387Z',
      'Ну зачем столько запятых?!!'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-05-11T17:33:50.322Z',
      'Согласен с автором!'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-06-28T02:29:06.125Z',
      'Ну зачем столько запятых?!!'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-17T16:06:32.551Z',
      'Плюсую, но слишком много буквы!'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-30T20:56:59.650Z',
      'Согласен с автором!'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Программирование')), (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Разное'));
INSERT INTO pictures (id, original_name) VALUES ('6pmjr', 'forest@1x.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'maryam.otahsm@gmail.com',
    '6pmjr',
    '2020-05-17T08:28:38.653Z',
    'Учим HTML и CSS',
    'И еще он умел переделывать старые, надоевшие стишки - переделывать так, что они становились ужасно смешными.
И не знаю почему, когда я прочитал это письмо, мне так захотелось, чтобы и вы познакомились с этой прелестной девочкой, что я вдруг махнул ру',
    'И еще он умел переделывать старые, надоевшие стишки - переделывать так, что они становились ужасно смешными.
Это один из лучших рок-музыкантов.
И не знаю почему, когда я прочитал это письмо, мне так захотелось, чтобы и вы познакомились с этой прелестной девочкой, что я вдруг махнул рукой на свой "научный труд" и на все свои умные рассуждения и решил попробовать - только попробовать - рассказать о ней по-русски.
Бороться с прокрастинацией несложно.Просто действуйте.Маленькими шагами.
Надо отдать должное маленькой Алисе (я имею в виду живую Алису, полностью ее звали Алиса Плезенс Лиддел) - она хорошо знала, кого попросить рассказать сказку!
Все горе в том, что книжка эта была написана в Англии сто лет тому назад и за это время успела так прославиться, что и у нас все - хотя бы понаслышке - знают про Алису и привыкли к скучноватому названию "Приключения
Энциклопедический Словарь.
Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.
И'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-04T22:25:27.385Z',
      'Я тоже могу так написать...'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-05-22T09:26:43.375Z',
      'Мне кажется или я уже читал это где-то?'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-05-25T01:58:24.027Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-06-13T10:26:56.235Z',
      'Согласен с автором!'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-07-09T07:02:29.468Z',
      'Ну зачем столько запятых?!!'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-03T00:47:56.576Z',
      'Наконец-то нормальный пост!'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-05-28T05:28:55.443Z',
      'Плюсую, но слишком много буквы!'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-05-19T12:20:26.479Z',
      'Хотел бы я так же написать'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-05-30T05:54:18.740Z',
      'Я тоже могу так написать...'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-05-29T16:42:36.214Z',
      'Совсем немного...'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-05-18T19:50:43.090Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-14T06:47:29.793Z',
      'Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-06-27T05:55:28.649Z',
      'Ну зачем столько запятых?!!'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-05-22T01:58:58.852Z',
      'Наконец-то нормальный пост!'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-05-23T03:07:00.263Z',
      'Плюсую, но слишком много буквы!'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Кино'));
INSERT INTO pictures (id, original_name) VALUES ('jXA6o', '8.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'harry.ytebnha@gmail.com',
    'jXA6o',
    '2020-06-06T03:16:57.700Z',
    'Королевский крокет',
    'Ну уж, на худой конец: "Алиска в Расчудесии".
Алиса была такая девочка, которой очень трудно было отказать, потому что мистер Доджсон, хотя и был профессором математики (честное слово!) и к тому же в этот день уже сильно устал,- послушался.
Вдруг да ',
    'Вдруг да они это знают?
Ну уж, на худой конец: "Алиска в Расчудесии".
Алиса была такая девочка, которой очень трудно было отказать, потому что мистер Доджсон, хотя и был профессором математики (честное слово!) и к тому же в этот день уже сильно устал,- послушался.
Алиса была такая девочка, которой очень трудно было отказать, потому что мистер Доджсон, хотя и был профессором математики (честное слово!) и к тому же в этот день уже сильно устал,- послушался.
Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.
Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.
Ну уж, на худой конец: "Алиска в Расчудесии".
Для того чтобы правильно прочитать, то есть понять, эту сказку, нужны только две вещи.
Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.
Это называется литературной традицией, и тут, как говорится, ничего не попишешь.
Только тогда - почти наверняка! - не с'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-06-30T23:36:04.570Z',
      'Ну зачем столько запятых?!!'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-21T14:17:02.429Z',
      'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-07-06T19:00:32.905Z',
      'Ну зачем столько запятых?!!'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-07-06T01:31:44.643Z',
      'Наконец-то нормальный пост!'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-07-01T20:10:34.822Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-07-08T20:30:30.926Z',
      'Плюсую, но слишком много буквы!'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-24T10:48:58.858Z',
      'Наконец-то нормальный пост!'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-06-30T03:42:49.682Z',
      'Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-06-27T01:58:58.056Z',
      'Ну зачем столько запятых?!!'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-07-05T21:07:24.756Z',
      'Это где ж такие красоты?'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-28T14:33:06.623Z',
      'Совсем немного...'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-22T13:20:23.839Z',
      'Мне кажется или я уже читал это где-то?'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-07T05:10:07.639Z',
      'Планируете записать видосик на эту тему?'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-06-17T16:45:06.462Z',
      'Хотел бы я так же написать'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-06-15T10:23:14.188Z',
      'Согласен с автором!'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-07T10:01:43.583Z',
      'Ну зачем столько запятых?!!'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-06-26T16:51:28.220Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-06-30T02:32:37.575Z',
      'Мне кажется или я уже читал это где-то?'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-13T09:08:31.013Z',
      'Совсем немного...'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-23T04:53:59.703Z',
      'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-19T19:09:18.557Z',
      'Ну зачем столько запятых?!!'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-09T16:20:13.457Z',
      'Плюсую, но слишком много буквы!'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-09T08:56:20.498Z',
      'Мой кот понятнее излагает.'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-06-20T23:52:20.739Z',
      'Совсем немного...'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'За жизнь'));
INSERT INTO pictures (id, original_name) VALUES ('o3lVs', '7.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'harry.ytebnha@gmail.com',
    'o3lVs',
    '2020-05-09T23:18:03.125Z',
    'Обзор новейшего смартфона',
    'Нет, фокусы с грехом пополам еще получались, но что-то - может быть, самое главное - пропадало, и веселая, умная, озорная, расчудесная сказка становилась малопонятной и - страшно сказать - скучной.
Как начать действовать? Для начала просто соберитесь',
    'И Андрюшенька заливается смехом.
Особенно он любил и умел играть... словами.
Когда я кончил рассказывать "Алису" и получилась та книжка, которая сейчас лежит перед вами, я и узнал, что я про нее по-настоящему думаю.
И все! Можете играть, только не на уроках!).
Золотое сечение — соотношение двух величин, гармоническая пропорция.
Ведь всегда можно перечитать непонятное место еще разок, правда?
И все это - выдумки, игры, загадки, головоломки, сюрпризы, пародии и фокусы,- все это есть в его сказке про девочку Алису.
Как начать действовать? Для начала просто соберитесь.
Но это, впрочем, не обязательно.
Да, именно Алиса потребовала во время лодочной прогулки от своего знакомого, мистера Доджсона, чтобы он рассказал ей и ее сестрам интересную сказку.
Если я выполнил свое обещание и вы узнали КОЕ-ЧТО, мне очень приятно.
Больше всего на свете я ненавижу обман и люблю честность и потому сразу честно признаюсь, что я вас (совсем немножко!) обманул: на самом деле это не НИКАКАЯ ГЛАВА, а НИКАКАЯ НЕ'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-02T05:28:35.607Z',
      'Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-03T12:37:50.200Z',
      'Планируете записать видосик на эту тему?'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-07-04T23:59:35.407Z',
      'Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-05-11T15:16:16.031Z',
      'Мой кот понятнее излагает.'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-07-06T10:37:37.374Z',
      'Согласен с автором!'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-03T21:08:22.165Z',
      'Ну зачем столько запятых?!!'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-06-03T01:36:30.524Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-05-22T05:24:06.992Z',
      'Это где ж такие красоты?'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-29T02:44:25.521Z',
      'Мой кот понятнее излагает.'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-05-20T20:51:03.382Z',
      'Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-05-28T21:35:43.767Z',
      'Ну зачем столько запятых?!!'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-05-21T15:03:15.690Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-05-29T22:01:43.166Z',
      'Мне кажется или я уже читал это где-то?'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-05-24T13:25:17.088Z',
      'Мне кажется или я уже читал это где-то?'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-05-23T10:08:33.546Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-05-14T06:36:02.840Z',
      'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-05-29T14:38:02.951Z',
      'Мой кот понятнее излагает.'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-06-04T00:18:33.011Z',
      'Согласен с автором!'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-06-15T21:25:43.172Z',
      'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-05-29T04:38:25.914Z',
      'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-06-30T19:25:26.253Z',
      'Планируете записать видосик на эту тему?'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'IT')), (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Музыка'));
INSERT INTO pictures (id, original_name) VALUES ('bFSMR', '4.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'maryam.otahsm@gmail.com',
    'bFSMR',
    '2020-05-21T04:46:55.019Z',
    'Самый лучший музыкальный альбом этого года',
    'И еще - доверчивая, готовая поверить в самую невозможную небыль и принять ее с безграничным доверием мечтательницы; и, наконец,- любопытная, отчаянно любопытная и жизнерадостная той жизнерадостностью, какая дается лишь в детстве, когда весь мир нов и',
    'Я надеюсь, что вам уже захотелось узнать, как появилась на свет такая необыкновенная сказка и кто ее сочинил.
Есть у меня один знакомый, приблизительно двух лет от роду, у которого огромное чувство юмора - он может захохотать, когда никому другому и в голову не придет улыбнуться.
Да, именно Алиса потребовала во время лодочной прогулки от своего знакомого, мистера Доджсона, чтобы он рассказал ей и ее сестрам интересную сказку.
Если я выполнил свое обещание и вы узнали КОЕ-ЧТО, мне очень приятно.
Но если вы ему скажете, что Ихтиозавр говорит: "Ах, батюшки мои!" -
Осталось добавить совсем немножко: как получилась русская книжка, которую вы сейчас читаете, и при чем тут я.
Самые серьезные, самые солидные, самые трудные слова по его приказу кувыркались, и ходили на голове, и показывали фокусы, и превращались одно в другое - словом, бог знает что выделывали!
Будь моя воля, я бы ни за что не назвал так эту книжку.
И когда друзья говорили мне:
Процессор заслуживает особого внимания. Он обязате'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-05-31T21:23:42.755Z',
      'Я тоже могу так написать...'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-06-06T13:16:52.326Z',
      'Хотел бы я так же написать'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-06-15T13:34:35.368Z',
      'Ну зачем столько запятых?!!'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-07T20:04:49.748Z',
      'Ну зачем столько запятых?!!'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-05-25T11:48:22.185Z',
      'Наконец-то нормальный пост!'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-11T21:56:25.710Z',
      'Я тоже могу так написать...'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-07-10T01:04:35.495Z',
      'Совсем немного...'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-06-18T04:24:58.358Z',
      'Совсем немного...'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-06-15T17:51:04.148Z',
      'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-06-06T15:29:28.853Z',
      'Мне кажется или я уже читал это где-то?'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-03T19:10:43.670Z',
      'Совсем немного...'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-05-22T18:18:08.799Z',
      'Мне кажется или я уже читал это где-то?'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-19T06:04:24.681Z',
      'Планируете записать видосик на эту тему?'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-05-25T09:23:34.101Z',
      'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-06-08T21:58:17.676Z',
      'Хотел бы я так же написать'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-14T01:19:41.874Z',
      'Ну зачем столько запятых?!!'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-10T18:14:11.913Z',
      'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Деревья'));
INSERT INTO pictures (id, original_name) VALUES ('iaFHk', 'forest@1x.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'harry.ytebnha@gmail.com',
    'iaFHk',
    '2020-06-24T04:29:41.418Z',
    'Ёлки. История деревьев',
    'Любимая его шутка (он сам ее придумал) такая:
И я не посмел!
И даже немножко раньше: с названия.
Словом, со мной вышло точь-в-точь как с одной маленькой девочкой, которая обычно говорила:
И чтобы в этой сказке было побольше веселой чепухи.',
    'Такое название, по-моему, только сбивает с толку.
Там ее знает каждый и любят все.
Нет, будь моя воля, я назвал бы книжку, например, так: "Аленка в
Нет, будь моя воля, я назвал бы книжку, например, так: "Аленка в
Любимая его шутка (он сам ее придумал) такая:
Он начал рассказывать сказку о приключениях одной девочки, которую тоже почему-то звали Алисой!
Правильно, Алисой!
Осталось добавить совсем немножко: как получилась русская книжка, которую вы сейчас читаете, и при чем тут я.
Надо отдать должное маленькой Алисе (я имею в виду живую Алису, полностью ее звали Алиса Плезенс Лиддел) - она хорошо знала, кого попросить рассказать сказку!
Лакеи и, наконец, вымершая птица Додо, она же ископаемый Дронт.
Но стоило мне заикнуться об этом своем желании, как все начинали на меня страшно кричать, чтобы я не смел.
И чтобы в этой сказке было побольше веселой чепухи.
Осталось добавить совсем немножко: как получилась русская книжка, которую вы сейчас читаете, и при чем тут я.
Особенно он любил и умел'
    );

INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Деревья')), (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Кино'));
INSERT INTO pictures (id, original_name) VALUES ('1KIgJ', '0.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'dexter.lisa@gmail.com',
    '1KIgJ',
    '2020-06-26T04:54:47.601Z',
    'Синяя Гусеница дает совет',
    'И чтобы в этой сказке было побольше веселой чепухи.
И я не посмел!
Это, как вы знаете, называется пародиями.
Там ее знает каждый и любят все.
ПРИСЯЖНЫЕ и чем они отличаются от ПРИСТЯЖНЫХ; и какого рода ВРЕМЯ, и курят ли червяки КАЛЬЯН, и носят ли Ляг',
    'Потому что если в голове пусто, увы, самое большое чувство юмора вас не спасет.
И чтобы в этой сказке было побольше веселой чепухи.
Да, маленькая Алиса, которую автор так любит (хоть порой и посмеивается над ней), что эта великая любовь превращает фокусы в чудеса, а фокусника - в волшебника.
Да и то неизвестно, сочинил бы он ее или нет, если бы не одна маленькая девочка, которую звали...
Это, как вы знаете, называется пародиями.
Такое название, по-моему, только сбивает с толку.
Там ее знает каждый и любят все.
Золотое сечение — соотношение двух величин, гармоническая пропорция.
Любимая его шутка (он сам ее придумал) такая:
И все! Можете играть, только не на уроках!).
И я не посмел!
Короли и Герцогини, Графы и ЭРЛЫ (в сущности, это одно и то же).
Надо отдать должное маленькой Алисе (я имею в виду живую Алису, полностью ее звали Алиса Плезенс Лиддел) - она хорошо знала, кого попросить рассказать сказку!
Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-07-01T01:41:20.728Z',
      'Совсем немного...'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-07-06T14:50:36.901Z',
      'Это где ж такие красоты?'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-06-27T03:38:54.989Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-07-01T07:04:25.908Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-07-02T19:27:05.063Z',
      'Это где ж такие красоты?'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-07-01T06:53:33.089Z',
      'Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-06T23:28:18.471Z',
      'Хотел бы я так же написать'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-07-01T06:52:08.204Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-28T21:29:55.455Z',
      'Хотел бы я так же написать'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-01T20:08:02.945Z',
      'Я тоже могу так написать...'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-29T01:39:49.384Z',
      'Мой кот понятнее излагает.'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-07-07T18:49:21.524Z',
      'Согласен с автором!'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-02T13:39:15.602Z',
      'Планируете записать видосик на эту тему?'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-07-07T02:58:32.588Z',
      'Наконец-то нормальный пост!'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-07-09T19:10:18.235Z',
      'Мне кажется или я уже читал это где-то?'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-07-05T15:03:21.149Z',
      'Мне кажется или я уже читал это где-то?'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-10T03:09:59.261Z',
      'Планируете записать видосик на эту тему?'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-07-05T23:38:03.308Z',
      'Я тоже могу так написать...'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-30T09:14:42.928Z',
      'Наконец-то нормальный пост!'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-07-03T02:36:47.430Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-07-10T00:48:01.483Z',
      'Я тоже могу так написать...'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Кино')), (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Без рамки'));


INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'harry.ytebnha@gmail.com',
    null,
    '2020-05-25T07:52:47.710Z',
    'Поросенок и перец',
    'По совести говоря, бояться нечего.
Потому что только настоящий волшебник может подарить девочке - и сказке! - такую долгую-долгую, на века, жизнь!
Тут я за вас совершенно спокоен - уверен, что смеяться вы умеете и любите!
Да, я был уверен, что все зн',
    'По совести говоря, бояться нечего.
Потому что только настоящий волшебник может подарить девочке - и сказке! - такую долгую-долгую, на века, жизнь!
Да, я был уверен, что все знаю про "Алису", и уже подумывал - не засесть ли мне за солидный ученый труд под названием "К вопросу о причинах непереводимости на русский язык сказки Льюиса Кэрролла", как вдруг...
Тут я за вас совершенно спокоен - уверен, что смеяться вы умеете и любите!
Да и "Страна Чудес" - тоже не совсем те слова, какие хотелось бы написать в заглавии этой сказки!'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-05-25T16:48:54.059Z',
      'Хотел бы я так же написать'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-07-01T07:09:05.185Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-04T15:50:11.017Z',
      'Мой кот понятнее излагает.'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-03T16:29:55.062Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-06-10T23:41:32.260Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-13T03:00:50.301Z',
      'Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-06-06T12:28:04.638Z',
      'Плюсую, но слишком много буквы!'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-07-05T12:21:48.910Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-05-28T22:39:07.163Z',
      'Наконец-то нормальный пост!'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-12T02:01:32.482Z',
      'Я тоже могу так написать...'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-07-07T13:12:21.006Z',
      'Планируете записать видосик на эту тему?'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-01T01:20:56.190Z',
      'Я тоже могу так написать...'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-07T05:02:24.989Z',
      'Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-06-25T15:32:55.837Z',
      'Совсем немного...'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-11T23:28:50.020Z',
      'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-05-27T14:11:05.019Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-06-25T07:37:12.084Z',
      'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-05T12:43:27.575Z',
      'Это где ж такие красоты?'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-06-11T18:19:33.613Z',
      'Это где ж такие красоты?'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-27T21:12:05.533Z',
      'Это где ж такие красоты?'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-15T01:04:43.811Z',
      'Я тоже могу так написать...'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'За жизнь')), (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Без рамки'));
INSERT INTO pictures (id, original_name) VALUES ('13DHo', '8.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'heidi.anry@gmail.com',
    '13DHo',
    '2020-06-27T13:52:54.308Z',
    'Поросенок и перец',
    'И не знаю почему, когда я прочитал это письмо, мне так захотелось, чтобы и вы познакомились с этой прелестной девочкой, что я вдруг махнул рукой на свой "научный труд" и на все свои умные рассуждения и решил попробовать - только попробовать - рассказ',
    'В самом деле - разве по названию догадаешься, что речь пойдет о маленькой (хотя и очень умной!) девочке? Что приключения будут совсем не такие, как обычно: не будет ни шпионов, ни индейцев, ни пиратов, ни сражений, ни землетрясений, ни кораблекрушений, ни даже охоты на крупную дичь.
Как вдруг в один прекрасный день я прочитал письмо Льюиса Кэрролла театральному режиссеру, который решил поставить сказку про Алису на сцене.
Я надеюсь, что вам уже захотелось узнать, как появилась на свет такая необыкновенная сказка и кто ее сочинил.
И еще - доверчивая, готовая поверить в самую невозможную небыль и принять ее с безграничным доверием мечтательницы; и, наконец,- любопытная, отчаянно любопытная и жизнерадостная той жизнерадостностью, какая дается лишь в детстве, когда весь мир нов и прекрасен и когда горе и грех - всего лишь слова, пустые звуки, не означающие ничего!"
Потому что если в голове пусто, увы, самое большое чувство юмора вас не спасет.
Кстати, я не случайно упомянул Ихтиозавров - в'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-07-06T20:06:29.363Z',
      'Совсем немного...'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-06-28T20:27:05.406Z',
      'Согласен с автором!'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-07-01T23:46:52.469Z',
      'Это где ж такие красоты?'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-07-08T17:15:50.464Z',
      'Это где ж такие красоты?'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-07-06T15:42:07.917Z',
      'Ну зачем столько запятых?!!'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-07-06T08:45:56.054Z',
      'Хотел бы я так же написать'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-07-09T17:31:22.397Z',
      'Мне кажется или я уже читал это где-то?'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-06-29T00:25:11.556Z',
      'Хочу такую же футболку :-)'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-08T11:32:10.290Z',
      'Хочу такую же футболку :-)'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Кино')), (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Музыка'));
INSERT INTO pictures (id, original_name) VALUES ('UrsFN', '9.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'heidi.anry@gmail.com',
    'UrsFN',
    '2020-07-04T22:40:42.101Z',
    'Билль вылетает в трубу',
    'Это называется литературной традицией, и тут, как говорится, ничего не попишешь.
И чем больше я ее перечитывал, тем больше она мне нравилась, но чем больше она мне нравилась, тем большая убеждался в том, что перевести ее на русский язык совершенно не',
    'Думаете, так я вам и сказал? Нет, подождите.
По совести говоря, бояться нечего.
Алиса была такая девочка, которой очень трудно было отказать, потому что мистер Доджсон, хотя и был профессором математики (честное слово!) и к тому же в этот день уже сильно устал,- послушался.
Надо знать, кто такие АНТИПОДЫ и что такое ПАРАЛЛЕЛИ и МЕРИДИАНЫ, надо знать, КОГДА ЧТО СЛУЧИЛОСЬ и что такое ТКАНЬ ПОВЕСТВОВАНИЯ; надо знать, из чего НЕ делается ГОРЧИЦА и как правильно играть в КРОКЕТ; кто такие
Есть у меня один знакомый, приблизительно двух лет от роду, у которого огромное чувство юмора - он может захохотать, когда никому другому и в голову не придет улыбнуться.
И чем больше я ее перечитывал, тем больше она мне нравилась, но чем больше она мне нравилась, тем большая убеждался в том, что перевести ее на русский язык совершенно невозможно.
Вы можете достичь всего. Стоит только немного постараться и запастись книгами.
Такое название, по-моему, только сбивает с толку.
Но стоило мне заикнуться об этом'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-07-07T09:42:08.855Z',
      'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-07T19:20:41.421Z',
      'Планируете записать видосик на эту тему?'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-06T17:37:32.812Z',
      'Согласен с автором!'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-07-08T12:39:39.487Z',
      'Плюсую, но слишком много буквы!'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-07T17:41:34.795Z',
      'Мне кажется или я уже читал это где-то?'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-07-09T09:05:18.071Z',
      'Мой кот понятнее излагает.'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-06T12:52:23.843Z',
      'Хотел бы я так же написать'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-07-05T18:10:16.156Z',
      'Мне кажется или я уже читал это где-то?'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-07-05T04:37:59.675Z',
      'Хотел бы я так же написать'
    ), (
      DEFAULT,
      'maryam.otahsm@gmail.com',
      currval('posts_id_seq'),
      '2020-07-10T05:22:30.928Z',
      'Совсем немного...'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-05T03:13:14.089Z',
      'Это где ж такие красоты?'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-07-04T23:14:16.504Z',
      'Планируете записать видосик на эту тему?'
    ), (
      DEFAULT,
      'dexter.lisa@gmail.com',
      currval('posts_id_seq'),
      '2020-07-08T13:26:42.110Z',
      'Согласен с автором!'
    ), (
      DEFAULT,
      'heidi.anry@gmail.com',
      currval('posts_id_seq'),
      '2020-07-09T08:52:41.927Z',
      'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.'
    ), (
      DEFAULT,
      'harry.ytebnha@gmail.com',
      currval('posts_id_seq'),
      '2020-07-07T12:44:38.465Z',
      'Согласен с автором!'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'За жизнь'));