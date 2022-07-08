import styled from "styled-components";
import React from 'react'
// not sure how else to put the default styles, this the default style for a React Native <Text/> component

const TcFlatList = ({
  data,
  RenderItem,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
}) => {
  // console.log(Render)

  // console.log(items, "items");
  console.log('XXXXXXXXXXXX tc flat list', data)

  if (Array.isArray(data)) {
    const render = data.map((v, i) => {
      return RenderItem({ data: v, key: i });
    });

    // console.log(render, "render");

    if (render.length) {
      return (
        <React.Fragment>
          {ListHeaderComponent ? ListHeaderComponent() : null}
          {render}  {ListFooterComponent ? ListFooterComponent() : null}
          </React.Fragment>
        );
      }
  
      return (
        <React.Fragment>
          {ListHeaderComponent ? ListHeaderComponent() : null}
          {ListEmptyComponent ? ListEmptyComponent() : null}
          {ListFooterComponent ? ListFooterComponent() : null}
        </React.Fragment>
      );
    }
  
    if (ListHeaderComponent || ListEmptyComponent || ListEmptyComponent) {
      return (
        <React.Fragment>
          {ListHeaderComponent ? ListHeaderComponent() : null}
  
          {ListEmptyComponent ? ListEmptyComponent() : null}
          {ListFooterComponent ? ListFooterComponent() : null}
        </React.Fragment>
      );
    }
    return null;
  };

export default TcFlatList;
