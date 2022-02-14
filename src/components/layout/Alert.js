import PropTypes from "prop-types";

const Alert = (props) => {
  const { message, messageType } = props;
  let messageClass;

  messageType === "error" ?
    messageClass = "alert-danger p-1 mb-2" :
      messageType === "success" ?
        messageClass = "alert-success p-1 mb-2" :
          messageClass = "p-1 mb-2";
  
  return (
    <div className={messageClass}>
      <p>{message}</p>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,
};

export default Alert;
