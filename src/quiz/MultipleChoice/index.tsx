import { Question } from "data/questions"
import React, { useState } from "react"
import classnames from "classnames"
import quizStyles from "styles/Quiz.module.scss"
import { FiCheck } from "react-icons/fi"

interface Props {
  question: Question
  formState: Object
  setFormState: Function

  questionIndex: number
  setQuestionIndex: Function

  canContinue: Function

  moveToPreviousQuestion: Function
  moveToNextQuestion: Function
}

const MultipleChoiceQuestion: React.FC<Props> = ({
  question,
  formState,
  setFormState,
  questionIndex,
  setQuestionIndex,

  canContinue,

  moveToPreviousQuestion,
  moveToNextQuestion,
}: Props) => {
  // const [something, setSomething] = useState(props.something);

  const { text, key, choices } = question

  return (
    <div className={quizStyles.question}>
      <h3>
        {questionIndex + 1}. {text}
      </h3>
      <ul className={quizStyles.choiceContainer}>
        {choices.map((choice) => {
          const isCurrentlySelected =
            formState && formState[key] === choice.value && quizStyles.chosen

          return (
            <li
              key={choice.value}
              className={classnames(
                quizStyles.choice,
                isCurrentlySelected && quizStyles.chosen,
              )}
              onClick={() => {
                setFormState({ ...formState, [key]: choice.value })

                if (canContinue()) {
                  moveToNextQuestion()
                }
              }}
            >
              {choice.text}

              {isCurrentlySelected && <FiCheck />}
            </li>
          )
        })}
      </ul>

      <div style={{ marginBottom: "10px" }} />
      <div className={quizStyles.buttonSet}>
        {questionIndex > 0 && (
          <button
            className={quizStyles.leftButton}
            onClick={() => moveToPreviousQuestion()}
          >
            Back
          </button>
        )}
        {formState && formState[key] !== undefined && canContinue() && (
          <button
            className={quizStyles.rightButton}
            onClick={() => moveToNextQuestion()}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default MultipleChoiceQuestion
