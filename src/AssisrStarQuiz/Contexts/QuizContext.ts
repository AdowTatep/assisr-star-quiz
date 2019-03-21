import React from "react";
import CharacterService from "../Services/CharacterService";
import ImageSearchService from "../Services/ImageSearchService";

export interface IQuizContext {
    characterService?: CharacterService;
    imageSearchService?: ImageSearchService;
}

export const quiz: IQuizContext = {
    characterService: new CharacterService(),
    imageSearchService: new ImageSearchService(),
};

export const QuizContext = React.createContext(quiz);
