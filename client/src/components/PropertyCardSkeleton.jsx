import "./PropertyCardSkeleton.css";
export default function PropertyCardSkeleton() {
  return (
    <div className="property-skeleton">
      <div className="property-skeleton-image">
        <div className="property-skeleton-badges">
          <div className="skeleton badge"></div>
          <div className="skeleton badge"></div>
        </div>

        <div className="property-skeleton-info">
          <div className="skeleton price"></div>
          <div className="skeleton title"></div>
          <div className="skeleton location"></div>
        </div>
      </div>

      <div className="property-skeleton-body">
        <div className="skeleton desc"></div>
        <div className="skeleton desc short"></div>

        <div className="property-skeleton-specs">
          <div className="skeleton spec"></div>
          <div className="skeleton spec"></div>
          <div className="skeleton spec"></div>
        </div>

        <div className="property-skeleton-tags">
          <div className="skeleton tag"></div>
          <div className="skeleton tag"></div>
          <div className="skeleton tag"></div>
        </div>

        <div className="property-skeleton-actions">
          <div className="skeleton btn primary"></div>
          <div className="skeleton btn secondary"></div>
        </div>
      </div>
    </div>
  );
}