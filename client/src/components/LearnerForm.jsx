import { useState } from 'react';
import Button from './common/Button.jsx';

/**
 * LearnerForm Component
 * 
 * Accessible registration form for underserved learners and students.
 *
 * @param {Object} props
 * @param {Function} props.onSubmitSuccess - Callback passing the created learner profile
 */
function LearnerForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    educationLevel: 'College Undergraduate',
    primarySkill: 'Web Development (React / JS)',
    learningGoals: '',
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
    if (!formData.learningGoals.trim()) {
      errs.learningGoals = 'Please share a brief goal (e.g. want to land my first junior developer job)';
    }
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
    // Simulate brief network submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess({
        role: 'learner',
        ...formData,
      });
    }, 400);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">Learner Registration</h2>
      <p className="form-desc">
        Sign up to access free 1-on-1 mentorship, career advice, and community resources.
      </p>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="learner-name">
            Full Name *
          </label>
          <input
            id="learner-name"
            name="fullName"
            type="text"
            className={`form-input ${errors.fullName ? 'has-error' : ''}`}
            placeholder="e.g. Alex Rivera"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="learner-email">
            Email Address *
          </label>
          <input
            id="learner-email"
            name="email"
            type="email"
            className={`form-input ${errors.email ? 'has-error' : ''}`}
            placeholder="alex@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="learner-edu">
            Current Education / Background
          </label>
          <select
            id="learner-edu"
            name="educationLevel"
            className="form-select"
            value={formData.educationLevel}
            onChange={handleChange}
          >
            <option value="High School Student">High School Student</option>
            <option value="College Undergraduate">College Undergraduate</option>
            <option value="Community College">Community College</option>
            <option value="Bootcamp or Self-Taught">Bootcamp or Self-Taught</option>
            <option value="Career Transitioner">Career Transitioner</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="learner-skill">
            Primary Area of Interest
          </label>
          <select
            id="learner-skill"
            name="primarySkill"
            className="form-select"
            value={formData.primarySkill}
            onChange={handleChange}
          >
            <option value="Web Development (React / JS)">Web Development (React / JS)</option>
            <option value="Python & Backend (Node / Express)">Python & Backend (Node / Express)</option>
            <option value="Data Science & Machine Learning">Data Science & Machine Learning</option>
            <option value="UI/UX Product Design">UI/UX Product Design</option>
            <option value="Resume Review & Technical Interviews">Resume Review & Technical Interviews</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="learner-goals">
          What is your primary goal with SkillBridge? *
        </label>
        <textarea
          id="learner-goals"
          name="learningGoals"
          rows={3}
          className={`form-textarea ${errors.learningGoals ? 'has-error' : ''}`}
          placeholder="e.g. I want to build a portfolio project and get advice on applying for summer software engineering internships."
          value={formData.learningGoals}
          onChange={handleChange}
        />
        {errors.learningGoals && <span className="error-text">{errors.learningGoals}</span>}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="form-submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating Profile...' : 'Complete Free Registration'}
      </Button>
    </form>
  );
}

export default LearnerForm;
