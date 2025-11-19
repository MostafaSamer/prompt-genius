import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import { Input } from '../../shared/components';
import useForm from '../../shared/hooks/useForm';

function SignUp() {
  const navigate = useNavigate();

  const inputs = [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      placeholder: 'Enter your name',
      required: true,
    },
    {
      type: 'email',
      label: 'Email',
      name: 'email',
      placeholder: 'Enter your email',
      required: true,
    },
    {
      type: 'password',
      label: 'Password',
      name: 'password',
      placeholder: 'Enter your password',
      required: true,
    },
    {
      type: 'password',
      label: 'Confirm Password',
      name: 'confirmPassword',
      placeholder: 'Confirm your password',
      required: true,
    },
  ];

  const handleSubmit = (formData) => {
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    console.log('Sign up:', {
      email: formData.email,
      password: formData.password,
    });
    // TODO: Implement actual sign up logic (e.g., API call, authentication, etc.)
    // After successful sign up, navigate to dashboard
    // navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/');
  };

  const { formData, errors, handleChange, handleSubmit: handleFormSubmit, setErrors } = useForm({
    inputs,
    initialValues: {},
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  });

  // Custom validation for password match
  const handleFormSubmitWithValidation = (e) => {
    e.preventDefault();
    
    // Check password match
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match',
      }));
      return;
    }

    // Clear confirm password error if passwords match
    if (formData.password === formData.confirmPassword && errors.confirmPassword) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.confirmPassword;
        return newErrors;
      });
    }

    handleFormSubmit(e);
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    navigate('/sign-in');
  };

  return (
    <div className={styles.signUp}>
      <div className={styles.signUpContainer}>
        <h1 className={styles.title}>Sign Up</h1>
        <p className={styles.subtitle}>Create your account to get started.</p>
        
        <form className={styles.form} onSubmit={handleFormSubmitWithValidation}>
          <div className={styles.formFields}>
            {inputs.map((input) => (
              <Input
                key={input.name}
                type={input.type}
                label={input.label}
                name={input.name}
                placeholder={input.placeholder}
                required={input.required}
                value={formData[input.name] || ''}
                onChange={handleChange}
                error={errors[input.name] || ''}
              />
            ))}
          </div>
          
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              Sign Up
            </button>
          </div>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Already have an account?{' '}
            <a href="/sign-in" className={styles.link} onClick={handleSignInClick}>
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

