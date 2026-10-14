import '../styles/FilterBar.css';

/**
 * FilterBar Component
 * 
 * Provides search input, skill tags filter chips, availability dropdown,
 * and clear filter controls.
 *
 * @param {Object} props
 * @param {string} props.searchTerm - Current text search value
 * @param {Function} props.onSearchChange - Callback for search input
 * @param {string} props.selectedSkill - Currently active skill filter
 * @param {Function} props.onSkillSelect - Callback when a skill chip is selected
 * @param {string} props.selectedAvailability - Currently selected availability
 * @param {Function} props.onAvailabilityChange - Callback for availability dropdown
 * @param {number} props.matchCount - Total matched items
 * @param {number} props.totalCount - Total items available
 * @param {Function} props.onReset - Callback to clear all active filters
 */
function FilterBar({
  searchTerm,
  onSearchChange,
  selectedSkill,
  onSkillSelect,
  selectedAvailability,
  onAvailabilityChange,
  matchCount,
  totalCount,
  onReset,
}) {
  const skillChips = [
    'All',
    'React',
    'JavaScript',
    'Python',
    'Node.js',
    'Data Science',
    'Interview Prep',
    'UX Design',
    'Cloud & DevOps',
  ];

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    selectedSkill !== 'All' ||
    selectedAvailability !== 'All';

  return (
    <div className="filter-bar-container" role="search" aria-label="Mentor Filters">
      {/* Search Input & Availability Select */}
      <div className="search-controls-row">
        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by mentor name, role, organization, or skill..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search mentors"
          />
          {searchTerm && (
            <button
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search text"
              title="Clear search text"
            >
              ✕
            </button>
          )}
        </div>

        <select
          className="availability-select"
          value={selectedAvailability}
          onChange={(e) => onAvailabilityChange(e.target.value)}
          aria-label="Filter by availability"
        >
          <option value="All">All Availability</option>
          <option value="This Week">This Week</option>
          <option value="Weekend">Weekend</option>
          <option value="Evening">Evening</option>
        </select>
      </div>

      {/* Skill Pills */}
      <div className="skill-chips-row">
        <span className="chips-label">Popular Skills:</span>
        {skillChips.map((skill) => (
          <button
            key={skill}
            type="button"
            className={`chip-btn ${selectedSkill === skill ? 'active' : ''}`}
            onClick={() => onSkillSelect(skill)}
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Results summary and reset */}
      <div className="filter-meta-bar">
        <span>
          Showing <strong>{matchCount}</strong> of {totalCount} volunteer mentors
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            className="reset-filters-btn"
            onClick={onReset}
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
