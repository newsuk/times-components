import React from 'react';

import { ArticlePage, ArticleBody, Paragraph } from './styles';

export const ArticleHarness: React.FC = ({ children }) => {
  return (
    <ArticlePage>
      <ArticleBody>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          eleifend quis purus eget consequat. Maecenas pellentesque lorem at
          ipsum egestas sagittis. Quisque eget nisi sed diam auctor luctus.
          Pellentesque rutrum sem nibh, at placerat elit iaculis in. Curabitur
          nec turpis nec nisi pulvinar pharetra.
        </Paragraph>
        <Paragraph>
          Aenean hendrerit erat non augue sagittis rhoncus. Praesent diam lacus,
          vehicula ut ante et, cursus finibus justo. Curabitur sollicitudin
          turpis nec diam ullamcorper, sed fermentum diam tempor. Integer
          maximus ultrices sem, eu facilisis magna condimentum ut. Curabitur
          orci odio, ornare in ipsum quis, cursus scelerisque sem.
        </Paragraph>
        {children}
        <Paragraph>
          Maecenas ultricies risus at libero vulputate, non accumsan ex iaculis.
          In vel facilisis sapien. Nam imperdiet, elit a mattis consectetur, ex
          purus efficitur eros, nec condimentum mi tortor facilisis orci. Donec
          sodales felis tortor, ut dignissim turpis rhoncus ut. Quisque lacinia
          ornare tortor at convallis.
        </Paragraph>
        <Paragraph>
          Praesent ac elit quis metus vulputate facilisis. Quisque ac dolor eu
          felis pharetra dignissim. Sed tristique egestas sollicitudin. Nulla
          varius, risus ornare tristique lobortis, est libero vestibulum diam,
          nec mollis turpis ligula eget nibh. Praesent facilisis sem lectus, et
          consectetur sem fringilla non. Pellentesque condimentum est sed nisl
          porttitor ultricies.
        </Paragraph>
      </ArticleBody>
    </ArticlePage>
  );
};
