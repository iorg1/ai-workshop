import type { DayPlan } from "../types/travel.js";
import styles from "../../pages/index.module.css";
import ActivityCard from "./ActivityCard.js";
import AccommodationCard from "./AccommodationCard.js";
import TransportCard from "./TransportCard.js";

const DayCard = ({ day }: { day: DayPlan }) => (
  <div className={styles.dayCard}>
    <div className={styles.dayCardHeader}>
      <div>
        <div className={styles.dayNumber}>Day {day.day}</div>
        <div className={styles.dayTitle}>{day.title}</div>
      </div>
      {day.date && <div className={styles.dayDate}>{day.date}</div>}
    </div>

    <div className={styles.dayCardBody}>
      {/* Activities */}
      <div>
        <div className={`${styles.sectionTitle} ${styles.activities}`}>🗺 Activities</div>
        <div className={styles.activitiesList}>
          {day.activities.map((activity, i) => (
            <ActivityCard key={i} activity={activity} />
          ))}
        </div>
      </div>

      {/* Accommodation */}
      <div>
        <div className={`${styles.sectionTitle} ${styles.accommodation}`}>🛏 Accommodation</div>
        <AccommodationCard accommodation={day.accommodation} />
      </div>

      {/* Transport */}
      {day.transport.length > 0 && (
        <div>
          <div className={`${styles.sectionTitle} ${styles.transport}`}>🚆 Transport</div>
          <div className={styles.transportList}>
            {day.transport.map((t, i) => (
              <TransportCard key={i} transport={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default DayCard;
