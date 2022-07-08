import React from 'react'
// not sure how else to put the default styles, this the default style for a React Native <Text/> component

const TcFlatList = ({
  data,
  initialNumToRender,
  RenderItem,
  ListHeaderComponent,
  ItemSeparatorComponent,
  misc,
  style
}) => {
console.log('XXXXXXXXXXXXXXX style',style)
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
