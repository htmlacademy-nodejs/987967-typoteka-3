
INSERT INTO avatars (id, original_name)
  VALUES ('BtMOu', 'avatar-1.png');

INSERT INTO passwords (id, password)
  VALUES (DEFAULT, '$2b$10$wO6XzLI9ZF2d2w9LZB5oTOQ0oW6F9tWMEIFVe2oONO0IkaR0KP0aC');

INSERT INTO users (email, avatar_id, password_id, firstname, lastname)
  VALUES (
    'amelia.aleif@gmail.com',
    'BtMOu',
    currval('passwords_id_seq'),
    'Amelia',
    'Alfie'
    );

INSERT INTO avatars (id, original_name)
  VALUES ('BQtbB', 'avatar-3.png');

INSERT INTO passwords (id, password)
  VALUES (DEFAULT, '$2b$10$vKjIfWVnuOQZJccEM/OhjeWteNCE/giYR3IRzwidyw3KGm9Js.k5i');

INSERT INTO users (email, avatar_id, password_id, firstname, lastname)
  VALUES (
    'isabelle.albert@gmail.com',
    'BQtbB',
    currval('passwords_id_seq'),
    'Isabelle',
    'Albert'
    );

INSERT INTO avatars (id, original_name)
  VALUES ('bOf2h', 'adorable-2.png');

INSERT INTO passwords (id, password)
  VALUES (DEFAULT, '$2b$10$axtTK/pX6Dvf.YlxmFlBmuoB4Y8164QX6.2amGpVyZ5if73BzJRee');

INSERT INTO users (email, avatar_id, password_id, firstname, lastname)
  VALUES (
    'olivia.seoiph@gmail.com',
    'bOf2h',
    currval('passwords_id_seq'),
    'Olivia',
    'Sophie'
    );

INSERT INTO avatars (id, original_name)
  VALUES ('qCLAp', 'avatar-4.png');

INSERT INTO passwords (id, password)
  VALUES (DEFAULT, '$2b$10$sKopg7xoaszCth3saveLy.TrkoWKD.z7Z0t6J3krp.gyOomzhy4fe');

INSERT INTO users (email, avatar_id, password_id, firstname, lastname)
  VALUES (
    'chloe.sorac@gmail.com',
    'qCLAp',
    currval('passwords_id_seq'),
    'Chloe',
    'Oscar'
    );

INSERT INTO avatars (id, original_name)
  VALUES ('acfkO', 'adorable-3.png');

INSERT INTO passwords (id, password)
  VALUES (DEFAULT, '$2b$10$Ym2ekyWeskG.KJ1qiSZMVuwIqrLMRw.oTfi3VTpxBsCfsrODrhn9K');

INSERT INTO users (email, avatar_id, password_id, firstname, lastname)
  VALUES (
    'ethan.alsi@gmail.com',
    'acfkO',
    currval('passwords_id_seq'),
    'Ethan',
    'Isla'
    );

INSERT INTO categories (id, name) VALUES 
(DEFAULT, 'Деревья'), (DEFAULT, 'За жизнь'), (DEFAULT, 'Без рамки'), (DEFAULT, 'Разное'), (DEFAULT, 'IT'), (DEFAULT, 'Музыка'), (DEFAULT, 'Кино'), (DEFAULT, 'Программирование'), (DEFAULT, 'Железо');
INSERT INTO pictures (id, original_name) VALUES ('t743i', 'sea@1x.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'amelia.aleif@gmail.com',
    't743i',
    '2020-07-19T02:31:01.344Z',
    'Морская кадриль...............',
    'И еще - доверчивая, готовая поверить в самую невозможную небыль и принять ее с безграничным доверием мечтательницы; и, наконец,- любопытная, отчаянно любопытная и жизнерадостная той жизнерадостностью, какая дается лишь в детстве, когда весь мир нов и',
    'undefined'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'isabelle.albert@gmail.com',
      currval('posts_id_seq'),
      '2020-08-04T18:07:17.684Z',
      'Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.'
    ), (
      DEFAULT,
      'chloe.sorac@gmail.com',
      currval('posts_id_seq'),
      '2020-09-13T06:00:58.999Z',
      'Наконец-то нормальный пост!'
    ), (
      DEFAULT,
      'chloe.sorac@gmail.com',
      currval('posts_id_seq'),
      '2020-08-01T23:19:44.462Z',
      'Это где ж такие красоты?'
    ), (
      DEFAULT,
      'chloe.sorac@gmail.com',
      currval('posts_id_seq'),
      '2020-08-02T09:55:52.738Z',
      'Плюсую, но слишком много буквы!'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'IT'));


INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'chloe.sorac@gmail.com',
    null,
    '2020-07-04T18:13:43.902Z',
    'Рок — это протест.............',
    'МОРЕ в ГОРУ.
Да и "Страна Чудес" - тоже не совсем те слова, какие хотелось бы написать в заглавии этой сказки!
Нет, будь моя воля, я назвал бы книжку, например, так: "Аленка в
Я надеюсь, что вам уже захотелось узнать, как появилась на свет такая необ',
    'undefined'
    );

INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Без рамки'));
INSERT INTO pictures (id, original_name) VALUES ('rGf4p', '9.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'chloe.sorac@gmail.com',
    'rGf4p',
    '2020-06-22T22:57:46.860Z',
    'Что такое золотое сечение.....',
    'Правильно, Алисой!
И нужно еще - и это тоже совершенно обязательно! - КОЕ-ЧТО знать.
Надо отдать должное маленькой Алисе (я имею в виду живую Алису, полностью ее звали Алиса Плезенс Лиддел) - она хорошо знала, кого попросить рассказать сказку!
Он нач',
    'undefined'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'olivia.seoiph@gmail.com',
      currval('posts_id_seq'),
      '2020-09-16T10:36:30.447Z',
      'Хотел бы я так же написать'
    ), (
      DEFAULT,
      'olivia.seoiph@gmail.com',
      currval('posts_id_seq'),
      '2020-08-17T19:56:34.483Z',
      'Ну зачем столько запятых?!!'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Программирование'));
INSERT INTO pictures (id, original_name) VALUES ('bHwOl', '9.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'chloe.sorac@gmail.com',
    'bHwOl',
    '2020-07-07T07:06:56.763Z',
    'Кто украл крендели?...........',
    'Тут я за вас совершенно спокоен - уверен, что смеяться вы умеете и любите!
Нет, фокусы с грехом пополам еще получались, но что-то - может быть, самое главное - пропадало, и веселая, умная, озорная, расчудесная сказка становилась малопонятной и - стра',
    'undefined'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'chloe.sorac@gmail.com',
      currval('posts_id_seq'),
      '2020-07-21T00:06:10.081Z',
      'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.'
    ), (
      DEFAULT,
      'chloe.sorac@gmail.com',
      currval('posts_id_seq'),
      '2020-09-09T07:50:55.212Z',
      'Наконец-то нормальный пост!'
    ), (
      DEFAULT,
      'chloe.sorac@gmail.com',
      currval('posts_id_seq'),
      '2020-09-13T01:06:04.899Z',
      'Это где ж такие красоты?'
    ), (
      DEFAULT,
      'isabelle.albert@gmail.com',
      currval('posts_id_seq'),
      '2020-08-01T05:33:22.519Z',
      'Согласен с автором!.'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Без рамки'));
INSERT INTO pictures (id, original_name) VALUES ('m4q2W', '9.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'chloe.sorac@gmail.com',
    'm4q2W',
    '2020-09-15T03:13:54.107Z',
    'Лучше рок-музыканты 20-века...',
    'И вскоре я понял, что самое главное в книжке об Алисе - не загадки, не фокусы, не головоломки, не игра слов и даже не блистательная игра ума, а... сама Алиса.
Освоить вёрстку несложно. Возьмите новую книгу и закрепите все упражнения на практике.
Коне',
    'undefined'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'isabelle.albert@gmail.com',
      currval('posts_id_seq'),
      '2020-09-16T02:23:26.441Z',
      'Наконец-то нормальный пост!'
    ), (
      DEFAULT,
      'olivia.seoiph@gmail.com',
      currval('posts_id_seq'),
      '2020-09-15T15:00:29.607Z',
      'Мой кот понятнее излагает.'
    ), (
      DEFAULT,
      'olivia.seoiph@gmail.com',
      currval('posts_id_seq'),
      '2020-09-16T05:04:03.752Z',
      'Это где ж такие красоты?'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Музыка')), (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Кино'));
INSERT INTO pictures (id, original_name) VALUES ('hLmF5', '4.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'amelia.aleif@gmail.com',
    'hLmF5',
    '2020-07-17T15:27:12.174Z',
    'Учим HTML и CSS...............',
    'Энциклопедический Словарь.
Написаны целые горы книг, в которых "Алису" на все лады растолковывают и объясняют.
Надо знать, кто такие АНТИПОДЫ и что такое ПАРАЛЛЕЛИ и МЕРИДИАНЫ, надо знать, КОГДА ЧТО СЛУЧИЛОСЬ и что такое ТКАНЬ ПОВЕСТВОВАНИЯ; надо зна',
    'undefined'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'isabelle.albert@gmail.com',
      currval('posts_id_seq'),
      '2020-08-15T09:46:51.685Z',
      'Хотел бы я так же написать'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Без рамки'));
INSERT INTO pictures (id, original_name) VALUES ('8wcP3', '1.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'isabelle.albert@gmail.com',
    '8wcP3',
    '2020-07-03T22:56:06.736Z',
    'Кто украл крендели?...........',
    'Поэтому, если вам что-нибудь покажется очень уж непонятным (а главное, не смешным!), не стесняйтесь спрашивать у старших.
Особенно он любил и умел играть... словами.
Это один из лучших рок-музыкантов.
Хотя название "Алиска в Расчудесии" гораздо больш',
    'undefined'
    );

INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Кино')), (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Разное'));
INSERT INTO pictures (id, original_name) VALUES ('qphVo', '6.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'isabelle.albert@gmail.com',
    'qphVo',
    '2020-06-20T01:00:55.554Z',
    'Поросенок и перец.............',
    'Правильно, Алисой!
Конечно, знать ВСЕ эти вещи, по-моему, никто не может - даже Малый
Ну уж, на худой конец: "Алиска в Расчудесии".
Да и то неизвестно, сочинил бы он ее или нет, если бы не одна маленькая девочка, которую звали...
Самые серьезные, сам',
    'undefined'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'olivia.seoiph@gmail.com',
      currval('posts_id_seq'),
      '2020-07-31T18:56:02.318Z',
      'Хочу такую же футболку :-)'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Музыка'));
INSERT INTO pictures (id, original_name) VALUES ('YlGyL', '9.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'olivia.seoiph@gmail.com',
    'YlGyL',
    '2020-06-22T20:47:23.231Z',
    'Как собрать камни бесконечности',
    'Только тогда - почти наверняка! - не сумеете правильно прочитать и всю книжку.
И чем больше я ее перечитывал, тем больше она мне нравилась, но чем больше она мне нравилась, тем большая убеждался в том, что перевести ее на русский язык совершенно нево',
    'undefined'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'chloe.sorac@gmail.com',
      currval('posts_id_seq'),
      '2020-07-14T10:40:08.347Z',
      'Хотел бы я так же написать'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'Кино'));
INSERT INTO pictures (id, original_name) VALUES ('JtokY', '9.jpg');

INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    'chloe.sorac@gmail.com',
    'JtokY',
    '2020-08-17T02:32:36.598Z',
    'Кто украл крендели?...........',
    'Короли и Герцогини, Графы и ЭРЛЫ (в сущности, это одно и то же).
Потому что только настоящий волшебник может подарить девочке - и сказке! - такую долгую-долгую, на века, жизнь!
Там говорилось:
Ну уж, на худой конец: "Алиска в Расчудесии".
Потому что ',
    'undefined'
    );
INSERT INTO comments (id, user_email, post_id, date, text) VALUES (
      DEFAULT,
      'amelia.aleif@gmail.com',
      currval('posts_id_seq'),
      '2020-09-07T00:04:00.008Z',
      'Ну зачем столько запятых?!!'
    ), (
      DEFAULT,
      'isabelle.albert@gmail.com',
      currval('posts_id_seq'),
      '2020-08-23T17:17:24.596Z',
      'Я тоже могу так написать...'
    ), (
      DEFAULT,
      'chloe.sorac@gmail.com',
      currval('posts_id_seq'),
      '2020-08-29T23:22:26.167Z',
      'Хотел бы я так же написать'
    );
INSERT INTO posts_categories (post_id, category_id) VALUES (currval('posts_id_seq'), (SELECT id FROM categories WHERE name = 'IT'));