'use client';

import Giscus from '@giscus/react';

const Comments = ({ repo, repoId, category, categoryId }) => {
  return (
    <Giscus
      id="comments"
      src="https://giscus.app/client.js"
      repo={repo}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping="pathname"
      term="welcome to bugworld."
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="en"
      loading="lazy"
    />
  );
};

export default Comments;
