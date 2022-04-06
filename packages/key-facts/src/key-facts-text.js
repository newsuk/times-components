import React from "react";
import { renderTree } from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import props from "./key-facts-text-prop-types";
import { Text, KeyFactTextLink, BulletContainer, Bullet } from "./styles";

const getTitle = data => {
  if (data.children.length === 1) return data.children[0].attributes.value;

  const linkText = data.children.map(child => child.attributes.value);
  const title = linkText.join(" ");
  return title.length > 0 ? title : " ";
};

const getNavigationOffset = () => {
  const sectionBar = document.querySelector(".OrientationBar");

  if (window.innerWidth < 1024) return 100;
  if (window.innerWidth <= 1320) return 90 + parseInt(sectionBar.offHeight);
  return 40 + parseInt(sectionBar.offHeight);
};

const handleClickEventScrollTo = (event, url) => {
  if (url.charAt(0) === "#") {
    event.preventDefault();

    const target = document.getElementById(url.substring(1));
    if (target) {
      const article = target.parentElement.parentElement;
      const container = article.parentElement;

      window.scroll({
        top:
          container.offsetTop +
          article.offsetTop +
          target.offsetTop -
          getNavigationOffset(),
        behavior: "smooth"
      });
    }
  }
};

const handleClickEventAnalytics = (fireAnalyticsEvent, title, articleFlag) => {
  if (fireAnalyticsEvent) {
    fireAnalyticsEvent({
      action: "Clicked",
      attrs: {
        event_navigation_name: "in-article component clicked : key moments",
        event_navigation_browsing_method: "click",
        article_parent_name: title,
        article_flag: articleFlag
      }
    });
  }
};

const KeyFactsText = ({
  listIndex,
  keyFactItem,
  fireAnalyticsEvent,
  articleFlag
}) => (
  <BulletContainer key={`key-facts-${listIndex}`}>
    <Bullet />
    <Text>
      {keyFactItem.children.map((data, listItemIndex) =>
        renderTree(
          data,
          {
            ...coreRenderers,
            link(key, attributes, renderedChildren) {
              const { href: url } = attributes;
              const title = getTitle(data);

              return (
                <KeyFactTextLink
                  key={key}
                  onClick={event => {
                    handleClickEventAnalytics(
                      fireAnalyticsEvent,
                      title,
                      articleFlag
                    );
                    handleClickEventScrollTo(event, url);
                  }}
                  href={url.charAt(0) === "#" ? null : url}
                >
                  {renderedChildren}
                </KeyFactTextLink>
              );
            }
          },
          `key-facts-${listIndex}-${listItemIndex}`
        )
      )}
    </Text>
  </BulletContainer>
);

KeyFactsText.propTypes = props;

export default KeyFactsText;
export { getTitle };
