import { Question } from "data/questions"
import React, { useState } from "react"
import classnames from "classnames"
import quizStyles from "styles/Quiz.module.scss"
import { FiCheck } from "react-icons/fi"

interface Props {
  question: Question
  userPrefs: Object
  setUserPrefs: Function

  questionIndex: number
  setQuestionIndex: Function

  canContinue: Function

  moveToPreviousQuestion: Function
  moveToNextQuestion: Function
}

const MultipleChoiceQuestion: React.FC<Props> = ({
  question,
  userPrefs,
  setUserPrefs,
  questionIndex,
  // setQuestionIndex,

  canContinue,

  moveToPreviousQuestion,
  moveToNextQuestion,
}: Props) => {
  const { text, key, choices, pictorial } = question

  return (
    <div className={quizStyles.question}>
      <div>
        <h3 style={{ marginBottom: "10px" }}>
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
              userPrefs && userPrefs[key] === value && quizStyles.chosen

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
                        background: `url('/choice-images/${
                          imgPath || "default"
                        }.png'), url('/choice-images/default.png')`,
                        backgroundSize: "cover",
                      }
                    : {}
                }
                onClick={() => {
                  setUserPrefs({ [key]: value })

                  if (canContinue()) {
                    moveToNextQuestion()
                  }
                }}
              >
                {!pictorial && text}

                {isCurrentlySelected && <FiCheck />}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default MultipleChoiceQuestion
