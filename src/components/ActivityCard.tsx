import type { Activity } from "../types/travel.js";
import styles from "../../pages/index.module.css";

const ActivityCard = ({ activity }: { activity: Activity }) => (
  <div className={styles.activityItem}>
    <div className={styles.activityName}>{activity.name}</div>
    <div className={styles.activityMeta}>⏱ {activity.duration}</div>
    <div className={styles.activityDescription}>{activity.description}</div>
    {activity.tips && (
      <div className={styles.activityTips}>💡 {activity.tips}</div>
    )}
  </div>
);

export default ActivityCard;
