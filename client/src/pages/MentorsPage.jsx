import { useState, useEffect, useMemo } from 'react';
import MentorCard from '../components/MentorCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import Button from '../components/common/Button.jsx';
import { fetchMentorsApi } from '../services/api.js';
import { mockMentors } from '../mock/mentorsData.js';
import '../styles/MentorsPage.css';

/**
 * MentorsPage Component
 * 
 * Discover volunteer mentors by searching keywords, selecting skill tags,
 * and filtering by availability.
 *
 * @param {Object} props
 * @param {Array} [props.mentorsList] - Optional custom mentors array
 * @param {Function} props.onBookSession - Callback when user clicks "Book Free Session"
 */
function MentorsPage({ mentorsList, onBookSession }) {
  const [mentors, setMentors] = useState(mentorsList || mockMentors);
  const [isOffline, setIsOffline] = useState(false);
  const [loading, setLoading] = useState(!mentorsList);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');

  useEffect(() => {
    if (mentorsList) return;

    let isMounted = true;
    (async () => {
      setLoading(true);
      const result = await fetchMentorsApi();
      if (isMounted) {
        setMentors(result.data);
        setIsOffline(result.isOffline);
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [mentorsList]);

  // Filter mentors based on active criteria
  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      // 1. Text search matching name, role, organization, bio, or skills
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        mentor.name.toLowerCase().includes(query) ||
        mentor.role.toLowerCase().includes(query) ||
        mentor.organization.toLowerCase().includes(query) ||
        mentor.bio.toLowerCase().includes(query) ||
        mentor.skills.some((s) => s.toLowerCase().includes(query));

      // 2. Skill filter chip
      const matchesSkill =
        selectedSkill === 'All' ||
        mentor.skills.some((s) => s.toLowerCase() === selectedSkill.toLowerCase());

      // 3. Availability dropdown
      const matchesAvailability =
        selectedAvailability === 'All' ||
        mentor.availability === selectedAvailability;

      return matchesSearch && matchesSkill && matchesAvailability;
    });
  }, [mentors, searchTerm, selectedSkill, selectedAvailability]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedSkill('All');
    setSelectedAvailability('All');
  };

  return (
    <div className="mentors-page">
      <header className="mentors-page-header">
        <h1>Find Your Volunteer Mentor</h1>
        <p>
          Connect 1-on-1 with experienced tech professionals for free. Get advice on 
          coding, career transitions, and landing your first tech role.
        </p>

        {isOffline && (
          <div
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              backgroundColor: '#eff6ff',
              color: '#1e40af',
              border: '1px solid #bfdbfe',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            ℹ️ Demo Mode: Showing verified sample mentors dataset
          </div>
        )}
      </header>

      {/* Filter and Search Controls */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedSkill={selectedSkill}
        onSkillSelect={setSelectedSkill}
        selectedAvailability={selectedAvailability}
        onAvailabilityChange={setSelectedAvailability}
        matchCount={filteredMentors.length}
        totalCount={mentors.length}
        onReset={handleResetFilters}
      />

      {/* Mentors Grid or Empty State */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          <p>Loading mentors...</p>
        </div>
      ) : filteredMentors.length > 0 ? (
        <div className="mentors-grid" aria-label="Available Mentors">
          {filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              onBookSession={onBookSession}
            />
          ))}
        </div>
      ) : (
        <div className="mentors-empty-state">
          <div className="empty-icon" aria-hidden="true">🔎</div>
          <h3>No mentors match your criteria</h3>
          <p>
            Try adjusting your search terms or clearing your skill filters to see all available volunteers.
          </p>
          <Button variant="outline" onClick={handleResetFilters}>
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
}

export default MentorsPage;
