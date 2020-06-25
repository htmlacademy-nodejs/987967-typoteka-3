'use strict';

const {nanoid} = require(`nanoid`);
const {ID_LENGTH, ANNOUNCE_LENGTH} = require(`./const`);

class DataService {
  constructor(data) {
    this._data = data;
  }

  getPosts() {
    return this._data;
  }

  getPost(id) {
    return this._data.find((it) => it.id === id);
  }

  createPost(post) {
    const createdPost = {
      ...post,
      id: nanoid(ID_LENGTH),
      comments: [],
    };

    if (!Array.isArray(createdPost.categories)) {
      createdPost.categories = [createdPost.categories];
    }

    this._data.push(createdPost);

    return createdPost;
  }

  updatePost(id, post) {
    const index = this._data.findIndex((it) => it.id === id);
    if (index === -1) {
      return null;
    }

    const allCategories = this.getCategories();
    const categories = allCategories.reduce((acc, cur) => {
      return post.categories.find((it) => it.id === cur.id) ? [...acc, cur] : acc;
    }, []);

    this._data[index] = {
      ...this._data[index],
      ...post,
      id,
      categories,
    };

    return this._data[index];
  }

  deletePost(id) {
    const post = this.getPost(id);

    if (!post) {
      return null;
    }

    this._data = this._data.filter((it) => it.id !== id);

    return post;
  }

  getCategories() {
    const categoryMap = new Map();

    this._data.forEach((post) => {
      post.categories.forEach((it) => {
        const id = it.id;
        const countedCategory = categoryMap.get(id) || {
          ...it,
          count: 0,
        };

        countedCategory.count++;
        categoryMap.set(id, countedCategory);
      });
    });

    return Array.from(categoryMap.values());
  }

  getComments(postID) {
    const post = this.getPost(postID);
    if (!post) {
      return null;
    }

    return this.getPost(postID).comments;
  }

  getComment(postID, commentID) {
    const post = this.getPost(postID);
    if (!post) {
      return null;
    }

    return post.comments.find((it) => it.id === commentID);
  }

  createComment(postID, comment) {
    const post = this.getPost(postID);
    if (!post) {
      return null;
    }

    const newComment = {
      ...comment,
      id: nanoid(ID_LENGTH)
    };

    post.comments.push(newComment);
    return newComment;
  }

  deleteComment(postID, commentID) {
    const post = this.getPost(postID);
    if (!post) {
      return null;
    }

    const removedComment = post.comments.find((it) => it.id === commentID);
    post.comments = post.comments.filter((it) => it.id !== commentID);
    return removedComment;
  }

  search(query) {
    const regexp = RegExp(query, `i`);
    return this._data.filter((it) => regexp.test(it.title));
  }

  _getAnnounce(text) {
    return `${text.slice(0, ANNOUNCE_LENGTH)}...`;
  }
}

module.exports = {DataService};
