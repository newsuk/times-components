import React from 'react'

const TcFlatList = ({
  data,
  initialNumToRender,
  RenderItem,
  ListHeaderComponent,
  ItemSeparatorComponent,
  misc,
  style
}) => {

  if (Array.isArray(data)) {
    const render = data.map((v, i) => {
      if (i < initialNumToRender) {
      return (
      
      <div role="listitem">
      
     { RenderItem({ data: v, key: i })}
{data.length != data[i + 1] && ItemSeparatorComponent({leadingItem: v},misc.editionBreakpoint ) }
      </div>
      )
      }
    });

    if (render.length) {
      return (
        <div role="list" style={style ? style : {}}>
          {ListHeaderComponent || null}
          {render}
          </div>
        );
      }
  
    }

    return null;
  };

export default TcFlatList;
