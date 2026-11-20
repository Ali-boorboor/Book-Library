import type { Book } from "@/types/book";
import { createBookTableColumns } from "./book-table-columns";
import { Empty, Table } from "antd";

interface BookTableProps {
  books: Book[];
  loading: boolean;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onAdd: () => void;
}

export default function BookTable({
  books,
  loading,
  onEdit,
  onDelete,
  onAdd,
}: BookTableProps) {
  const columns = createBookTableColumns({
    onEdit,
    onDelete,
  });

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={books}
      loading={loading}
      pagination={{
        pageSize: 8,
        hideOnSinglePage: true,
      }}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No books yet"
          >
            <button onClick={onAdd}>Add your first book</button>
          </Empty>
        ),
      }}
    />
  );
}
