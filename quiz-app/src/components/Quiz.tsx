import { FC, useState } from "react";
import { Question } from "../questions";

type Props = {
  questions: Question[];
};

const Quiz: FC<Props> = ({ questions }) => {
  const [index, setIndex] = useState(0); //index of Question
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const question = questions[index]; //Question

  const highlightAnswer = (answerIndex: number): string | undefined => {
    if (selectedAnswer === null) {
      return undefined;
    } else if (answerIndex === question.answer) {
      return "correct";
    } else if (
      answerIndex === selectedAnswer &&
      answerIndex !== question.answer
    ) {
      return "wrong";
    }
  };

  const next = () => {
    if (index === questions.length - 1) {
      setFinished(true);
    } else {
      setIndex(index + 1);
      setSelectedAnswer(null);
    }

    if (selectedAnswer === question.answer) {
      setScore(score + 1);
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setFinished(false);
  };

  return (
    <div className="container">
      <h1>Trivia Quiz</h1>
      <hr />
      {finished ? (
        <>
          <h2>
            You scored {score} points out of {questions.length} <br />
          </h2>
          <button className="btn" onClick={reset}>
            Start again
          </button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            {question.choices.map((choice, index) => (
              <li
                key={choice}
                onClick={() => !selectedAnswer && setSelectedAnswer(index)}
                className={highlightAnswer(index)}
              >
                {choice}
              </li>
            ))}
          </ul>
          <button className="btn" onClick={next}>
            Next
          </button>
          <div className="index">
            {index + 1} of {questions.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
