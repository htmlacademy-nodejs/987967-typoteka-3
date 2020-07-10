-- Получить список всех категорий (идентификатор, наименование категории)

SELECT * FROM categories;



-- Получить список категорий для которых создана минимум одна публикация (идентификатор, наименование категории)

SELECT posts_categories.category_id, categories.name 
FROM posts_categories INNER JOIN categories ON (posts_categories.category_id = categories.id)
GROUP BY category_id, categories.name
HAVING count(posts_categories.category_id) >= 1;



-- Получить список категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории);

SELECT posts_categories.category_id, categories.name, count(posts_categories.category_id) 
FROM posts_categories INNER JOIN categories ON (posts_categories.category_id = categories.id)
GROUP BY category_id, categories.name;



-- Получить список публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие публикации

SELECT t1.post_id AS id, t2.title, t2.announce, t2.text, pictures.original_name AS picture, t2.post_date, users.firstname, users.lastname, users.email, t1.categories, t2.comment_count

FROM 
	(SELECT posts_categories.post_id AS post_id, string_agg(categories.name, ', ') AS categories
		FROM posts_categories INNER JOIN categories ON (posts_categories.category_id = categories.id) 
		GROUP BY posts_categories.post_id) AS t1

INNER JOIN 
	(SELECT posts.date AS post_date, posts.id AS post_id, count(comments.id) AS comment_count, posts.user_email, posts.date, posts.announce, posts.title, posts.text, posts.date, posts.picture_id
		FROM posts INNER JOIN comments ON (posts.id = comments.post_id) 
		GROUP BY posts.id) AS t2

ON (t1.post_id = t2.post_id)

INNER JOIN users ON (t2.user_email = users.email)
INNER JOIN pictures ON (t2.picture_id = pictures.id)
ORDER BY post_date DESC



-- Получить полную информацию определённой публикации (идентификатор публикации, заголовок публикации, анонс, полный текст публикации, дата публикации, путь к изображению, имя и фамилия автора, контактный email, количество комментариев, наименование категорий)

SELECT t1.post_id AS id, t2.title, t2.announce, t2.text, pictures.original_name AS picture, t2.post_date, users.firstname, users.lastname, users.email, t1.categories, t2.comment_count

FROM 
	(SELECT posts_categories.post_id AS post_id, string_agg(categories.name, ', ') AS categories
		FROM posts_categories INNER JOIN categories ON (posts_categories.category_id = categories.id) 
		GROUP BY posts_categories.post_id) AS t1

INNER JOIN 
	(SELECT posts.date AS post_date, posts.id AS post_id, count(comments.id) AS comment_count, posts.user_email, posts.date, posts.announce, posts.title, posts.text, posts.date, posts.picture_id
		FROM posts INNER JOIN comments ON (posts.id = comments.post_id) 
		GROUP BY posts.id) AS t2

ON (t1.post_id = t2.post_id)

INNER JOIN users ON (t2.user_email = users.email)
INNER JOIN pictures ON (t2.picture_id = pictures.id)
WHERE t1.post_id = 1


-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария)

SELECT comments.id, comments.post_id, users.firstname, users.lastname, comments.text
FROM comments INNER JOIN users ON (comments.user_email = users.email)
ORDER BY comments.date DESC
LIMIT 5;



-- Получить список комментариев для определённой публикации (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария). Сначала новые комментарии

SELECT comments.id, comments.post_id, users.firstname, users.lastname, comments.text
FROM comments INNER JOIN users ON (comments.user_email = users.email)
WHERE comments.post_id = 1
ORDER BY comments.date DESC;



-- Обновить заголовок определённой публикации на «Как я встретил Новый год»

UPDATE posts SET title = 'Как я встретил Новый год'
WHERE id = 1;


SELECT posts_categories.post_id, string_agg(categories.name, ', ')
FROM posts_categories 
	INNER JOIN categories ON (posts_categories.category_id = categories.id) 
where posts_categories.post_id = 1
GROUP BY posts_categories.post_id;

SELECT posts.id, count(comments.id)
FROM posts 
	INNER JOIN comments ON (posts.id = comments.post_id) 
where posts.id = 1
GROUP BY posts.id;
