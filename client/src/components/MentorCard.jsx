import Badge from './common/Badge.jsx';
import Button from './common/Button.jsx';
import '../styles/MentorCard.css';

/**
 * MentorCard Component
 * 
 * Displays mentor profile card with bio, skills, rating, availability status,
 * and a booking trigger action.
 *
 * @param {Object} props
 * @param {Object} props.mentor - Mentor data object
 * @param {Function} props.onBookSession - Callback when booking button is clicked
 */
function MentorCard({ mentor, onBookSession }) {
  if (!mentor) return null;

  const {
    name = 'Volunteer Mentor',
    role = 'Software Engineer',
    organization = 'Tech Volunteer',
    bio = '',
    skills = [],
    availability = 'Available this week',
    rating = 5.0,
    sessionsCompleted = 0,
    initials,
  } = mentor;

  // Derive initials if not provided
  const avatarInitials =
    initials ||
    name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  return (
    <article className="mentor-card" aria-label={`Mentor profile for ${name}`}>
      {/* Header with Avatar and Basic Info */}
      <div className="mentor-header">
        <div className="mentor-avatar" aria-hidden="true">
          {avatarInitials}
        </div>
        <div className="mentor-title-info">
          <h3 className="mentor-name">{name}</h3>
          <p className="mentor-role">{role}</p>
          <p className="mentor-org">{organization}</p>
        </div>
      </div>

      {/* Meta row: Rating, Sessions, Availability */}
      <div className="mentor-meta-row">
        <div className="mentor-stats">
          <span className="mentor-rating" title={`${rating} out of 5 stars`}>
            ★ {Number(rating).toFixed(1)}
          </span>
          <span className="mentor-sessions">
            ({sessionsCompleted} {sessionsCompleted === 1 ? 'session' : 'sessions'})
          </span>
        </div>
        <Badge variant="status">{availability}</Badge>
      </div>

      {/* Mentor Bio */}
      <p className="mentor-bio">{bio}</p>

      {/* Skill Badges */}
      <div>
        <div className="mentor-skills-label">Expertise & Topics</div>
        <div className="mentor-skills">
          {skills.map((skill) => (
            <Badge key={skill} variant="skill">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mentor-card-footer">
        <Button
          variant="primary"
          className="mentor-book-btn"
          onClick={() => onBookSession && onBookSession(mentor)}
        >
          Book Free Session
        </Button>
      </div>
    </article>
  );
}

export default MentorCard;
