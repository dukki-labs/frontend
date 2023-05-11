import styles from "@/styles/Common.module.scss";
import Text from "@/components/common/Text";

interface Pagination {
  totalPage: number;
  currentPage: number;
  onClickPage: (p: number) => void;
}

export default function Pagination({
  totalPage,
  currentPage,
  onClickPage,
}: Pagination) {
  if (totalPage === 0) {
    return (
      <div className={styles.pagenation}>
        <div>
          <Text text="1" fontWeight={700} fontSize={16} lineHeight={24} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pagenation}>
      {[...Array(totalPage)].map((v, i) => (
        <div key={i} onClick={() => onClickPage(i + 1)}>
          <Text
            text={(i + 1).toString()}
            fontWeight={currentPage === i + 1 ? 700 : 400}
            fontSize={16}
            lineHeight={24}
          />
        </div>
      ))}
    </div>
  );
}
