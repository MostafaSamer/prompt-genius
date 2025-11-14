import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import { Input } from '../../shared/components';
import useForm from '../../shared/hooks/useForm';

function SignIn() {
  const navigate = useNavigate();

  const inputs = [
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
  ];

  const handleSubmit = (formData) => {
    console.log('Sign in:', formData);
    // TODO: Implement actual sign in logic (e.g., API call, authentication, etc.)
    // After successful sign in, navigate to dashboard
    // navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/');
  };

  const { formData, errors, handleChange, handleSubmit: handleFormSubmit } = useForm({
    inputs,
    initialValues: {},
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  });

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate('/sign-up');
  };

  return (
    <div className={styles.signIn}>
      <div className={styles.signInContainer}>
        <h1 className={styles.title}>Sign In</h1>
        <p className={styles.subtitle}>Welcome back! Please sign in to your account.</p>
        
        <form className={styles.form} onSubmit={handleFormSubmit}>
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
              Sign In
            </button>
          </div>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Don't have an account?{' '}
            <a href="/sign-up" className={styles.link} onClick={handleSignUpClick}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

