import ReactDOM from "react-dom";
import styles from "@/styles/Common.module.scss";
import Text from "@/components/common/Text";
import TextGothic from "@/components/common/TextGothic";
import UseAlertModal from "@/utils/useAlertModal";

export default function AlertModal() {
  const { alertModal, setAlertModal } = UseAlertModal();

  const onClose = () => {
    setAlertModal((prev) => ({ ...prev, isOpen: false }));
    alertModal.onCancel();
  };

  if (typeof window === "undefined") {
    return <></>;
  }

  return ReactDOM.createPortal(
    alertModal.isOpen ? (
      <div
        className={styles.alertModal}
        onClick={() => setAlertModal((prev) => ({ ...prev, isOpen: false }))}
      >
        <div className={styles.modal_main} onClick={(e) => e.stopPropagation()}>
          <div className={styles.body}>
            <TextGothic
              text={alertModal.title}
              fontWeight={700}
              fontSize={20}
              lineHeight={28}
              style={{
                display: "block",
                marginBottom: "16px",
              }}
            />
            <Text
              text={alertModal.desc}
              fontWeight={400}
              fontSize={16}
              lineHeight={24}
              color="#999999"
            />
            <div className={styles.buttonBox}>
              {alertModal.isTwoButton ? (
                <div className={styles.twoButton}>
                  <div className={styles.cancel} onClick={onClose}>
                    <TextGothic
                      text={alertModal.cancelText}
                      fontWeight={700}
                      fontSize={20}
                      lineHeight={28}
                    />
                  </div>
                  <div
                    className={styles.confirm}
                    onClick={alertModal.onConfirm}
                  >
                    <TextGothic
                      text={alertModal.buttonText}
                      fontWeight={700}
                      fontSize={20}
                      lineHeight={28}
                      color="white"
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={styles.oneButton}
                  onClick={alertModal.onConfirm}
                >
                  <TextGothic
                    text={alertModal.buttonText}
                    fontWeight={700}
                    fontSize={20}
                    lineHeight={28}
                    color="white"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    ) : null,
    document.body,
  );
}
