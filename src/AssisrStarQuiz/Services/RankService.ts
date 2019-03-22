import IRank from "../Interfaces/IRank";

export default class RankService {
    public static insertRank(rank: IRank) {
        const ranks = this.getRanks();
        ranks.push(rank);
        localStorage.setItem("ranks", JSON.stringify(ranks));
    }

    public static getRanks(): IRank[] {
        const ranksStorage = localStorage.getItem("ranks");
        if (ranksStorage) {
            return new Array(JSON.parse(ranksStorage))[0];
        } else {
            return new Array<IRank>();
        }
    }

    public static getPreviousRank(): IRank | undefined {
        const ranks = this.getRanks();

        if (ranks && ranks.length > 0) {
            return ranks[ranks.length - 1];
        } else {
            return undefined;
        }
    }
}
