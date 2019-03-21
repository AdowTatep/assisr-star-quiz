import { ICharacter } from "./ICharacter";

export interface IPeople {
    count?: number;
    next?: string;
    previous?: string;
    results?: ICharacter[];
}
