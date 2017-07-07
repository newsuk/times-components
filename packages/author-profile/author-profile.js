import React from "react";
import { FlatList, Text } from "react-native";

const Header = ({ name, jobTitle, biography, image, twitter }) =>
  <Text>HEADER</Text>;

const Footer = () => <Text>FOOTER</Text>;

export default function AuthorProfile({
  name,
  jobTitle,
  biography,
  image,
  twitter,
  articleCount,
  currentPageOfArticles,
  currentPageOffset,
  pageSize
}) {
  return (
    <FlatList
      data={currentPageOfArticles}
      keyExtractor={article => article.id}
      ListHeaderComponent={() => <Header />}
      renderItem={({ item }) => <Text>{item.title}</Text>}
      ListFooterComponent={() => <Footer />}
    />
  );
}
