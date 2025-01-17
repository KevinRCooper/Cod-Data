import { CodData } from "@/components/upload/Upload.types";

export const getTotalMatches = (data: CodData) => {
    return data.length.toLocaleString();
};

export const getTotalKills = (data: CodData) => {
    return data.reduce((total, record) => total + record.Kills, 0).toLocaleString();
};

export const getAverageKillsPerMatch = (data: CodData) => {
    const totalKills = data.reduce((total, record) => total + record.Kills, 0);
    return (totalKills / data.length).toFixed(2).toLocaleString();
};

export const getTotalDeaths = (data: CodData) => {
    return data.reduce((total, record) => total + record.Deaths, 0).toLocaleString();
};

export const getAverageDeathsPerMatch = (data: CodData) => {
    const totalDeaths = data.reduce((total, record) => total + record.Deaths, 0);
    return (totalDeaths / data.length).toFixed(2).toLocaleString();
};

export const getKillDeathRatio = (data: CodData) => {
    const totalKills = data.reduce((total, record) => total + record.Kills, 0); 
    const totalDeaths = data.reduce((total, record) => total + record.Deaths, 0); 

    const result = totalDeaths === 0 ? totalKills : totalKills / totalDeaths;
    return result.toFixed(2).toLocaleString();
};

export const getWinLossRatio = (data: CodData) => {
    const totalWins = data.filter((record) => record["Match Outcome"] === "win").length;
    const totalLosses = data.filter((record) => record["Match Outcome"] === "loss").length;

    const result = totalLosses === 0 ? totalWins : totalWins / totalLosses;
    return result.toFixed(2).toLocaleString();
};

export const getAverageSkill = (data: CodData) => {
    const totalSkill = data.reduce((total, record) => total + record.Skill, 0);
    return (totalSkill / data.length).toFixed(2);
};

export const getAverageScore = (data: CodData) => {
    const totalScore = data.reduce((total, record) => total + record.Score, 0);
    const averageScore = data.length === 0 ? 0 : Math.floor(totalScore / data.length);
    return averageScore.toLocaleString();
};

export const getHighestStreak = (data: CodData) => {
    return data.reduce((highest, record) => Math.max(highest, record["Longest Streak"]), 0).toLocaleString();
};

export const getAveragePercentageOfTimeMoving = (data: CodData) => {
    const totalPercentageOfTimeMoving = data.reduce(
        (total, record) => total + parseFloat(record["Percentage Of Time Moving"]),
        0
    );
    const averagePercentage = totalPercentageOfTimeMoving / data.length;
    return `${averagePercentage.toFixed(2).toLocaleString()}%`;
};

export const getAverageDamageDone = (data: CodData): number => {
    const totalDamageDone = data.reduce((total, record) => total + record["Damage Done"], 0);
    return data.length === 0 ? 0 : Math.floor(totalDamageDone / data.length);
};

export const getAverageDamageTaken = (data: CodData): number => {
    const totalDamageTaken = data.reduce((total, record) => total + record["Damage Taken"], 0);
    return data.length === 0 ? 0 : Math.floor(totalDamageTaken / data.length);
};

export const getAverageDamageDoneVsTaken = (data: CodData) => {
    const averageDamageDone = getAverageDamageDone(data);
    const averageDamageTaken = getAverageDamageTaken(data);

    return `${averageDamageDone.toLocaleString()} vs ${averageDamageTaken.toLocaleString()}`;
};

export const getMostPlayedMap = (data: CodData) => {
    const mapCounts = data.reduce((counts, record) => {
        const map = record.Map;
        counts[map] = counts[map] ? counts[map] + 1 : 1;
        return counts;
    }, {} as Record<string, number>);

    const mostPlayedMap = Object.entries(mapCounts).reduce((mostPlayed, [map, count]) => {
        return count > mostPlayed.count ? { map, count } : mostPlayed;
    }, { map: "", count: 0 });

    return mostPlayedMap.map;
};

export const getMostPlayedGameType = (data: CodData) => {
    const modeCounts = data.reduce((counts, record) => {
        const mode = record["Game Type"];
        counts[mode] = counts[mode] ? counts[mode] + 1 : 1;
        return counts;
    }, {} as Record<string, number>);

    const mostPlayedMode = Object.entries(modeCounts).reduce((mostPlayed, [mode, count]) => {
        return count > mostPlayed.count ? { mode, count } : mostPlayed;
    }, { mode: "", count: 0 });

    return mostPlayedMode.mode;
};

export const getHighestPrestige = (data: CodData) => {
    return data.reduce((highest, record) => Math.max(highest, record["Prestige at End"]), 0).toLocaleString();
};