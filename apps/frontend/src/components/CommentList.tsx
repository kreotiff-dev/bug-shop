import { Comment as IComment } from '@prisma/client';
import { List } from 'antd';
import * as React from 'react';
import CommentItem from './CommentItem';

export interface CommentListProps {
  list: IComment[];
}

const CommentList: React.FC<CommentListProps> = ({ list }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <li>
          <CommentItem comment={item} key={item.id} />
        </li>
      )}
    />
  );
};

export default CommentList;
