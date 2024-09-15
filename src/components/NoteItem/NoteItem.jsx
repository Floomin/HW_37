import PropTypes from "prop-types";
import styles from "./NoteItem.module.css";

const NoteItem = ({ note, onDelete, index }) => {
  return (
    <div className={styles.noteItem}>
      <p className={styles.noteText}>{note}</p>
      <button className={styles.deleteButton} onClick={() => onDelete(index)}>
        Удалить
      </button>
    </div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
export default NoteItem;
