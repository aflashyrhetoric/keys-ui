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

  const { text, key, choices, pictorial } = question

  return (
    <div className={quizStyles.question}>
      <div>
        <h3>
          {questionIndex + 1}. {text}
        </h3>
        <ul
          className={classnames(
            quizStyles.choiceContainer,
            pictorial && quizStyles.pictorialChoiceContainer,
          )}
        >
          {choices.map((choice) => {
            const { text, value, imgPath } = choice

            const isCurrentlySelected =
              formState && formState[key] === value && quizStyles.chosen

            return (
              <li
                key={value}
                className={classnames(
                  quizStyles.choice,
                  pictorial && quizStyles.imageChoice,
                  isCurrentlySelected && quizStyles.chosen,
                )}
                style={
                  pictorial
                    ? {
                        background: `url('/choice-images/${imgPath}.png')`,
                      }
                    : {}
                }
                onClick={() => {
                  setFormState({ ...formState, [key]: value })

                  if (canContinue()) {
                    moveToNextQuestion()
                  }
                }}
              >
                {text}

                {isCurrentlySelected && <FiCheck />}
              </li>
            )
          })}
        </ul>
      </div>

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
