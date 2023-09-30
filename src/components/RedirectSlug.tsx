import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import config from '../config.json';

export const RedirectSlug = () => {
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) {
      return;
    }

    window.location.href = `${config.domain}/${slug}`;
  }, [slug]);

  return (<></>);
};