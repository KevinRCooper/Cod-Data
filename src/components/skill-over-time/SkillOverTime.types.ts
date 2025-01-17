import { CodDataRecord } from "../upload/Upload.types";

/**
 * Props for the SkillOverTime component.
 */
export type SkillOverTimeProps = {
    /**
     * Array of skill data points, where each point includes the skill level and timestamp.
     */
    data: Array<{
        Skill: CodDataRecord["Skill"];
        "UTC Timestamp": CodDataRecord["UTC Timestamp"];
    }>;
};
