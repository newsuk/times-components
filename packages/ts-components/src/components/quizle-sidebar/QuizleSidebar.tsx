import React, { FC, useEffect, useState } from 'react';
import {
  QuestionIcon,
  Container,
  Titletag,
  Divider,
  Link,
  Title,
  TitleIconContainer,
  Bottom
} from './styles';
import { useTrackingContext } from '../../helpers/tracking/TrackingContextProvider';
import { handleClick } from './tracking-helpers';

export interface QuizleSideBarProps {
  sectionTitle: string;
  pageLink: string;
}

export const QuizleSidebar: FC<QuizleSideBarProps> = ({
  sectionTitle,
  pageLink
}) => {
  const { fireAnalyticsEvent } = useTrackingContext();
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  const backupQuestion = [
    {
      id: 0,
      publishDate: '2024-10-29T00:00:00.000Z',
      question:
        "Which type of dog gets its name from the Welsh words for 'dwarf' and 'dog'?",
      solution: 'Corgi'
    }
  ];
  // fetching quizle question from api
  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        'https://tnl-render.tools.news/production/content/puzzles/quizle/questions.json'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return backupQuestion;
    }
  };

  const findTodaysQuestion = (questions: typeof backupQuestion) => {
    const today = new Date().toDateString();
    const todaysQuestion = questions.find(
      q => new Date(q.publishDate).toDateString() === today
    );
    return todaysQuestion && todaysQuestion.question
    ? todaysQuestion.question
    : backupQuestion[0].question;
  };

  useEffect(() => {
    const loadQuestion = async () => {
      const questions = await fetchQuestions();
      const question = findTodaysQuestion(questions);
      setCurrentQuestion(question);
    };

    loadQuestion();
  }, []);

  return (
    <Container>
      <>
        <TitleIconContainer>
          <div>
            <Titletag>BETA</Titletag>
            <Link
              href={pageLink}
              onClick={() =>
                handleClick(
                  fireAnalyticsEvent,
                  'quizle sidebar: header selected'
                )
              }
              className="trigger"
            >
              <Title>{sectionTitle}</Title>
            </Link>
          </div>
          <QuestionIcon />
        </TitleIconContainer>
      </>
      <Divider />
      <Bottom>
        <p>
          <span className="q-icon">Q: </span>
          {currentQuestion}
        </p>
        <Link
          href={pageLink}
          onClick={() =>
            handleClick(fireAnalyticsEvent, 'quizle sidebar: link selected')
          }
          className="quizle-link"
        >
          Test your knowledge
          <span className="q-arrow" />
        </Link>
      </Bottom>
      <Divider />
    </Container>
  );
};
