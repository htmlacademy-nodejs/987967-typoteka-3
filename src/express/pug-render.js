'use strict';

const path = require(`path`);
const pug = require(`pug`);
const {COMMENT_PREVIEW_LENGTH, ANNOUNCE_PREVIEW_LENGTH} = require(`./const`);
const {reduceText} = require(`./utils`);

const TEMPLATE_FOLDER = `templates/includes`;

const PugTemplateName = {
  POPULAR_POSTS: `popular-post-list.pug`,
  RECENT_COMMENTS: `recent-comment-list.pug`,
  POST_COMMENTS: `post-comments.pug`,
};

const getCompileFunctions = (templateNames) => {
  const compileFunctions = {};

  Object.values(templateNames).forEach((templateName) => {
    compileFunctions[templateName] = pug.compileFile(path.resolve(__dirname, TEMPLATE_FOLDER, templateName));
  });

  return compileFunctions;
};

const getDataAdapters = () => ({
  [PugTemplateName.POPULAR_POSTS]: (data) => ({
    popularPosts: data.posts.filter((it) => it[`comment_count`] > 0).map((it) => ({
      ...it,
      announce: reduceText(it.announce, ANNOUNCE_PREVIEW_LENGTH),
    }))
  }),

  [PugTemplateName.RECENT_COMMENTS]: (data) => ({
    comments: data.map((it) => ({
      ...it,
      text: reduceText(it.text, COMMENT_PREVIEW_LENGTH),
    }))
  }),

  [PugTemplateName.POST_COMMENTS]: (data) => ({
    comments: data.comments,
  }),
});

const getRenderFunctions = (templateNames, compileFunctions, dataAdapters) => {
  const renderFunctions = {};

  Object.values(templateNames).forEach((templateName) => {
    const dataAdapter = dataAdapters[templateName];
    const compileFunction = compileFunctions[templateName];

    const renderFunction = dataAdapter ?
      (data) => compileFunction(dataAdapter(data)) :
      (data) => compileFunction(data);

    renderFunctions[templateName] = renderFunction;
  });

  return renderFunctions;
};

const PugCompileFunction = getCompileFunctions(PugTemplateName);
const PugDataAdapter = getDataAdapters(PugTemplateName);
const PugRender = getRenderFunctions(PugTemplateName, PugCompileFunction, PugDataAdapter);

module.exports = {
  PugTemplateName,
  PugCompileFunction,
  PugDataAdapter,
  PugRender,
};
