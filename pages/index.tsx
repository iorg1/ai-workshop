import Head from "next/head";
import { useState } from "react";
import type { TravelPlan, DayPlan, Activity, Accommodation, Transport } from "../src/types/travel.js";
import styles from "./index.module.css";

// ── Sub-components ──────────────────────────────────────────

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className={styles.activityItem}>
      <div className={styles.activityName}>{activity.name}</div>
      <div className={styles.activityMeta}>⏱ {activity.duration}</div>
      <div className={styles.activityDescription}>{activity.description}</div>
      {activity.tips && (
        <div className={styles.activityTips}>💡 {activity.tips}</div>
      )}
    </div>
  );
}

function AccommodationCard({ accommodation }: { accommodation: Accommodation }) {
  return (
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
}

function TransportCard({ transport }: { transport: Transport }) {
  return (
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
}

function DayCard({ day }: { day: DayPlan }) {
  return (
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
}

// ── Main page ───────────────────────────────────────────────

export default function HomePage() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<TravelPlan | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    setError(null);
    setPlan(null);

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      const data = (await res.json()) as { plan?: TravelPlan; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to generate travel plan");
      }

      setPlan(data.plan ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>AI Travel Planner</title>
        <meta name="description" content="Get a personalised day-by-day travel itinerary powered by Google AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.pageWrapper}>
        <header className={styles.header}>
          <h1>✈️ AI Travel Planner</h1>
          <p>Describe your trip and get a personalised day-by-day itinerary powered by Google AI</p>
        </header>

        <form className={styles.formCard} onSubmit={handleSubmit}>
          <label htmlFor="description">Describe your trip</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. A 5-day trip to Tokyo in spring, interested in culture, food and technology. Budget is moderate."
            disabled={loading}
            required
          />
          <p className={styles.formHint}>
            Include the destination, number of days, interests, and budget for the best results.
          </p>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading || !description.trim()}
          >
            {loading ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Generating your plan…
              </>
            ) : (
              "Generate Travel Plan"
            )}
          </button>
        </form>

        {error && (
          <div className={styles.errorBox} role="alert">
            ⚠️ {error}
          </div>
        )}

        {plan && (
          <section>
            <div className={styles.planHeader}>
              <h2>Your Itinerary</h2>
              <span className={styles.dayCountBadge}>{plan.length} days</span>
            </div>
            <div className={styles.daysGrid}>
              {plan.map((day) => (
                <DayCard key={day.day} day={day} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
