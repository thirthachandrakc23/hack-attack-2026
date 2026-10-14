import { useState, useMemo } from 'react';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import { mockResources } from '../mock/resourcesData.js';
import '../styles/ResourcesPage.css';

/**
 * ResourcesPage Component
 * 
 * Free curated learning library for students and underserved learners.
 * Allows filtering by category (Frontend, Backend, CS, Career) and search keyword.
 */
function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Frontend',
    'Backend & Python',
    'Full Stack',
    'CS Fundamentals',
    'Data Science',
    'Career & Roadmaps',
  ];

  const filteredResources = useMemo(() => {
    return mockResources.filter((res) => {
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        res.title.toLowerCase().includes(query) ||
        res.description.toLowerCase().includes(query) ||
        res.format.toLowerCase().includes(query);

      const matchesCat =
        selectedCategory === 'All' || res.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="resources-page">
      <header className="resources-header">
        <h1>Free Learning Resources Library</h1>
        <p>
          High-impact, 100% free learning materials and guides curated by our volunteer mentors.
          No hidden paywalls or subscriptions.
        </p>
      </header>

      {/* Filter and Search Box */}
      <div className="resources-filter-card">
        <div className="search-controls-row">
          <div className="search-input-wrapper">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search resources by title, format, or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search learning resources"
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="skill-chips-row">
          <span className="chips-label">Categories:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`chip-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="filter-meta-bar">
          <span>
            Showing <strong>{filteredResources.length}</strong> of {mockResources.length} free resources
          </span>
          {(searchTerm || selectedCategory !== 'All') && (
            <button
              type="button"
              className="reset-filters-btn"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length > 0 ? (
        <div className="resources-grid" aria-label="Learning Resources">
          {filteredResources.map((res) => (
            <article key={res.id} className="resource-card">
              <div className="resource-card-badges">
                <Badge variant="skill">{res.category}</Badge>
                <Badge variant="info">{res.difficulty}</Badge>
                {res.highlight && <Badge variant="status">{res.highlight}</Badge>}
              </div>

              <h2 className="resource-card-title">{res.title}</h2>
              <p className="resource-card-desc">{res.description}</p>

              <div className="resource-card-meta">
                <span>📚 {res.format}</span>
                <span style={{ color: '#16a34a', fontWeight: 600 }}>100% Free</span>
              </div>

              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link-btn"
              >
                <Button variant="outline" size="sm" style={{ width: '100%' }}>
                  Open Free Resource ↗
                </Button>
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="mentors-empty-state">
          <div className="empty-icon" aria-hidden="true">📖</div>
          <h3>No resources match your search</h3>
          <p>Try clearing your search query or selecting "All" categories.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
}

export default ResourcesPage;
