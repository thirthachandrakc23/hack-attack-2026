import { useState } from 'react';
import Button from './common/Button.jsx';

/**
 * MentorForm Component
 * 
 * Registration form for volunteer tech mentors offering free guidance.
 *
 * @param {Object} props
 * @param {Function} props.onSubmitSuccess - Callback passing the created mentor profile
 */
function MentorForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    currentRole: '',
    organization: '',
    skills: '',
    weeklyHours: '1-2 hours/week',
    bio: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.currentRole.trim()) errs.currentRole = 'Please enter your role or title';
    if (!formData.organization.trim()) errs.organization = 'Please enter your company or school';
    if (!formData.skills.trim()) errs.skills = 'Please enter skills you can mentor (e.g. React, Python)';
    if (!formData.bio.trim()) errs.bio = 'Please add a short bio to introduce yourself to learners';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess({
        role: 'mentor',
        ...formData,
        skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
      });
    }, 400);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">Volunteer Mentor Application</h2>
      <p className="form-desc">
        Share your industry experience with students who need guidance the most. 100% voluntary, flexible hours.
      </p>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="mentor-name">
            Full Name *
          </label>
          <input
            id="mentor-name"
            name="fullName"
            type="text"
            className={`form-input ${errors.fullName ? 'has-error' : ''}`}
            placeholder="e.g. Sarah Jenkins"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="mentor-email">
            Email Address *
          </label>
          <input
            id="mentor-email"
            name="email"
            type="email"
            className={`form-input ${errors.email ? 'has-error' : ''}`}
            placeholder="sarah@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="mentor-role">
            Current Title / Role *
          </label>
          <input
            id="mentor-role"
            name="currentRole"
            type="text"
            className={`form-input ${errors.currentRole ? 'has-error' : ''}`}
            placeholder="e.g. Senior Software Engineer"
            value={formData.currentRole}
            onChange={handleChange}
          />
          {errors.currentRole && <span className="error-text">{errors.currentRole}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="mentor-org">
            Company / Organization *
          </label>
          <input
            id="mentor-org"
            name="organization"
            type="text"
            className={`form-input ${errors.organization ? 'has-error' : ''}`}
            placeholder="e.g. OpenTech Corp or Freelance"
            value={formData.organization}
            onChange={handleChange}
          />
          {errors.organization && <span className="error-text">{errors.organization}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="mentor-skills">
            Skills / Topics You Can Mentor (comma-separated) *
          </label>
          <input
            id="mentor-skills"
            name="skills"
            type="text"
            className={`form-input ${errors.skills ? 'has-error' : ''}`}
            placeholder="e.g. React, Node.js, Resume Review, Python"
            value={formData.skills}
            onChange={handleChange}
          />
          {errors.skills && <span className="error-text">{errors.skills}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="mentor-hours">
            Estimated Weekly Availability
          </label>
          <select
            id="mentor-hours"
            name="weeklyHours"
            className="form-select"
            value={formData.weeklyHours}
            onChange={handleChange}
          >
            <option value="1 hour/month">1 hour/month (Low commitment)</option>
            <option value="1-2 hours/week">1-2 hours/week (Recommended)</option>
            <option value="3-5 hours/week">3-5 hours/week (Active mentor)</option>
            <option value="Flexible / As requested">Flexible / As requested</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="mentor-bio">
          Short Bio & Why You Want to Mentor *
        </label>
        <textarea
          id="mentor-bio"
          name="bio"
          rows={3}
          className={`form-textarea ${errors.bio ? 'has-error' : ''}`}
          placeholder="e.g. I came from a non-traditional background and love helping new developers overcome imposter syndrome and master React."
          value={formData.bio}
          onChange={handleChange}
        />
        {errors.bio && <span className="error-text">{errors.bio}</span>}
      </div>

      <Button
        type="submit"
        variant="secondary"
        className="form-submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting Application...' : 'Apply to Volunteer as Mentor'}
      </Button>
    </form>
  );
}

export default MentorForm;
