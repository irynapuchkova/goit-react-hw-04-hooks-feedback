import 'normalize.css';

import { useState } from 'react';

import Section from 'Components/Section ';
import Statistics from 'Components/Statistics';
import FeedbackOptions from 'Components/FeedbackOptions';
import Notification from 'Components/Notification';
import { Container } from './App.styled';

export default function App() {
  const [goodMark, setGoodMark] = useState(0);
  const [neutralMark, setNeutralMark] = useState(0);
  const [badMark, setBadMark] = useState(0);

  const options = ['good', 'bad', 'neutral'];

  const onClick = e => {
    switch (e.target.textContent.toLowerCase()) {
      case 'good':
        setGoodMark(state => state + 1);
        break;
      case 'neutral':
        setNeutralMark(state => state + 1);
        break;
      case 'bad':
        setBadMark(state => state + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    const total = goodMark + neutralMark + badMark;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const positivePercentage = (goodMark * 100) / total;
    const parsedPositivePercentage = Number.parseInt(positivePercentage);
    return parsedPositivePercentage;
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <Container>
      <Section title="Please, tell us about us)))" primary>
        <FeedbackOptions options={options} onLeaveFeedback={onClick} />
      </Section>
      <Section title="Statistics">
        {total === 0 && <Notification message="No feedback given" />}
        {total !== 0 && (
          <Statistics
            good={goodMark}
            neutral={neutralMark}
            bad={badMark}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </Container>
  );
}
