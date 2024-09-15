import PropTypes from "prop-types";
import styles from "./User.module.css";

const User = ({ user, loading, error }) => {
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error loading user data</div>;
  }

  return (
    <div className={styles.user}>
      <h3 className={styles.userName}>{user?.name}</h3>
      <p className={styles.userEmail}>{user?.email}</p>
    </div>
  );
};
User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};
export default User;
