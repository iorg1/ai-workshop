import type { Accommodation } from "../types/travel";
import styles from "../../pages/index.module.css";

const AccommodationCard = ({ accommodation }: { accommodation: Accommodation }) => (
  <div className={styles.accommodationCard}>
    <div className={styles.accommodationName}>{accommodation.name}</div>
    <div className={styles.accommodationMeta}>
      🏨 {accommodation.type}
      {accommodation.estimatedCostPerNight && (
        <span> · {accommodation.estimatedCostPerNight} / night</span>
      )}
    </div>
    <div className={styles.accommodationDescription}>{accommodation.description}</div>
  </div>
);

export default AccommodationCard;
