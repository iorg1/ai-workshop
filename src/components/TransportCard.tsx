import type { Transport } from "../types/travel";
import styles from "../../pages/index.module.css";

const TransportCard = ({ transport }: { transport: Transport }) => (
  <div className={styles.transportItem}>
    <span className={styles.transportMethod}>{transport.method}</span>
    <span className={styles.transportRoute}>
      {transport.from} → {transport.to}
    </span>
    <span className={styles.transportMeta}>
      ⏱ {transport.duration}
      {transport.estimatedCost && <> · {transport.estimatedCost}</>}
    </span>
  </div>
);

export default TransportCard;
